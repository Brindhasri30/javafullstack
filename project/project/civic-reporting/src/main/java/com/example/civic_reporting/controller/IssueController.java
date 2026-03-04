package com.example.civic_reporting.controller;

import com.example.civic_reporting.dto.IssueRequest;
import com.example.civic_reporting.entity.Issue;
import com.example.civic_reporting.entity.IssueStatus;
import com.example.civic_reporting.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // allow all endpoints
@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping
    public Issue createIssue(@RequestBody IssueRequest issueDTO) {
        return issueService.createIssue(issueDTO.getTitle(), issueDTO.getDescription(),
                issueDTO.getLocation(), issueDTO.getCategory(), issueDTO.getEmail());
    }

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueService.getAllIssues();
    }

    @GetMapping("/my")
    public List<Issue> getMyIssues(@RequestParam String email) {
        return issueService.getIssuesByEmail(email);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/status")
    public Issue updateStatus(
            @PathVariable Long id,
            @RequestParam IssueStatus status
    ) {
        return issueService.updateIssueStatus(id, status);
    }

}