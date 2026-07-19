package com.cdac.service;

import com.cdac.entities.User;
import io.jsonwebtoken.Claims;

public interface JwtService {

    String generateToken(User user);

    Claims extractClaims(String token);

    String extractEmail(String token);

    Long extractUserId(String token);

    String extractRole(String token);

    boolean isTokenValid(String token);
}