package com.tahashafiq.contactmanagement.impl;

import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.repository.UserRepository;
import com.tahashafiq.contactmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Override
    public List<UserEntity> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity findByEmail(String email) {
        return userRepository.findAllByEmail(email);
    }

    @Override
    public UserEntity findById(String UserId) {
        return userRepository.findById(UserId).orElseThrow(()-> new RuntimeException("usernot found"));
    }

    @Override
    public UserEntity createUser(UserEntity userEntity) {
        String uuid = UUID.randomUUID().toString();
        userEntity.setUserId(uuid);
        return userRepository.save(userEntity);
    }

    @Override
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public UserEntity updateUser(UserEntity userEntity) {
        return null;
    }
}
