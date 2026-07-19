package com.cdac.service;

import com.cdac.dtos.*;

public interface AuthService {
	
	AuthResponseDto register(RegisterDto request);

    AuthResponseDto login(LoginDto request);
}
