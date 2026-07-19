package com.backend.jobs.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.jobs.entities.JobStatus;
import com.backend.jobs.entities.JobType;
import com.backend.jobs.entities.Jobs;
import java.util.*;

public interface JobsDao extends JpaRepository<Jobs, Long>{
	
	List<Jobs> findByrecruiterIdOrderByCreatedAtDesc(Long recruiterId);
	List<Jobs> findByrecruiterIdAndStatusOrderByCreatedAtDesc(Long recruiterId, JobStatus status);

	@Query("""
		    SELECT j
		    FROM Jobs j
		    WHERE j.status = com.backend.jobs.entities.JobStatus.ACTIVE
		    AND (:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
		        OR LOWER(j.jobRole) LIKE LOWER(CONCAT('%', :keyword, '%')))
		    AND (:city IS NULL OR LOWER(j.city) = LOWER(:city))
		    AND (:country IS NULL OR LOWER(j.country) = LOWER(:country))
		    AND (:jobType IS NULL OR j.jobType = :jobType)
		    ORDER BY j.createdAt DESC
		""")
		List<Jobs> searchJobs(
		        @Param("keyword") String keyword,
		        @Param("city") String city,
		        @Param("country") String country,
		        @Param("jobType") JobType jobType
		);
}
