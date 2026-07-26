package com.backend.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.app.dto.RecruiterApplicationDashboardCountsResponse;
import com.backend.app.service.RecruiterDashboardService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/internal/applications")
public class InternalApplicationController {

    private final RecruiterDashboardService recruiterDashboardService;

    @GetMapping("/recruiter/{recruiterId}/dashboard-counts")
    public ResponseEntity<RecruiterApplicationDashboardCountsResponse>
            getRecruiterDashboardCounts(
                    @PathVariable Long recruiterId
            ) {

        RecruiterApplicationDashboardCountsResponse response =
                recruiterDashboardService.getDashboardCounts(recruiterId);

        return ResponseEntity.ok(response);
    }
}