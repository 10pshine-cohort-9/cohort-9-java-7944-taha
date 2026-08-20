package com.tahashafiq.contactmanagement.service;

import com.tahashafiq.contactmanagement.dto.PostContactDto;

public class ContactMethodSource {
    public static PostContactDto dummyUpdateContact(){
        PostContactDto contactEntity=new PostContactDto();
        contactEntity.setPhoneNumber("0300-2030201");
        return contactEntity;
    }
}

