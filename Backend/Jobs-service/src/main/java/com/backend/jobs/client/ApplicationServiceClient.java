package com.backend.jobs.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.backend.jobs.dtos.ApplicationCountResponse;
import com.backend.jobs.dtos.RecruiterApplicationDashboardCountsResponse;

@FeignClient(
        name = "APPLICATION-SERVICE",
        url = "http://localhost:8084",
        path = "/internal/applications"
)
public interface ApplicationServiceClient {

    @PatchMapping("/jobs/{jobId}/deleted")
    void markApplicationsJobDeleted(
            @PathVariable("jobId") Long jobId
    );

    @GetMapping("/recruiter/{recruiterId}/dashboard-counts")
    RecruiterApplicationDashboardCountsResponse
            getRecruiterDashboardCounts(
                    @PathVariable("recruiterId") Long recruiterId
            );

    @GetMapping("/counts")
    List<ApplicationCountResponse> getApplicationCountsByJobIds(
            @RequestParam("jobIds") List<Long> jobIds
    );
}