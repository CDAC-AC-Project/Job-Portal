package com.backend.app.service;

import java.util.List;

import com.backend.app.dto.ApplicationDetailsResponse;
import com.backend.app.dto.ApplicationResponse;
import com.backend.app.dto.ApplyJobRequest;
import com.backend.app.dto.MyApplicationResponse;

public interface ApplicationService {

    ApplicationResponse applyJob(Long candidateId,
            Long jobId,
            ApplyJobRequest dto);
    
    List<MyApplicationResponse> getMyApplication(Long candidateId);
    
    ApplicationDetailsResponse getApplication(Long applicationId);
    
    ApplicationResponse withdrawApplication(Long applicationId, Long candidateId);

}