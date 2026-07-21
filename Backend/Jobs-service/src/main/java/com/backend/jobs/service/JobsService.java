package com.backend.jobs.service;  

import com.backend.jobs.dtos.CandidateHomeJobResponse;
import com.backend.jobs.dtos.CreateJobDto;
import com.backend.jobs.dtos.JobInternalResponse;
import com.backend.jobs.dtos.PostJobResponse;
import com.backend.jobs.dtos.RecruiterJobListResp;
import com.backend.jobs.entities.JobStatus;
import com.backend.jobs.entities.JobType;

import java.util.*;

public interface JobsService {
	
	 PostJobResponse createDto(Long recruiterId, CreateJobDto dto);
	 List<RecruiterJobListResp> getMyJobs(Long recruiterId, JobStatus status);
	 PostJobResponse editMyJob(Long jobId, Long recruiterId ,CreateJobDto dto);
	 PostJobResponse getJobById(Long jobId);
	 List<PostJobResponse> searchJobs(String keyword, String city, String country, JobType jobType);
	 PostJobResponse closeJob(Long jobId, Long recruiterId, String userRole);
	 PostJobResponse deleteJob(Long jobId, Long recruiterId, String userRole);
	 JobInternalResponse getJobInternalDetails(Long jobId);
	 List<CandidateHomeJobResponse> getCandidateHomeJobs();
}