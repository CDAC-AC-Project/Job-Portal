package com.backend.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.backend.app.enums.ApplicationStatus;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "application_status_history")
@Getter
@Setter
public class ApplicationStatusHistory extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private JobApplication application;

    @Enumerated(EnumType.STRING)
    @Column(name = "old_status")
    private ApplicationStatus oldStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "new_status", nullable = false)
    private ApplicationStatus newStatus;

    @Column(name = "changed_by", nullable = false)
    private Long changedBy;

    @Column(name = "changed_at")
    private LocalDateTime changedAt;

    @PrePersist
    public void setChangedAt() {
        if (changedAt == null) {
            changedAt = LocalDateTime.now();
        }
    }

}