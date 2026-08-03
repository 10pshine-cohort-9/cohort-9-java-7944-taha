package com.tahashafiq.contactmanagement.service;

import com.tahashafiq.contactmanagement.dto.PostContactDto;
import com.tahashafiq.contactmanagement.entity.ContactEntity;

import java.util.List;

public interface ContactService {
    //get all the contacts
//    public List<ContactEntity> getAllContacts(String userName);

    //get contact by contact_id

    public ContactEntity getContactById(String UserId);

    //create contact

    public ContactEntity createContact(PostContactDto postContactDto, String userId);

    //update contact
    public ContactEntity updateContact(ContactEntity contactEntity);

    void deleteContactById(String contactId);

    List<ContactEntity> findContactsByUserName(String userName);

    List<ContactEntity> findAllContact();


}
