package com.backend.jobs.service;  

import com.backend.jobs.dtos.JobCardResponse;
import com.backend.jobs.dtos.*;
import com.backend.jobs.entities.JobStatus;
import com.backend.jobs.entities.JobType;

import java.util.*;

public interface JobsService {
	
	 PostJobResponse postJob(Long recruiterId, String role, CreateJobDto dto);
	 List<RecruiterJobListResp> getMyJobs(Long recruiterId, JobStatus status);
	 PostJobResponse editMyJob(Long jobId, Long recruiterId ,CreateJobDto dto);
	 PostJobResponse getJobById(Long jobId);
	 PageResponse<JobCardResponse> searchJobs(String keyword, String city, String country,JobType jobType, int page, int size);
	 PostJobResponse closeJob(Long jobId, Long recruiterId, String userRole);
	 PostJobResponse deleteJob(Long jobId, Long recruiterId, String userRole);
	 JobInternalResponse getJobInternalDetails(Long jobId);
	 List<JobCardResponse> getCandidateHomeJobs();
}