package com.tahashafiq.contactmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Contact_Table")
public class ContactEntity {
    @Id
    private String contactId;
    @Column(nullable = false)
    private String phoneNumber;
    @Column(nullable = false)
    private String userName;
    private String phoneLabel;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime  createdAt;
    @UpdateTimestamp
    private LocalDateTime  updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
//    @JsonIgnore
    @JsonBackReference
    private UserEntity userEntity;

    @PrePersist
    public void prePersist() {
        if (phoneLabel == null || phoneLabel.isBlank()) {
            phoneLabel = "Personal";
        }
    }
}
