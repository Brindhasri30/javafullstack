package com.example.AboutmeApi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class Aboutme {
    @GetMapping()
    public String about(){
        return "index.html";
    }
}
