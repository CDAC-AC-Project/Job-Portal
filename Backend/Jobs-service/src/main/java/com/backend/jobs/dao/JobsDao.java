package com.backend.jobs.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.jobs.entities.JobStatus;
import com.backend.jobs.entities.Jobs;
import java.util.*;

public interface JobsDao extends JpaRepository<Jobs, Long>{
	
	List<Jobs> findByrecruiterIdOrderByCreatedAtDesc(Long recruiterId);
	List<Jobs> findByrecruiterIdAndStatusOrderByCreatedAtDesc(Long recruiterId, JobStatus status);

}
