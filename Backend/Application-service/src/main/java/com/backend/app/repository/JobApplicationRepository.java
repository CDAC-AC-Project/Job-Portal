package com.backend.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.app.entities.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication , Long> {
	boolean existsByJobIdAndCandidateId(Long jobId,
            Long candidateId);
}
