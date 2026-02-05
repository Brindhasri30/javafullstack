package com.example.dhoniclub;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/dhoni")
public class DhoniController {
    List<DhoniModel> l=new ArrayList<>();
    @PostMapping
    public DhoniModel addfan(@RequestParam String name,@RequestParam  String email,@RequestParam long contactnumber,@RequestParam String password,@RequestParam String city,@RequestParam int pincode) {
        DhoniModel f=new DhoniModel(name,email,contactnumber,password,city,pincode);
        l.add(f);
        return f;
    }

    @GetMapping
    public List<DhoniModel> display(){
        return l;
    }
}
