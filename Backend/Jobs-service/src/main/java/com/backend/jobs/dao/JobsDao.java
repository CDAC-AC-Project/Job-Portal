package com.backend.jobs.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.jobs.entities.JobStatus;
import com.backend.jobs.entities.JobType;
import com.backend.jobs.entities.Jobs;

public interface JobsDao extends JpaRepository<Jobs, Long> {

    List<Jobs> findByRecruiterIdOrderByCreatedAtDesc(Long recruiterId);

    List<Jobs> findByRecruiterIdAndStatusOrderByCreatedAtDesc(
            Long recruiterId,
            JobStatus status
    );

    long countByRecruiterIdAndStatus(
            Long recruiterId,
            JobStatus status
    );

    @Query(
            value = """
                    SELECT j
                    FROM Jobs j
                    WHERE j.status = :status
                    AND (
                        j.expirationDate IS NULL
                        OR j.expirationDate >= :today
                    )
                    AND (
                        :keyword IS NULL
                        OR LOWER(j.title)
                            LIKE LOWER(CONCAT('%', :keyword, '%'))
                        OR LOWER(j.jobRole)
                            LIKE LOWER(CONCAT('%', :keyword, '%'))
                        OR LOWER(j.tags)
                            LIKE LOWER(CONCAT('%', :keyword, '%'))
                        OR LOWER(j.companyName)
                            LIKE LOWER(CONCAT('%', :keyword, '%'))
                    )
                    AND (
                        :city IS NULL
                        OR LOWER(j.city) = LOWER(:city)
                    )
                    AND (
                        :country IS NULL
                        OR LOWER(j.country) = LOWER(:country)
                    )
                    AND (
                        :jobType IS NULL
                        OR j.jobType = :jobType
                    )
                    ORDER BY j.createdAt DESC, j.id DESC
                    """,
            countQuery = """
                    SELECT COUNT(j)
                    FROM Jobs j
                    WHERE j.status = :status
                    AND (
                        j.expirationDate IS NULL
                        OR j.expirationDate >= :today
                    )
                    AND (
                        :keyword IS NULL
                        OR LOWER(j.title)
                            LIKE LOWER(CONCAT('%', :keyword, '%'))
                        OR LOWER(j.jobRole)
                            LIKE LOWER(CONCAT('%', :keyword, '%'))
                        OR LOWER(j.tags)
                            LIKE LOWER(CONCAT('%', :keyword, '%'))
                        OR LOWER(j.companyName)
                            LIKE LOWER(CONCAT('%', :keyword, '%'))
                    )
                    AND (
                        :city IS NULL
                        OR LOWER(j.city) = LOWER(:city)
                    )
                    AND (
                        :country IS NULL
                        OR LOWER(j.country) = LOWER(:country)
                    )
                    AND (
                        :jobType IS NULL
                        OR j.jobType = :jobType
                    )
                    """
    )
    Page<Jobs> searchJobs(
            @Param("keyword") String keyword,
            @Param("city") String city,
            @Param("country") String country,
            @Param("jobType") JobType jobType,
            @Param("status") JobStatus status,
            @Param("today") LocalDate today,
            Pageable pageable
    );

    @Query("""
            SELECT j
            FROM Jobs j
            WHERE j.status = :status
            AND (
                j.expirationDate IS NULL
                OR j.expirationDate >= :today
            )
            ORDER BY j.createdAt DESC
            """)
    List<Jobs> findCandidateHomeJobs(
            @Param("status") JobStatus status,
            @Param("today") LocalDate today,
            Pageable pageable
    );
}