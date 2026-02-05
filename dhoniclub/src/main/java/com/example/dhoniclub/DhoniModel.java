package com.example.dhoniclub;

public class DhoniModel {
    private String name;
    private String email;
    private long  contactnumber;
    private String password;
    public  String city;
    public   int pincode;
    public DhoniModel(){}
    public DhoniModel(String name,String email,long contactnumber,String password,String city,int pincode){
        this.name=name;
        this.email=email;
        this.contactnumber=contactnumber;
        this.password=password;
        this.city=city;
        this.pincode=pincode;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public long getContactnumber() {
        return contactnumber;
    }
    public void setContactnumber(long contactnumber) {
        this.contactnumber = contactnumber;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
