package com.cdac.service;

import com.cdac.dtos.*;

public interface AuthService {

	AuthResponseDto register(RegisterDto request);

    AuthResponseDto login(LoginDto request);

    MessageResponseDto verifyEmail(String token);

    MessageResponseDto forgotPassword(ForgotPasswordDto request);

    MessageResponseDto resetPassword(ResetPasswordDto request);

    MessageResponseDto changePassword(Long userId, ChangePasswordDto request);

    UserResponseDto getCurrentUser(Long userId);

    RefreshTokenResponseDto refreshToken(RefreshTokenRequestDto request);

    MessageResponseDto logout(RefreshTokenRequestDto request);
}
