package com.backend.jobs.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Page;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.backend.jobs.client.ProfileServiceClient;
import com.backend.jobs.dao.*;
import com.backend.jobs.dtos.*;
import com.backend.jobs.entities.*;

import feign.FeignException;
import lombok.*;

@Service
@Transactional
@AllArgsConstructor
public class JobsServiceImpl implements JobsService{
	
	private static final int HOME_JOBS_LIMIT = 15;
	
	private final JobsDao jobDao;
	private  final ModelMapper mapper;
	 private final ProfileServiceClient profileServiceClient;
	
	 
	//CANDIDATE API
	 @Override
	 public PageResponse<JobCardResponse> searchJobs(
	         String keyword,
	         String city,
	         String country,
	         JobType jobType,
	         int page,
	         int size
	 ) {
		//if "", " text " such comes we are making them null, "text" respectively.
	     keyword = normalize(keyword);
	     city = normalize(city);
	     country = normalize(country);

	     int pageNumber = Math.max(page, 0);
	     int pageSize = Math.min(Math.max(size, 1), 50);

	     PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);

	     Page<Jobs> jobsPage = jobDao.searchJobs(
	             keyword,
	             city,
	             country,
	             jobType,
	             JobStatus.ACTIVE,
	             LocalDate.now(),
	             pageRequest
	     );

	     List<JobCardResponse> jobCards = jobsPage.getContent()
	             .stream()
	             .map(job -> mapper.map(job, JobCardResponse.class))
	             .toList();

	     return new PageResponse<>(
	             jobCards,
	             jobsPage.getNumber(),
	             jobsPage.getSize(),
	             jobsPage.getTotalElements(),
	             jobsPage.getTotalPages(),
	             jobsPage.hasNext(),
	             jobsPage.isLast()
	     );
	 }

	 private String normalize(String value) {
	     return value == null || value.trim().isEmpty()
	             ? null
	             : value.trim();
	 }
	 
	
	public List<JobCardResponse> getCandidateHomeJobs(){
			 
		 List<Jobs> jobs = jobDao.findCandidateHomeJobs(
		            JobStatus.ACTIVE,
		            LocalDate.now(),
		            PageRequest.of(0, HOME_JOBS_LIMIT)
		    );
		
		    return jobs.stream()
		            .map(this::mapToCandidateHomeJobResponse)
		            .toList();
	 }
	 
	 private JobCardResponse mapToCandidateHomeJobResponse(Jobs job) {

		    return mapper.map(job, JobCardResponse.class);
		}
	
	
	 //RECRUITER APIS
	 //PostJOb API - When recruiter post, it store that data from database along with company details snapshot by calling profile service API
	 @Override
	 public PostJobResponse postJob(Long recruiterId, String role, CreateJobDto dto) {

	     if (!"RECRUITER".equalsIgnoreCase(role)) {
	         throw new RuntimeException("Only recruiter can post a job");
	     }

	     if (dto.getMinSalary() != null && dto.getMaxSalary() != null
	             && dto.getMinSalary().compareTo(dto.getMaxSalary()) > 0) {
	         throw new RuntimeException("Minimum salary cannot be greater than maximum salary");
	     }

	     CompanySummaryDto companySummary;

	     try {
	         companySummary = profileServiceClient.getCompanySummaryByRecruiterId(recruiterId);
	     } catch (FeignException.NotFound ex) {
	         throw new RuntimeException("Company profile not found. Please complete company profile first.");
	     } catch (FeignException ex) {
	         throw new RuntimeException("Profile Service is currently unavailable. Please try again later.");
	     }

	     if (companySummary == null || companySummary.getCompanyId() == null) {
	         throw new RuntimeException("Company profile not found. Please complete company profile first.");
	     }

	     Jobs job = mapper.map(dto, Jobs.class);

	     job.setRecruiterId(recruiterId);

	     job.setCompanyId(companySummary.getCompanyId());
	     job.setCompanyName(companySummary.getCompanyName());
	     job.setCompanyLogoUrl(companySummary.getCompanyLogoUrl());
	     job.setCompanyIndustry(companySummary.getCompanyIndustry());

	     job.setStatus(JobStatus.ACTIVE);
	     job.setFeatured(false);
	     job.setHighlighted(false);
	     job.setViewsCount(0L);

	     if (job.getRemote() == null) {
	         job.setRemote(false);
	     }

	     if (job.getBenefits() == null) {
	         job.setBenefits(new ArrayList<>());
	     }

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
	
	private RecruiterJobListResp mapToRecruiterJobListResp(Jobs job) {

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
	
	//INTERNAL APIS
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
	
}











