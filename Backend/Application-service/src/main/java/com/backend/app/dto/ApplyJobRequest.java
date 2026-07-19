package com.backend.app.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplyJobRequest {

    @NotNull(message = "Resume Id is required")
    private Long resumeId;

}