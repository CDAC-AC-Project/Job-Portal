package com.backend.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.app.dto.ApplicationDetailsResponse;
import com.backend.app.dto.ApplicationResponse;
import com.backend.app.dto.ApplyJobRequest;
import com.backend.app.dto.MyApplicationResponse;
import com.backend.app.enums.ApplicationStatus;
import com.backend.app.entities.JobApplication;
import com.backend.app.exception.DuplicateApplicationException;
import com.backend.app.repository.JobApplicationRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final JobApplicationRepository applicationRepository;

    private final ModelMapper mapper;

    @Override
    public ApplicationResponse applyJob(Long candidateId, Long jobId ,ApplyJobRequest dto) {

        // Check if candidate has already applied
    	if(applicationRepository.existsByJobIdAndCandidateId(jobId,candidateId)) {

            throw new DuplicateApplicationException(
                    "You have already applied for this job.");
        }

        // Convert DTO to Entity
        JobApplication application = mapper.map(dto, JobApplication.class);

        // Set backend-controlled fields
        application.setCandidateId(candidateId);
        application.setStatus(ApplicationStatus.APPLIED);
        
        //Adding hardcore temporary value for now
        application.setRecruiterId(1L);

        application.setJobId(jobId);
        
        application.setJobTitleSnapshot("Java Developer");

        application.setCompanyNameSnapshot("TCS");

        application.setJobLocationSnapshot("Pune");

        // Save into database
        JobApplication savedApplication = applicationRepository.save(application);

        // Convert Entity to Response DTO
        ApplicationResponse response =
                mapper.map(savedApplication, ApplicationResponse.class);

        response.setMessage("Application submitted successfully.");

        return response;
    }

	@Override
	public List<MyApplicationResponse> getMyApplication(Long candidateId) {
		List<JobApplication> Application =
				applicationRepository.findByCandidateIdOrderByAppliedAtDesc(candidateId);
		return Application.stream().map(this::mapToMyApplicationResponse).toList();
	}
	
	private MyApplicationResponse mapToMyApplicationResponse(JobApplication application){
		MyApplicationResponse response = mapper.map(application,MyApplicationResponse.class);
				return response;
	}
	
	public ApplicationDetailsResponse getApplication(Long applicationId) {
	JobApplication application =
			applicationRepository.findById(applicationId)
	                .orElseThrow(() ->
	                        new RuntimeException("Application not found"));
	
	ApplicationDetailsResponse response = mapper.map(application,ApplicationDetailsResponse.class);
	response.setApplicationId(application.getId());
	return response;
	}
}