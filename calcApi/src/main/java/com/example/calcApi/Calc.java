package com.example.calcApi;

import org.springframework.boot.autoconfigure.condition.ConditionalOnCheckpointRestore;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Calc {
    @GetMapping({"/{op}/{n1}/{n2}"})
    public String calc(@PathVariable String op,@PathVariable Integer n1,@PathVariable Integer n2) {
        int a=n1 + n2;
        int s=n1 - n2;
        int p=n1 * n2;
        int q=n1 / n2;
        int r=n1 % n2;
        if(op.equals("add")) {
            return String.valueOf(a);
        }
        if(op.equals("sub")){
            return String.valueOf(s);
        }
        if(op.equals("prod")) {
            return String.valueOf(p);
        }
        if(op.equals("quo")){
            return String.valueOf(q);
        }
        if(op.equals("rem")) {
            return String.valueOf(r);
        }
        return "add: "+a+
                "\nsub: "+s+
                "\nprod: "+p+
                "\nquo: "+q+
                "\nrem: "+r;
    }
}
