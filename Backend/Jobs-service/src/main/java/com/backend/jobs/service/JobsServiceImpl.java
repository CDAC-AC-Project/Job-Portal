package com.backend.jobs.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.backend.jobs.JobsServiceApplication;
import com.backend.jobs.dao.JobsDao;
import com.backend.jobs.dtos.CreateJobDto;
import com.backend.jobs.dtos.PostJobResponse;
import com.backend.jobs.dtos.RecruiterJobListResp;
import com.backend.jobs.entities.JobStatus;
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
}











