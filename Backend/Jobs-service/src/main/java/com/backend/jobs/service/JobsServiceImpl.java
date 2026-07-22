package com.backend.jobs.service;

import java.time.LocalDate;
import java.util.List;

import javax.management.RuntimeErrorException;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.backend.jobs.JobsServiceApplication;
import com.backend.jobs.dao.JobsDao;
import com.backend.jobs.dtos.CandidateHomeJobResponse;
import com.backend.jobs.dtos.CreateJobDto;
import com.backend.jobs.dtos.JobInternalResponse;
import com.backend.jobs.dtos.PostJobResponse;
import com.backend.jobs.dtos.RecruiterJobListResp;
import com.backend.jobs.entities.JobStatus;
import com.backend.jobs.entities.JobType;
import com.backend.jobs.entities.Jobs;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class JobsServiceImpl implements JobsService{

	private final JobsDao jobDao;
	private  ModelMapper mapper;
	
	
	public PostJobResponse createDto(Long recruiterId, CreateJobDto dto) {
		
		Jobs job = mapper.map(dto, Jobs.class);

        job.setRecruiterId(recruiterId);
        job.setStatus(JobStatus.ACTIVE);

        Jobs savedJob = jobDao.save(job);

        PostJobResponse response = mapper.map(savedJob, PostJobResponse.class);
        response.setMessage("Job posted successfully");

        return response;
	}
	
	@Override
	public List<RecruiterJobListResp> getMyJobs(Long recruiterId, JobStatus status) {
		
		List<Jobs> jobs;
		
		if(status == null) {
			jobs = jobDao.findByrecruiterIdOrderByCreatedAtDesc(recruiterId);
		}else {
			jobs = jobDao.findByrecruiterIdAndStatusOrderByCreatedAtDesc(recruiterId, status);
		}
		return jobs.stream()
				.map(this::mapToRecruiterJobListResp).toList();
	}
	
	public RecruiterJobListResp mapToRecruiterJobListResp(Jobs job) {

        RecruiterJobListResp response = mapper.map(job, RecruiterJobListResp.class);

        // Temporary value because Application Service is not ready yet
        response.setApplicationCount(0L);

        return response;
    }
	
	public PostJobResponse editMyJob(Long jobId, Long recruiterId, CreateJobDto dto) {
		
		Jobs job = jobDao.findById(jobId).orElseThrow(()-> new RuntimeException());
		job = mapper.map(dto, Jobs.class);
		job.setRecruiterId(recruiterId);
		PostJobResponse postJobResp = mapper.map(job, PostJobResponse.class);
		return postJobResp;
	}
	
	public PostJobResponse getJobById(Long jobId) {
		
		Jobs job = jobDao.findById(jobId)
					.orElseThrow(() -> new RuntimeException("Job Not Found"));
		PostJobResponse response = mapper.map(job, PostJobResponse.class);
		response.setMessage("Job Fetched Successfully");
		return response;
	}
	
	public List<PostJobResponse> searchJobs(
			String keyword,
	        String city,
	        String country,
	        JobType jobType){
		
		List<Jobs> jobs = jobDao.searchJobs(keyword, city, country, jobType);
		
		return jobs.stream()
				.map(job -> {
					PostJobResponse response = mapper.map(job, PostJobResponse.class);
					response.setMessage("Job fetched successfully");
					return response;
				}).toList();  
	}
	
	public PostJobResponse closeJob(Long jobId, Long recruiterId, String userRole) {
		
		if(!"RECRUITER".equals(userRole)) {
			throw new RuntimeException("Only recruiter can Edit Job");
		}
		
		Jobs job = jobDao.findById(jobId)
					.orElseThrow(()->  new RuntimeException("Job not found"));
		
		if(!job.getRecruiterId().equals(recruiterId)) {
			throw new RuntimeException("You are Not Allowed to Edit this job ");
		}
		
		job.setStatus(JobStatus.CLOSED);
		
		PostJobResponse response = mapper.map(job, PostJobResponse.class);
		response.setMessage("Job Closed succesfully");
		return response;
	}
	
	public PostJobResponse deleteJob(Long jobId, Long recruiterId, String userRole) {
		
		if(!"RECRUITER".equals(recruiterId))
			throw new RuntimeException("Only recruiter can delete Job");
		
		Jobs job = jobDao.findById(recruiterId)
					.orElseThrow(()-> new RuntimeException("Job not Found"));
		
		if(!job.getRecruiterId().equals(recruiterId))
			throw new RuntimeException("You are Not Allowed to Delete this Job");
		
		job.setStatus(JobStatus.DELETED);
		
		PostJobResponse response = mapper.map(job, PostJobResponse.class);
		response.setMessage("Job Delete Successfully");
		
		return response;
	}
	
	public JobInternalResponse getJobInternalDetails(Long jobId) {
		
		 Jobs job = jobDao.findById(jobId)
		            .orElseThrow(() -> new RuntimeException("Job not found"));
		 
		 JobInternalResponse response = mapper.map(job, JobInternalResponse.class);

	    // because entity field is id, but DTO field is jobId
	    response.setJobId(job.getId());

	    // custom calculated field
	    if (Boolean.TRUE.equals(job.getRemote())) {
	        response.setLocation("Remote");
	    } else {
	        response.setLocation(
	                job.getCity() + ", " + job.getState() + ", " + job.getCountry()
	        );
	    }
		 
	    return response;
	}
	
	//User APIS
	
	 public List<CandidateHomeJobResponse> getCandidateHomeJobs(){
	
		 List<Jobs> jobs = jobDao.findCandidateHomeJobs(
		            JobStatus.ACTIVE,
		            LocalDate.now()
		    );
		
		    return jobs.stream()
		            .map(this::mapToCandidateHomeJobResponse)
		            .toList();
	 }
	 
	 private CandidateHomeJobResponse mapToCandidateHomeJobResponse(Jobs job) {

		    return mapper.map(job, CandidateHomeJobResponse.class);
		}
	
}











