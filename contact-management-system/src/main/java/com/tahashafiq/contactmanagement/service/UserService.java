package com.tahashafiq.contactmanagement.service;

import com.tahashafiq.contactmanagement.entity.UserEntity;
import org.apache.catalina.User;

import java.util.List;

public interface UserService {

    // finding all the user
    List<UserEntity> findAllUsers();
    //finding a particular user by Email
     UserEntity findByEmail(String email);
     //finding a particular user by Id
     UserEntity findById(String UserId);
     //Creating a particular User
     UserEntity createUser(UserEntity userEntity);
     //Deleting a Particular User
     void deleteUser(String UserId);
    //changing the fields of existing user
      UserEntity updateUser(UserEntity userEntity);
}
