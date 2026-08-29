package com.backend.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateNotificationRequest {

    private Long userId;

    private String title;

    private String message;

    private String type;

    private Long referenceId;

    private String referenceType;
}
