package com.example.helloApi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class Hello {
//    @GetMapping("/hello/{name}/{city}/{clg}")
//    public String sayhello(@PathVariable String name,@PathVariable String city,@PathVariable String clg){
//        return "hello, I am "+ name +" , from "+city+", Welcome to "+clg+"!";
//    }
//    @GetMapping("/hello/{name}/{city}")
//    public String nc(@PathVariable String name,@PathVariable String city){
//        return "hello, I am "+ name +" , from "+city+"!";
//    }
//    @GetMapping("/hello/{name}")
//    public String n(@PathVariable String name){
//        return "hello, I am "+ name +"!";
//    }
//    @GetMapping("/hello")
//    public String n(){
//        return "hello !";
    @GetMapping({"/hello/{name}","/hello/{name}/{city}","hello/{name}/{city}/{age}","hello/{name}/{city}/{age}/{clg}"})
    public  String hi(@PathVariable String name,@PathVariable(required=false) String city,@PathVariable(required = false) Integer age,@PathVariable(required = false) String clg){

        if(clg!=null){
            return "Hello, I am "+name+" from "+city+" my age is "+age+" Welcome to "+clg;
        }
        if(age!=null){
            return "Hello, I am "+name+" from "+city+" my age is"+age;
        }
        if(city!=null) {
            return "Hello, I am " + name + " from " + city;
        }
        return "Hello, I am "+name;
    }
}
