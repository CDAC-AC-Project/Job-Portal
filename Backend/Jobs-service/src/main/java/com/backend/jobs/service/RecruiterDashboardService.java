package com.backend.jobs.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.jobs.client.ApplicationServiceClient;
import com.backend.jobs.dao.JobsDao;
import com.backend.jobs.dtos.RecruiterApplicationDashboardCountsResponse;
import com.backend.jobs.dtos.RecruiterDashboardResponse;
import com.backend.jobs.entities.JobStatus;

import lombok.AllArgsConstructor;

@Service
@Transactional(readOnly = true)
@AllArgsConstructor
public class RecruiterDashboardService {

    private final JobsDao jobDao;

    private final ApplicationServiceClient applicationServiceClient;

    public RecruiterDashboardResponse getDashboardCounts(
            Long recruiterId,
            String role
    ) {
        if (!"RECRUITER".equalsIgnoreCase(role)) {
            throw new RuntimeException(
                    "Only recruiter can access dashboard counts"
            );
        }

        long activeJobs =
                jobDao.countByRecruiterIdAndStatus(
                        recruiterId,
                        JobStatus.ACTIVE
                );

        RecruiterApplicationDashboardCountsResponse applicationCounts =
                applicationServiceClient.getRecruiterDashboardCounts(
                        recruiterId
                );

        return new RecruiterDashboardResponse(
                activeJobs,
                applicationCounts.getApplications(),
                applicationCounts.getShortlisted(),
                applicationCounts.getHired()
        );
    }
}