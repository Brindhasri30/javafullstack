package com.example.lemon;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Lemons {
    @GetMapping("/lemons/{n}")
    public String lemons(@PathVariable int n){
        int[] g=new int[3];
        int s=n;
        for(int i=0;i<3;i++){
            if(n>=7){
                g[i]=7;
                n=n-7;
            }
            else{
                g[i]=n;
            }
        }
//        return "<h1> God1 : offered "+if(g[0]==7)?String.valueOf(7):if(g[0]==0)?"need 7":"have "+g[0]+"need "+
        if(s==21)
        return  "god1 : offered 7 <br> god2: offered 7 <br> god3 : offered 7 <br> sufficient <br> God bess you :)";
        if(s>21){
            return  "god1 : offered 7 <br> god2: offered 7 <br> god3 : offered 7 <br> surplus :"+ Integer.valueOf(s-21)+"<br> God bess you :)";
        }
        if(0<s&&s<21){
            return  "god1 : offered"+if(g[0]==7)?"offered 7":if()+"<br> god2: offered "+g[1]+" <br> god3 : offered "+g[2] +"<br> surplus :"+ Integer.valueOf(s-21)+"<br> God bess you :)";
        }
        return "";
    }
}
