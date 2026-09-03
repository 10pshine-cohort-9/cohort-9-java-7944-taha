package com.tahashafiq.contactmanagement.controller;

import com.tahashafiq.contactmanagement.dto.GetUserDto;
import com.tahashafiq.contactmanagement.dto.SignUpDto;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.service.ContactDetailsProvider;


import java.util.List;

public class UserControlllerDtoProvider {
    public GetUserDto getUserDtoProvider(){
        GetUserDto getUserDto = new GetUserDto();
        getUserDto.setUserId("123");
        getUserDto.setFirstName("John");
        getUserDto.setLastName("Doe");
        getUserDto.setUserName("JohnDoe123");
        getUserDto.getPhoneNumbers().add("123");
        getUserDto.getPhoneNumbers().add("456");
        return  getUserDto;
    }

    public SignUpDto updateUserDtoProvider(){
        SignUpDto signUpDto = new SignUpDto();
        signUpDto.setPassword("JohnDoe345");
        return  signUpDto;
    }

    public UserEntity userEntityProvider(){
        ContactDetailsProvider contactMethodSource = new ContactDetailsProvider();
        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName("John");
        userEntity.setLastName("Doe");
        userEntity.setUserName("JohnDoe123");
        userEntity.setContactEntities(List.of(contactMethodSource.dummyContactEntity()));
        return userEntity;
    }
}
