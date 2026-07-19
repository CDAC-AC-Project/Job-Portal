package com.backend.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "application_columns")
@Getter
@Setter
public class ApplicationColumn extends BaseEntity {

    @Column(name = "job_id", nullable = false)
    private Long jobId;

    @Column(name = "recruiter_id", nullable = false)
    private Long recruiterId;

    @Column(name = "column_name", nullable = false)
    private String columnName;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "default_column")
    private boolean defaultColumn;

}