package com.backend.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RecruiterApplicationResponse {

    private Long id;

    private String candidateName;

    private String candidateEmail;

    private String jobTitle;

    private String resumeUrl;

    private String status;

}