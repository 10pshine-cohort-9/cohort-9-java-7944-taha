package com.tahashafiq.contactmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Contact_Table")
public class ContactEntity {
    @Id
    private String ContactId;
    private String firstName;
    private String lastName;
    private String email;
    private String emailLabel;
    private String phoneNumber;
    private String phoneLabel;
    private String createdAt;
    private String updatedAt;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_id")
//    @JsonIgnore
    @JsonBackReference
    private UserEntity userEntity;
}
