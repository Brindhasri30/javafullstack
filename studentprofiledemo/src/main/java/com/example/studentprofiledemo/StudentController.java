package com.example.studentprofiledemo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {
    @PostMapping("/students")
    public UserProfile addStudent(@RequestBody UserProfile student){
        return student;
    }
}
