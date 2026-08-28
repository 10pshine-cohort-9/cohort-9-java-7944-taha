package com.tahashafiq.contactmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostContactDto {
    private String userName;
    private String phoneNumber;
    private String phoneLabel;
}
