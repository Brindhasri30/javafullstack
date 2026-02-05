package com.example.happyapi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HappyController {
    @GetMapping("/display")
    public String display(){
        return "<html><h1>WELCOME TO HAPPY API <br> <img src=https://tse2.mm.bing.net/th/id/OIP.ZmVKAvmIVVA0zbEiesbqXwHaD2?pid=Api&P=0&h=180></h1></html>";
    }
    @GetMapping("/display/{name}")
    public String display(@PathVariable String name){
        return "<html><h1>WELCOME TO HAPPY API <br><marquee>"+name.toUpperCase()+"</marquee><br> <img src=https://tse2.mm.bing.net/th/id/OIP.ZmVKAvmIVVA0zbEiesbqXwHaD2?pid=Api&P=0&h=180></h1></html>";
    }
    @GetMapping("/myamstrongchecker/{n}")
    public String display(@PathVariable int n){
        int copy=n;
        int c=0;
        int s=0;
        while(n>0){
            int ld=n%10;
            n=n/10;
            c++;
        }
        n=copy;
        while(n>0){
            int ld=n%10;
            s+=Math.pow(ld,c);
            n=n/10;
        }
        if(s==copy)
        return "<h1>"+String.valueOf(copy)+" is Amstrong Number<h1>";
        return "<h1>"+String.valueOf(copy)+" is not an Amstrong Number<h1>";
    }
    @GetMapping("/allinone/{name}/{n}")
    public String display(@PathVariable String name,@PathVariable int n){
        int copy=n;
        int c=0;
        int s=0;
        while(n>0){
            int ld=n%10;
            n=n/10;
            c++;
        }
        n=copy;
        while(n>0){
            int ld=n%10;
            s+=Math.pow(ld,c);
            n=n/10;
        }
        if(s==copy)
            return "<html><h1>WELCOME TO HAPPY API <br><marquee>"+name.toUpperCase()+"</marquee><br> <img src=https://tse2.mm.bing.net/th/id/OIP.ZmVKAvmIVVA0zbEiesbqXwHaD2?pid=Api&P=0&h=180><br>"+String.valueOf(copy)+" is Amstrong Number</h1></html>";
        return "<html><h1>WELCOME TO HAPPY API <br><marquee>"+name.toUpperCase()+"</marquee><br> <img src=https://tse2.mm.bing.net/th/id/OIP.ZmVKAvmIVVA0zbEiesbqXwHaD2?pid=Api&P=0&h=180><br>"+String.valueOf(copy)+" is not an Amstrong Number</h1></html>";
    }
    @GetMapping("/printint/{n1}/{n2}/{n3}")
    public float[] intsum(@PathVariable float n1,@PathVariable float n2,@PathVariable float n3){
        float s=n1+n2+n3;
//        StringBuilder r=new StringBuilder();
//        r.append(n1+" "+n2+" "+n3);
//        String res=r.toString();
        if(s>100){
            return new float[]{s};
        }
        else{
            return new float[]{n1,n2,n3};
        }
    }
    @GetMapping("/printstring/{n1}/{n2}/{n3}")
    public String stringsum(@PathVariable float n1,@PathVariable float n2,@PathVariable float n3){
        int s=(int)(n1+n2+n3);
        if(s>100){
            return String.valueOf(s);
        }
        else{
            return String.valueOf(n1)+" "+String.valueOf(n2)+" "+String.valueOf(n3);
        }
    }
}
