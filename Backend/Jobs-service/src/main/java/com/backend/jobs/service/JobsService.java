package com.backend.jobs.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.jobs.dtos.CreateJobDto;
import com.backend.jobs.dtos.PostJobResponse;
import com.backend.jobs.dtos.RecruiterJobListResp;
import com.backend.jobs.entities.JobStatus;

import java.util.*;

public interface JobsService {
	
	 PostJobResponse createDto(Long recruiterId, CreateJobDto dto);
	 List<RecruiterJobListResp> getMyJobs(Long recruiterId, JobStatus status);
	 PostJobResponse editMyJob(Long jobId, Long recruiterId ,CreateJobDto dto);
}
