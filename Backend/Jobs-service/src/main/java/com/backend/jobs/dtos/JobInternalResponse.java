package com.backend.jobs.dtos;

import java.math.BigDecimal;

import com.backend.jobs.entities.JobStatus;
import com.backend.jobs.entities.JobType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class JobInternalResponse {
	private Long jobId;
    private String title;
    private Long recruiterId;
    //private Long companyId;
    private String companyName;
    private String country;
    private String state;
    private String city;
    private boolean remote;
    private JobStatus status;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private JobType jobType;
}
