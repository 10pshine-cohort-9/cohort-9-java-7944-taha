package com.tahashafiq.contactmanagement.dto;

import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardDto {
        private String owner;
        private String contactId;
        private String userId;
        private String userName;
        private String phoneNumber;
        private String phoneLabel;
    }

