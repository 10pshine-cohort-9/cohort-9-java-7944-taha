package com.tahashafiq.contactmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "User_Table")
public class UserEntity {
    @Id
    String UserId;
    String firstName;
    String lastName;
    String email;
    String password;
    String createdAt;
    String updatedAt;
    List<String> phoneNumber=new ArrayList<>();
    @OneToMany(mappedBy = "userEntity", fetch=FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonBackReference
    private List<ContactEntity> contactEntities=new ArrayList<>();
}
