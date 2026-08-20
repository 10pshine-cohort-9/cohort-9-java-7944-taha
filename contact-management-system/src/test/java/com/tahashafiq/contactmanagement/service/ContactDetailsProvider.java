package com.tahashafiq.contactmanagement.service;

import com.tahashafiq.contactmanagement.dto.PostContactDto;
import com.tahashafiq.contactmanagement.entity.ContactEntity;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.support.ParameterDeclarations;

import java.util.ArrayList;
import java.util.UUID;
import java.util.stream.Stream;

public class ContactDetailsProvider implements ArgumentsProvider {
    @Override
    public Stream<? extends Arguments> provideArguments(ParameterDeclarations parameters, ExtensionContext context) throws Exception {
        PostContactDto contactEntity1=new PostContactDto();
        contactEntity1.setPhoneNumber("0300-6863930");


        PostContactDto contactEntity2=new PostContactDto();
        contactEntity2.setPhoneNumber("0320-3020320");


        return  Stream.of(Arguments.of(contactEntity1,contactEntity2));
    }



    public ContactEntity dummyContactEntity(){
        ContactEntity contactEntity=new ContactEntity();
        contactEntity.setContactId("123-456");
        contactEntity.setPhoneNumber("0300-6863940");
        contactEntity.setUserName("Tahashafiq175");
        return contactEntity;
    }
}
