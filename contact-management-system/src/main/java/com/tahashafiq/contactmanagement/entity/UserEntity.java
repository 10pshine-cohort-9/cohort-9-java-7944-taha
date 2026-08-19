package com.tahashafiq.contactmanagement.entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tahashafiq.contactmanagement.provider.AuthProvider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.security.Provider;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "User_Table")
public class UserEntity {
    @Id
    String userId;
    @Column(nullable = false)
    String firstName;

    @Column(nullable = true)
    String lastName;

    @Column(unique = true)
    String userName;

    @Column(unique = true)
    String email;


    String password;


    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime  createdAt;

    @Column
    private String roles;


    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    private String providerId;

    @UpdateTimestamp
    private LocalDateTime  updatedAt;
    @OneToMany(mappedBy = "userEntity", fetch=FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ContactEntity> contactEntities=new ArrayList<>();

}
