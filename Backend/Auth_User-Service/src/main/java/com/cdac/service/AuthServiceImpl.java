package com.cdac.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.entities.User;
import com.cdac.dtos.*;
import com.cdac.daos.*;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ModelMapper mapper;

    @Override
    public AuthResponseDto register(RegisterDto request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = mapper.map(request, User.class);


        // Password should never be stored directly
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActive(true);
        user.setEmailVerified(false);

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(savedUser);

        AuthResponseDto response = mapper.map(savedUser, AuthResponseDto.class);
        response.setToken(token);
        response.setUserId(savedUser.getId());
        response.setMessage("User registered successfully");

        return response;
    }

    @Override
    public AuthResponseDto login(LoginDto request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.isActive()) {
            throw new RuntimeException("Account is disabled");
        }

        String token = jwtService.generateToken(user);

        AuthResponseDto response = mapper.map(user, AuthResponseDto.class);
        response.setToken(token);
        response.setMessage("Login successful");

        return response;
    }
}
