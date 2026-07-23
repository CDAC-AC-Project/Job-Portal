package com.backend.app.dto;

import com.backend.app.enums.JobStatus;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JobInternalResponse {

	    private Long jobId;

	    private String title;

	    private Long recruiterId;

	    private String companyName;

	    private String location;

	    private JobStatus status;

}
