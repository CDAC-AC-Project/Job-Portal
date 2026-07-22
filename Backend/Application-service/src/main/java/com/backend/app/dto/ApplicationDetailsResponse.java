package com.backend.app.dto;

import java.time.LocalDateTime;

import com.backend.app.enums.ApplicationStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDetailsResponse {

    private Long applicationId;

    private Long jobId;

    private String jobTitleSnapshot;

    private String companyNameSnapshot;

    private String jobLocationSnapshot;

    private ApplicationStatus status;

    private LocalDateTime appliedAt;

}