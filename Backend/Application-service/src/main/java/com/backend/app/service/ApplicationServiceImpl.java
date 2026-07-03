package com.backend.app.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.app.dto.ApplicationResponse;
import com.backend.app.dto.ApplyJobRequest;
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
}