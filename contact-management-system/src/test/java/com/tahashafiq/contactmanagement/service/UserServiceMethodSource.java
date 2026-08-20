package com.tahashafiq.contactmanagement.service;

import com.tahashafiq.contactmanagement.dto.SignUpDto;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import org.junit.jupiter.params.provider.Arguments;

import java.util.ArrayList;
import java.util.UUID;
import java.util.stream.Stream;

public class UserServiceMethodSource {
    private UserDetailsProvider userDetailsProvider=new UserDetailsProvider();
    public static Stream<Arguments> dummyUpdateUser(){
        UserEntity orignalEntity=dummyUserEntity();

        SignUpDto updatedEntity=new SignUpDto();

        updatedEntity.setUserName("tahashafiq176");
        updatedEntity.setPassword("Tahashafiq1234");
        return  Stream.of(Arguments.of(orignalEntity,updatedEntity));
    }
    public static UserEntity dummyUserEntity(){
        UserEntity userEntity=new UserEntity();

        userEntity.setUserId(UUID.randomUUID().toString());
        userEntity.setFirstName("Taha");
        userEntity.setLastName("Shafiq");
        userEntity.setContactEntities(new ArrayList<>());
        userEntity.setUserName("Tahashafiq175");
        userEntity.setPassword("Tahashafiq123");
        userEntity.setRoles("Admin");
        return userEntity;
    }
}
