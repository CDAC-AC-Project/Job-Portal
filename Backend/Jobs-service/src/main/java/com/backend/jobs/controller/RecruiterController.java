package com.backend.jobs.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.jobs.dtos.RecruiterDashboardResponse;
import com.backend.jobs.dtos.RecruiterJobListResp;
import com.backend.jobs.service.JobsService;
import com.backend.jobs.service.RecruiterDashboardService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/recruiter")
public class RecruiterController {

    private final RecruiterDashboardService recruiterDashboardService;

    private final JobsService jobsService;

    @GetMapping("/dashboard")
    public ResponseEntity<RecruiterDashboardResponse>
            getDashboardCounts(
                    @RequestHeader("X-User-Id") Long recruiterId,
                    @RequestHeader("X-User-Role") String role
            ) {

        RecruiterDashboardResponse response =
                recruiterDashboardService.getDashboardCounts(
                        recruiterId,
                        role
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<RecruiterJobListResp>>
            getRecruiterJobs(
                    @RequestHeader("X-User-Id") Long recruiterId,
                    @RequestHeader("X-User-Role") String role
            ) {

        List<RecruiterJobListResp> response =
                jobsService.getMyJobs(
                        recruiterId,
                        null,
                        role
                );

        return ResponseEntity.ok(response);
    }
}