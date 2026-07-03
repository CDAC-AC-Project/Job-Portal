package com.backend.app.service;

import com.backend.app.dto.ApplicationResponse;
import com.backend.app.dto.ApplyJobRequest;

public interface ApplicationService {

    ApplicationResponse applyJob(Long candidateId,
            Long jobId,
            ApplyJobRequest dto);

}