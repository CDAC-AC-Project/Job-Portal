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
public class MyApplicationResponse {

    private Long Id;

    private Long jobId;

    private String jobTitleSnapshot;

    private String companyNameSnapshot;

    private ApplicationStatus status;

    private LocalDateTime appliedAt;

}