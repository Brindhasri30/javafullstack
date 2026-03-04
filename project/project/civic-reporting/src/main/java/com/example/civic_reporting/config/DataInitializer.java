package com.example.civic_reporting.config;

import com.example.civic_reporting.entity.Role;
import com.example.civic_reporting.entity.User;
import com.example.civic_reporting.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        // Seed default admin if not already present
        if (userRepository.findByEmail("admin@civic.com").isEmpty()) {
            User admin = User.builder()
                    .name("Admin")
                    .email("admin@civic.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("✅ Default admin created: admin@civic.com / admin123");
        }
    }
}
