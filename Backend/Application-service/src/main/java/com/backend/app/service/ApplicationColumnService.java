package com.backend.app.service;

import java.util.List;

import com.backend.app.dto.ApplicationColumnRequest;
import com.backend.app.dto.ApplicationColumnResponse;

public interface ApplicationColumnService {

    List<ApplicationColumnResponse> getColumns(Long jobId, Long recruiterId);

    ApplicationColumnResponse createColumn(
            Long jobId, Long recruiterId, ApplicationColumnRequest request);

    ApplicationColumnResponse updateColumn(
            Long columnId, Long recruiterId, ApplicationColumnRequest request);

    void deleteColumn(Long columnId, Long recruiterId);

    void moveApplicationToColumn(
            Long applicationId, Long columnId, Long recruiterId);
}
