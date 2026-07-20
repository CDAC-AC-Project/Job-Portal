package com.backend.jobs.dtos;

import java.util.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.backend.jobs.entities.JobLevel;
import com.backend.jobs.entities.JobType;

public class CandidateHomeJobResponse {
	private Long id;

    private String title;

    private String jobRole;

    private BigDecimal minSalary;

    private BigDecimal maxSalary;

    private String education;

    private String experience;

    private JobType jobType;

    private Integer vacancies;

    private LocalDate expirationDate;

    private JobLevel jobLevel;

    private String country;

    private String state;

    private String city;

    private Boolean remote;

    private LocalDateTime createdAt;

    private Long companyId;

    private List<String> benefits;
}
