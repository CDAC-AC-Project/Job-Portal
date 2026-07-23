package com.backend.jobs.dtos;

import java.math.BigDecimal;

import com.backend.jobs.entities.JobType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobCardResponse {

    private Long id;              // needed for View Details / Apply / Save Job

    private String title;

    private BigDecimal minSalary;
    private BigDecimal maxSalary;

    private String city;
    private String country;
    private String message;

    private Boolean remote;

    private JobType jobType;

    private String companyName;
    private String companyLogoUrl;
}
