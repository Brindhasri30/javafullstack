package com.example.civic_reporting.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueRequest {
    private String title;
    private String description;
    private String location;
    private String category;
    private String email;
}