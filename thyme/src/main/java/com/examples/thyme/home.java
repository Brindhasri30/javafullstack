package com.examples.thyme;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class home {
    @GetMapping("/thymedemo")
    public String home(){
        return "thymedemo";
    }
}
