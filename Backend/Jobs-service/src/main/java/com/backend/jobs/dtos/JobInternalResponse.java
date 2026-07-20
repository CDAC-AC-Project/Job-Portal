package com.backend.jobs.dtos;

import com.backend.jobs.entities.JobStatus;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JobInternalResponse {
	private Long jobId;
    private String title;
    private Long recruiterId;
    //private Long companyId;
    private String companyName;
    private String location;
    private JobStatus status;
}
