package com.tahashafiq.contactmanagement.service;

import com.tahashafiq.contactmanagement.dto.PostContactDto;
import com.tahashafiq.contactmanagement.entity.ContactEntity;

import java.util.List;

public interface ContactService {
    //get all the contacts
    List<ContactEntity> findAllContact();

//get all contact of a particular user
    public List<ContactEntity> findAllContactOfUser(String userName);
//

    //get all contacts of a particualr user

    public List<ContactEntity> findContactsByUserName(String userName);

    //get contact by contact_id

    public ContactEntity getContactById(String UserId);

    //create contact

    public ContactEntity createContact(PostContactDto postContactDto, String userId);

    //update contact
    public ContactEntity updateContact(PostContactDto contactDto,ContactEntity contactEntity);

    // delete contact

    public boolean deleteContactById(String contactId,String userName);


}
