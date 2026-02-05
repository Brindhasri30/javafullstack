package com.example.happyapi;

public class UserProfile {
        private int sno;
        private String firstname;
        String lastname;
        int contactnumber;
        float myfloatnumber;

    private int getSno(){
        return sno;
    }
    private void setsSno(int sno){
        this.sno=sno;
    }
    public String getFirstname(){
        return firstname;
    }
    public void setFirstname(String firstname){
        this.firstname=firstname;
    }
    public String getLastname(){
        return lastname;
    }
    public void setLastname(String lastname){
        this.lastname=lastname;
    }
    public int getContactnumber(){
        return contactnumber;
    }
    public void setContactnumber(int contactnumber){
        this.contactnumber=contactnumber;
    }
    public float getMyfloatnumber(){
        return myfloatnumber;
    }
    public void setMyfloatnumber(float myfloatnumber){
        this.myfloatnumber=myfloatnumber;
    }


}
