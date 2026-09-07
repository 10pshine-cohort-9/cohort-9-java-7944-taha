package com.tahashafiq.contactmanagement.service;

import com.tahashafiq.contactmanagement.dto.PostContactDto;
import com.tahashafiq.contactmanagement.entity.ContactEntity;
import org.jspecify.annotations.NonNull;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.support.ParameterDeclarations;

import java.util.stream.Stream;

public class ContactDetailsProvider implements ArgumentsProvider {
    @SuppressWarnings("NullableProblems")
    @Override
    public Stream<? extends Arguments> provideArguments(@NonNull ParameterDeclarations parameters, @NonNull ExtensionContext context){
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
