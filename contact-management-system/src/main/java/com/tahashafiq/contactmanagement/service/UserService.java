package com.tahashafiq.contactmanagement.service;

import com.tahashafiq.contactmanagement.dto.GetUserDto;
import com.tahashafiq.contactmanagement.dto.SignUpDto;
import com.tahashafiq.contactmanagement.entity.UserEntity;

import java.util.List;

public interface UserService {

    // finding all the user
    List<GetUserDto> findAllUsers();
    //finding a particular user by Id
     GetUserDto findById(String UserId);
     //finding a user by UserName
    UserEntity findByUserName(String userName);
     //Creating a particular User
     UserEntity createUser(SignUpDto postUserDto);

    //Deleting a Particular User
     void deleteUser(String UserId);
    //changing the fields of existing user
      UserEntity updateUser(UserEntity userEntity);

    public UserEntity findEntityByUserName(String userName);
}
