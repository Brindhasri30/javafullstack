package com.example.redbullApi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class redbull {
    @GetMapping("/red")
    public String red(){
        return "REDBULL GIVES U WINGS";
    }
}
