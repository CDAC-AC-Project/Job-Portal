package com.backend.app.dto;

import com.backend.app.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RecruiterApplicationResponse {

    private Long id;

    private String jobTitle;

    private String companyName;

    private String location;

    private ApplicationStatus status;

    private Long resumeId;
}