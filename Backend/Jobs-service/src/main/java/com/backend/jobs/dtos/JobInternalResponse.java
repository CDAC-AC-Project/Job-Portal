package com.backend.jobs.dtos;

import java.math.BigDecimal;

import com.backend.jobs.entities.JobStatus;

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
    private String location;
    private JobStatus status;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private String jobType;
}
