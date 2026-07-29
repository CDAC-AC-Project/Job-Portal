package com.backend.jobs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.backend.jobs.service.JobsService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/Internal")
public class InternalJobController {
	
	private final JobsService jobService;
	
	@GetMapping("/jobs/{jobId}")
	public ResponseEntity<?> getInternalJobDetails(@PathVariable Long jobId){
		
		return ResponseEntity.ok(jobService.getJobInternalDetails(jobId));
	}
}
