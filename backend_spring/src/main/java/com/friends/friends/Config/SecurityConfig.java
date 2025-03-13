package com.friends.friends.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Vypnout CSRF
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Přidat CORS konfiguraci
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // Povolit VŠECHNY requesty bez autentizace
                );

        return http.build();
    }

    // ✅ CORS konfigurace pro povolení požadavků z localhostu
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:81","https://www.bajerlukas.cz")); // Povolení React FE (Next.js, Vite)
        configuration.setAllowedMethods(List.of("GET", "POST", "PATCH", "DELETE", "OPTIONS")); // Povolené HTTP metody
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type")); // Povolené záhlaví
        configuration.setExposedHeaders(List.of("Authorization")); // Povolit přístup k hlavičkám v odpovědi
        configuration.setAllowCredentials(true); // Povolit cookies/JWT

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}