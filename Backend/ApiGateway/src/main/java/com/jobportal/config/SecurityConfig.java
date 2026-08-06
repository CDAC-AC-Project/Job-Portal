package com.jobportal.config;

import com.jobportal.filter.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    	http.csrf(csrf -> csrf.disable());
		// 2. Retain basic auth scheme (disable form based auth)
	//	http.httpBasic(Customizer.withDefaults());
		// 3. Disable HttpSession (Tell Spring sec - DO NOT create HttpSession object
		// to store Spring security context holder
		http.sessionManagement(session -> 
		session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		// 4. Add a rule - all endpoints - secured (requires Authentication)
		http.authorizeHttpRequests(auth -> auth
				.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.requestMatchers("/actuator/health").permitAll()
				.requestMatchers(
						"/auth/register",
						"/auth/login",
						"/auth/verify-email",
						"/auth/forgot-password",
						"/auth/reset-password",
						"/auth/refresh-token",
						"/auth/logout"
				).permitAll()
				.anyRequest().authenticated()
				)

			.cors(Customizer.withDefaults())

			.addFilterBefore(jwtAuthenticationFilter,
				UsernamePasswordAuthenticationFilter.class);
		return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        return request -> {
            CorsConfiguration config = new CorsConfiguration();

            // Both origins allowed: localhost for browsing directly on this PC, and the
            // LAN IP for other devices (e.g. a phone) on the same network reaching the
            // Vite dev server started with `host: true`.
            config.setAllowedOrigins(List.of("http://localhost:5173", "http://192.168.0.102:5173"));
            config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
            config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
            config.setExposedHeaders(List.of("Authorization"));
            config.setAllowCredentials(true);

            return config;
        };
    }
}