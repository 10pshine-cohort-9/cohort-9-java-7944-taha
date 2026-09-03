package com.tahashafiq.contactmanagement.service;

import com.tahashafiq.contactmanagement.dto.AdminDashboardDto;
import com.tahashafiq.contactmanagement.dto.PostContactDto;
import com.tahashafiq.contactmanagement.entity.ContactEntity;

import java.util.List;

public interface ContactService {
    //get all the contacts
    List<AdminDashboardDto> findAllContact();

//get all contact of a particular user
    List<ContactEntity> findAllContactOfUser(String userName);
//

    //get all contacts of a particualr user

    List<ContactEntity> findContactsByUserName(String userName);

    //get contact by contact_id

    ContactEntity getContactById(String userId);

    //create contact

    ContactEntity createContact(PostContactDto postContactDto, String userId);

    //update contact
    ContactEntity updateContact(PostContactDto contactDto,ContactEntity contactEntity);

    // delete contact

    void deleteContactById(ContactEntity contact);


}
