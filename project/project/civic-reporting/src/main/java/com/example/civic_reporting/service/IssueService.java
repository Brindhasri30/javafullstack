package com.example.civic_reporting.service;

import com.example.civic_reporting.entity.*;
import com.example.civic_reporting.repository.IssueRepository;
import com.example.civic_reporting.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final UserRepository userRepository;

    public Issue createIssue(String title, String description, String location, String category, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Issue issue = Issue.builder()
                .title(title)
                .description(description)
                .location(location)
                .category(category)
                .status(IssueStatus.OPEN)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        return issueRepository.save(issue);
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public List<Issue> getUserIssues(Long userId) {
        return issueRepository.findByUserId(userId);
    }
    public List<Issue> getIssuesByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return issueRepository.findByUserId(user.getId());
    }
    public Issue updateIssueStatus(Long issueId, IssueStatus status) {

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        issue.setStatus(status);

        return issueRepository.save(issue);
    }
}