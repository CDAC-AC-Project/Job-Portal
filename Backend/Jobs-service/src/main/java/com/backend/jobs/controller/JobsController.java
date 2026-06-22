package com.backend.jobs.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.jobs.dtos.CreateJobDto;
import com.backend.jobs.entities.JobStatus;
import com.backend.jobs.service.JobsService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/jobs")
public class JobsController {
	
	private final JobsService jobService;
	
	@PostMapping
	public ResponseEntity<?> postJob(@RequestHeader("userId") Long recruiterId, @Valid @RequestBody CreateJobDto dto){
		return ResponseEntity.ok(jobService.createDto(recruiterId, dto));
		
	}
	
	@GetMapping("/{recruiterId}/{status}")
	public ResponseEntity<?> getMyJobs(@RequestParam Long recruiterId, @RequestParam JobStatus status){
		
		return ResponseEntity.ok(jobService.getMyJobs(recruiterId, status));
	}
	
	@PutMapping
	public ResponseEntity<?> editjob(@RequestParam Long jobId, @RequestHeader("recruiterId") Long recruiterId ,@RequestBody CreateJobDto dto){
		
		return ResponseEntity.ok(jobService.editMyJob(jobId, recruiterId, dto));
	}
}













