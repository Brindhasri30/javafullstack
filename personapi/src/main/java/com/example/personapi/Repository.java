package com.example.personapi;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Repository extends JpaRepository<PersonModel,Long> {

}
