package com.tahashafiq.contactmanagement.impl;

import com.tahashafiq.contactmanagement.Exception.ResourceNotFoundException;
import com.tahashafiq.contactmanagement.dto.GetUserDto;
import com.tahashafiq.contactmanagement.dto.PostContactDto;
import com.tahashafiq.contactmanagement.entity.ContactEntity;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.repository.ContactRepository;
import com.tahashafiq.contactmanagement.service.ContactService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Service
@Slf4j
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private UserServiceImpl userService;


    @Override
    public List<ContactEntity> findAllContact() {
        return contactRepository.findAll();
    }

    @Override
    public List<ContactEntity> findAllContactOfUser(String userName){
        return contactRepository.findAllByUserName(userName);
    }

    @Override
    public ContactEntity getContactById(String contactId) {

        return contactRepository.findById(contactId).
                orElseThrow(()-> new ResourceNotFoundException("reource not found"));
    }

    @Override
    public ContactEntity createContact(PostContactDto contactEntityDto, String userName) {
        ContactEntity contactEntity = mapToContactDto(contactEntityDto,userName);
           UserEntity userEntity= userService.findEntityByUserName(userName);
           contactEntity.setUserEntity(userEntity);
           userEntity.getContactEntities().add(contactEntity);
        System.out.println(userEntity.getContactEntities().size());
           userService.saveUser(userEntity);
        return contactEntity;
    }
    @Override
    public ContactEntity updateContact(PostContactDto updatedContact, ContactEntity existedContact) {
        if(updatedContact.getPhoneNumber()!=null && !updatedContact.getPhoneNumber().isEmpty()){
            existedContact.setPhoneNumber(updatedContact.getPhoneNumber());
        }
       return contactRepository.save(existedContact);
    }

    @Override
    public boolean deleteContactById(String contactId,String  userName) {
        ContactEntity contact = contactRepository
                .findByContactIdAndUserName(contactId, userName)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Contact not found"));

        contactRepository.delete(contact);

        log.info("Contact with id {} deleted successfully", contactId);

        return true;
    }

    @Override
    public List<ContactEntity> findContactsByUserName(String userName) {
        List<ContactEntity> byUserName = contactRepository.findAllByUserName(userName);
        if(byUserName==null){
            throw new ResourceNotFoundException("resource not found");
        }
        return byUserName;
    }

    ContactEntity mapToContactDto(PostContactDto contactDto,String userName) {
        ContactEntity contactEntity = new ContactEntity();
        contactEntity.setContactId(UUID.randomUUID().toString());
        contactEntity.setPhoneNumber(contactDto.getPhoneNumber());
        contactEntity.setUserName(userName);
        return  contactEntity;
    }

}
