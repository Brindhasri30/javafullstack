package com.example.civic_reporting.service;

import com.example.civic_reporting.util.JwtUtil;
import com.example.civic_reporting.dto.RegisterRequest;
import com.example.civic_reporting.dto.LoginRequest;
import com.example.civic_reporting.entity.Role;
import com.example.civic_reporting.entity.User;
import com.example.civic_reporting.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already registered";
        }

        Role role = Role.ROLE_USER;
        if (request.getRole() != null) {
            try { role = Role.valueOf(request.getRole()); }
            catch (IllegalArgumentException ignored) { role = Role.ROLE_USER; }
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }
    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getRole().name());
    }
}