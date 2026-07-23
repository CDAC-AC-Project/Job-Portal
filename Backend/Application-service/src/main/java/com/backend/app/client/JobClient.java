package com.backend.app.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.backend.app.dto.JobInternalResponse;

@FeignClient(
	        name = "job-service",
	        url = "http://localhost:8083"
	)
	public interface JobClient {

	    @GetMapping("/jobs/internal/{jobId}")
	    JobInternalResponse getJobById(@PathVariable Long jobId);

}
