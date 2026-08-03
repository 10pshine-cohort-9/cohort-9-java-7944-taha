package com.tahashafiq.contactmanagement.repository;

import com.tahashafiq.contactmanagement.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity,String> {
    UserEntity findByUserName(String userName);
}
