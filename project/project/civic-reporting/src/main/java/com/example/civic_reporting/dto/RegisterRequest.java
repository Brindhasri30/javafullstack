package com.example.civic_reporting.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role; // ROLE_USER, ROLE_ADMIN, ROLE_WORKER
}
