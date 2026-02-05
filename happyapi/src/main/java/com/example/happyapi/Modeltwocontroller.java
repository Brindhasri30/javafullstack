package com.example.happyapi;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class Modeltwocontroller {
//    @PostMapping("/model2post")
//    public Modeltwo model(@RequestBody Modeltwo model){
//        return model;
//    }
    private List<Modeltwo> store =new ArrayList<>();
    @PostMapping("/modelpost")
    public Modeltwo addata(@RequestBody Modeltwo model){
        store.add(model);
        return model;
    }
    @GetMapping("/modelget")
    public List<Modeltwo> getAll(){
        return store;
    }
//    @GetMapping("/model2get")
//    public Modeltwo sampleData(){
//        Modeltwo m=new Modeltwo();
//        m.setName("Rajinikanth");
//        m.setColor("Blue");
//        return m;
//    }
    @PostMapping("/storemultiple")
    public List<Modeltwo> storemultiple(@RequestBody List<Modeltwo> m){
        store.addAll(m);
        return m;
    }
    @PutMapping("/edit/{index}")
    public  Modeltwo update(@PathVariable int index,@RequestBody Modeltwo newData){
        if(index>=0 && index<store.size()){
            store.set(index,newData);
            return newData;
        }
        else{
            throw new RuntimeException("Invalid index");
        }
    }
    @DeleteMapping("/delete/{index}")
    public String delete(@PathVariable int index){
        if(index>=0&&index<store.size()) {
            store.remove(index);
            return "Deleted sucessfully at index" + index;
        }
        else{
            return "Invalid index: "+index;
        }
    }
}


