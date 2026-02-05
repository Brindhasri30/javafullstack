package com.example.first.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class Hello {
    @GetMapping()
    @ResponseBody
    public String hello(){
        return "<html><h1>hello</h1></html>";
    }
}
