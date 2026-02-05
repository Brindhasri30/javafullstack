package com.example.happyapi;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeProfie {
    @PostMapping("/welcome")
    public UserProfile addStudent(@RequestBody UserProfile welcome){
        return welcome;
    }
}
