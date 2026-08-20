package com.tahashafiq.contactmanagement.service;

import com.tahashafiq.contactmanagement.dto.SignUpDto;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.support.ParameterDeclarations;

import java.util.ArrayList;
import java.util.UUID;
import java.util.stream.Stream;

public class UserDetailsProvider implements ArgumentsProvider {
    @Override
    public Stream<? extends Arguments> provideArguments(ParameterDeclarations parameters, ExtensionContext context) throws Exception {
        SignUpDto user1=new SignUpDto();
        user1.setUserName("Tahashafiq175");
        user1.setPassword("Tahashafiq123");
        user1.setFirstName("Taha");
        user1.setLastName("Shafiq");
        user1.setEmail("tahashafiq@gmail.com");
        SignUpDto user2=new SignUpDto();
        user2.setUserName("Usamashafiq175");
        user2.setPassword("Usamashafiq123");
        user2.setFirstName("Usama");
        user2.setLastName("Shafiq");
        user2.setEmail("Usamashafiq@gmail.com");
        return  Stream.of(Arguments.of(user1),Arguments.of(user2));
    }

    public UserEntity dummyUserEntity(){
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

    public Stream<? extends Arguments> dummyUpdatedUser(ParameterDeclarations parameters, ExtensionContext context) throws Exception{
        UserEntity originalEntity=dummyUserEntity();

        UserEntity updatedEntity=new UserEntity();
        updatedEntity.setUserId(originalEntity.getUserId());
        updatedEntity.setFirstName("Usama");
        updatedEntity.setLastName("Shafiq");
        updatedEntity.setContactEntities(new ArrayList<>());
        updatedEntity.setUserName("Usamashafiq175");
        updatedEntity.setPassword("Usamashafiq123");
        updatedEntity.setRoles("Admin");
        return Stream.of(Arguments.of(updatedEntity,originalEntity));
    }
}
