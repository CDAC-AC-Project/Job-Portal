package com.backend.profile.service;

import com.backend.profile.dtos.CompanyInfoRequestDto;
import com.backend.profile.dtos.CompanyResponseDto;
import com.backend.profile.dtos.CompanySocialLinksRequestDto;
import com.backend.profile.dtos.FoundingInfoRequestDto;

public interface CompanyService {

    CompanyResponseDto getCompany(Long recruiterProfileId);

    CompanyResponseDto updateCompanyInfo(Long recruiterProfileId, CompanyInfoRequestDto dto);

    CompanyResponseDto updateFoundingInfo(Long recruiterProfileId, FoundingInfoRequestDto dto);

    CompanyResponseDto updateSocialLinks(Long recruiterProfileId, CompanySocialLinksRequestDto dto);

    void deleteCompany(Long recruiterProfileId);
}
