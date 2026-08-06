package com.backend.app.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.backend.app.enums.JobStatus;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.app.client.JobClient;
import com.backend.app.client.ProfileClient;
import com.backend.app.dto.ApplicationDetailsResponse;
import com.backend.app.dto.ApplicationResponse;
import com.backend.app.dto.ApplicationStatusHistoryResponse;
import com.backend.app.dto.ApplyJobRequest;
import com.backend.app.dto.CandidateApplicationDashboardCountsResponse;
import com.backend.app.dto.JobInternalResponse;
import com.backend.app.dto.MyApplicationResponse;
import com.backend.app.dto.ResumeInternalResponse;
import com.backend.app.enums.ApplicationStatus;
import com.backend.app.entities.ApplicationStatusHistory;
import com.backend.app.entities.JobApplication;
import com.backend.app.exception.ApplicationNotFoundException;
import com.backend.app.exception.DuplicateApplicationException;
import com.backend.app.exception.InvalidApplicationStateException;
import com.backend.app.exception.ResumeNotFoundException;
import com.backend.app.exception.UnauthorizedActionException;
import com.backend.app.repository.ApplicationStatusHistoryRepository;
import com.backend.app.repository.JobApplicationRepository;

import feign.FeignException;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private static final Map<ApplicationStatus, Set<ApplicationStatus>> ALLOWED_TRANSITIONS = Map.of(
            ApplicationStatus.APPLIED, Set.of(ApplicationStatus.SHORTLISTED, ApplicationStatus.REJECTED),
            ApplicationStatus.SHORTLISTED, Set.of(ApplicationStatus.INTERVIEW, ApplicationStatus.REJECTED),
            ApplicationStatus.INTERVIEW, Set.of(ApplicationStatus.HIRED, ApplicationStatus.REJECTED)
    );

    private final JobApplicationRepository applicationRepository;

    private final ApplicationStatusHistoryRepository statusHistoryRepository;

    private final ModelMapper mapper;

    private final JobClient jobClient;

    private final ProfileClient profileClient;

    @Override
    public ApplicationResponse applyJob(Long candidateId, Long jobId, ApplyJobRequest dto) {

        // Check if candidate has already applied
        if (applicationRepository.existsByJobIdAndCandidateId(jobId, candidateId)) {
            throw new DuplicateApplicationException(
                    "You have already applied for this job.");
        }

        JobInternalResponse job = jobClient.getJobById(jobId);

        if (job.getStatus() != JobStatus.ACTIVE) {
            throw new InvalidApplicationStateException("Job is not active");
        }

        Long resolvedResumeId = resolveResumeId(candidateId, dto.getResumeId());

        // Convert DTO to Entity
        JobApplication application = mapper.map(dto, JobApplication.class);

        application.setJobId(jobId);
        application.setCandidateId(candidateId);
        application.setStatus(ApplicationStatus.APPLIED);
        application.setResumeId(resolvedResumeId);
        application.setNote(dto.getNote());

        application.setRecruiterId(job.getRecruiterId());
        application.setJobTitleSnapshot(job.getTitle());
        application.setCompanyNameSnapshot(job.getCompanyName());
        application.setJobLocationSnapshot(job.getLocation());
        application.setMinSalarySnapshot(job.getMinSalary());
        application.setMaxSalarySnapshot(job.getMaxSalary());
        application.setJobTypeSnapshot(job.getJobType());

        // Save into database
        JobApplication savedApplication = applicationRepository.save(application);

        recordHistory(savedApplication, null, ApplicationStatus.APPLIED, candidateId);

        // Convert Entity to Response DTO
        ApplicationResponse response =
                mapper.map(savedApplication, ApplicationResponse.class);

        response.setMessage("Application submitted successfully.");

        return response;
    }

    private Long resolveResumeId(Long candidateId, Long requestedResumeId) {

        List<ResumeInternalResponse> resumes;

        try {
            resumes = profileClient.getResumesByUserId(candidateId);
        } catch (FeignException.NotFound ex) {
            throw new ResumeNotFoundException(
                    "Please complete your candidate profile before applying.");
        }

        if (resumes == null || resumes.isEmpty()) {
            throw new ResumeNotFoundException(
                    "Please upload a resume before applying for this job.");
        }

        if (requestedResumeId != null) {
            return resumes.stream()
                    .filter(resume -> resume.getId().equals(requestedResumeId))
                    .map(ResumeInternalResponse::getId)
                    .findFirst()
                    .orElseThrow(() -> new ResumeNotFoundException(
                            "Selected resume was not found in your profile."));
        }

        return resumes.stream()
                .filter(ResumeInternalResponse::isDefaultResume)
                .map(ResumeInternalResponse::getId)
                .findFirst()
                .orElseThrow(() -> new ResumeNotFoundException(
                        "Please set a default resume in Settings before applying, or select a resume."));
    }

    @Override
    public List<MyApplicationResponse> getMyApplication(Long candidateId) {
        List<JobApplication> applications =
                applicationRepository.findByCandidateIdOrderByAppliedAtDesc(candidateId);
        return applications.stream().map(this::mapToMyApplicationResponse).toList();
    }

    private MyApplicationResponse mapToMyApplicationResponse(JobApplication application) {
        return mapper.map(application, MyApplicationResponse.class);
    }

    @Override
    public ApplicationDetailsResponse getApplication(Long applicationId, Long requesterId, String role) {

        JobApplication application = findApplicationOrThrow(applicationId);

        assertCanView(application, requesterId, role);

        ApplicationDetailsResponse response = mapper.map(application, ApplicationDetailsResponse.class);
        response.setApplicationId(application.getId());
        return response;
    }

    @Override
    public ApplicationResponse withdrawApplication(Long applicationId, Long candidateId) {

        JobApplication application = findApplicationOrThrow(applicationId);

        if (!application.getCandidateId().equals(candidateId)) {
            throw new UnauthorizedActionException(
                    "You are not allowed to withdraw this application");
        }

        ApplicationStatus currentStatus = application.getStatus();

        if (currentStatus == ApplicationStatus.WITHDRAWN
                || currentStatus == ApplicationStatus.HIRED
                || currentStatus == ApplicationStatus.REJECTED) {
            throw new InvalidApplicationStateException(
                    "Application can no longer be withdrawn");
        }

        application.setStatus(ApplicationStatus.WITHDRAWN);

        JobApplication updatedApplication =
                applicationRepository.save(application);

        recordHistory(updatedApplication, currentStatus, ApplicationStatus.WITHDRAWN, candidateId);

        ApplicationResponse response =
                mapper.map(updatedApplication, ApplicationResponse.class);

        response.setMessage("Application withdrawn successfully.");

        return response;
    }

    @Override
    public ApplicationResponse updateApplicationStatus(
            Long applicationId, Long recruiterId, ApplicationStatus newStatus) {

        JobApplication application = findApplicationOrThrow(applicationId);

        if (!application.getRecruiterId().equals(recruiterId)) {
            throw new UnauthorizedActionException(
                    "You are not allowed to update this application");
        }

        ApplicationStatus currentStatus = application.getStatus();

        validateTransition(currentStatus, newStatus);

        application.setStatus(newStatus);

        JobApplication updated = applicationRepository.save(application);

        recordHistory(updated, currentStatus, newStatus, recruiterId);

        ApplicationResponse response = mapper.map(updated, ApplicationResponse.class);
        response.setMessage("Application status updated to " + newStatus.name());

        return response;
    }

    private void validateTransition(ApplicationStatus current, ApplicationStatus target) {

        if (target == ApplicationStatus.APPLIED || target == ApplicationStatus.WITHDRAWN) {
            throw new InvalidApplicationStateException(
                    "Status cannot be set to " + target.name() + " through this endpoint");
        }

        Set<ApplicationStatus> allowed = ALLOWED_TRANSITIONS.get(current);

        if (allowed == null || !allowed.contains(target)) {
            throw new InvalidApplicationStateException(
                    "Cannot move application from " + current.name() + " to " + target.name());
        }
    }

    @Override
    public List<ApplicationStatusHistoryResponse> getApplicationHistory(
            Long applicationId, Long requesterId, String role) {

        JobApplication application = findApplicationOrThrow(applicationId);

        assertCanView(application, requesterId, role);

        return statusHistoryRepository.findByApplication_IdOrderByChangedAtAsc(applicationId)
                .stream()
                .map(this::mapToHistoryResponse)
                .toList();
    }

    @Override
    public CandidateApplicationDashboardCountsResponse getCandidateDashboardCounts(Long candidateId) {

        long total = applicationRepository.countByCandidateId(candidateId);
        long shortlisted = applicationRepository.countByCandidateIdAndStatus(candidateId, ApplicationStatus.SHORTLISTED);
        long interview = applicationRepository.countByCandidateIdAndStatus(candidateId, ApplicationStatus.INTERVIEW);
        long hired = applicationRepository.countByCandidateIdAndStatus(candidateId, ApplicationStatus.HIRED);
        long rejected = applicationRepository.countByCandidateIdAndStatus(candidateId, ApplicationStatus.REJECTED);
        long withdrawn = applicationRepository.countByCandidateIdAndStatus(candidateId, ApplicationStatus.WITHDRAWN);

        return new CandidateApplicationDashboardCountsResponse(
                total, shortlisted, interview, hired, rejected, withdrawn);
    }

    private JobApplication findApplicationOrThrow(Long applicationId) {
        return applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ApplicationNotFoundException("Application not found"));
    }

    private void assertCanView(JobApplication application, Long requesterId, String role) {

        boolean isOwnerCandidate = "CANDIDATE".equalsIgnoreCase(role)
                && application.getCandidateId().equals(requesterId);

        boolean isOwnerRecruiter = "RECRUITER".equalsIgnoreCase(role)
                && application.getRecruiterId().equals(requesterId);

        if (!isOwnerCandidate && !isOwnerRecruiter) {
            throw new UnauthorizedActionException(
                    "You are not allowed to view this application");
        }
    }

    private void recordHistory(
            JobApplication application,
            ApplicationStatus oldStatus,
            ApplicationStatus newStatus,
            Long changedBy) {

        ApplicationStatusHistory history = new ApplicationStatusHistory();
        history.setApplication(application);
        history.setOldStatus(oldStatus);
        history.setNewStatus(newStatus);
        history.setChangedBy(changedBy);

        statusHistoryRepository.save(history);
    }

    private ApplicationStatusHistoryResponse mapToHistoryResponse(ApplicationStatusHistory history) {
        return new ApplicationStatusHistoryResponse(
                history.getId(),
                history.getOldStatus(),
                history.getNewStatus(),
                history.getChangedBy(),
                history.getChangedAt()
        );
    }
}
