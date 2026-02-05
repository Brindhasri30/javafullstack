package com.example.studentdetailsapi;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/students")
public class StudentController {
    private List<StudentModel> students =new ArrayList<>();

    @PostMapping
//    public StudentModel addStudent(@RequestBody StudentModel student){
      public StudentModel addStudent(@RequestParam String name,@RequestParam String department){
        StudentModel student =new StudentModel(name, department);
        students.add(student);
        return student;
    }
    @GetMapping
    public List<StudentModel> getStudents(){
        return students;
    }
}
