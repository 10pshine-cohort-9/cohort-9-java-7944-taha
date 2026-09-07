package com.tahashafiq.contactmanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {

    @NotBlank(
            message = "First name is required"
    )
    @Size(
            min = 2,
            max = 30,
            message = "First name must be between 2 and 30 characters"
    )
    private String firstName;


    @Size(
            max = 30,
            message = "Last name cannot exceed 30 characters"
    )
    private String lastName;


    @NotBlank(
            message = "Email is required"
    )
    @Email(
            message = "Please enter a valid email address"
    )
    private String email;


    @NotBlank(
            message = "Username is required"
    )
    @Size(
            min = 3,
            max = 20,
            message = "Username must be between 3 and 20 characters"
    )
    @Pattern(
            regexp = "^[a-zA-Z0-9_]+$",
            message = "Username can only contain letters, numbers, and underscores"
    )
    private String userName;


    @NotBlank(
            message = "Password is required"
    )
    @Size(
            min = 8,
            message = "Password must contain at least 8 characters"
    )
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$",
            message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    private String password;

}