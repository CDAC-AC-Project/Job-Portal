package com.backend.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.app.dto.ApplicationDetailsResponse;
import com.backend.app.dto.ApplyJobRequest;
import com.backend.app.service.ApplicationService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/jobs/{jobId}/apply")
    public ResponseEntity<?> applyJob(@RequestHeader("candidateId") Long candidateId,
    		@PathVariable Long jobId,
    		@RequestBody ApplyJobRequest dto) {

        return ResponseEntity.ok(
                applicationService.applyJob(candidateId, jobId, dto));
    }
    
    @GetMapping("/candidate/my-applications")
    public ResponseEntity<?> getapplications(@RequestHeader Long candidateId){
    	return ResponseEntity.ok(applicationService.getMyApplication(candidateId));
    }
    
    @GetMapping("/{applicationId}")
    public ResponseEntity<ApplicationDetailsResponse> getApplication(@PathVariable Long applicationId){
    	return ResponseEntity.ok(applicationService.getApplication(applicationId));
    }
    
    
}