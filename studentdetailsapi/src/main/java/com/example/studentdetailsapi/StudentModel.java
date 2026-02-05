package com.example.studentdetailsapi;

public class StudentModel {
    private String name;
    private String department;

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getDepartment(){
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
    public StudentModel(){}
    public StudentModel(String name,String department){
        this.name=name;
        this.department=department;
    }
}
