package com.tahashafiq.contactmanagement.repository;

import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.provider.AuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,String> {
    UserEntity findByUserName(String userName);


    Optional<UserEntity> findByAuthProviderAndProviderId(AuthProvider authProvider, String providerId);

     UserEntity findByEmail(String email);
}
