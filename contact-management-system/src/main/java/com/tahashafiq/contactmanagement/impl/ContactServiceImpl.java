package com.tahashafiq.contactmanagement.impl;

import com.tahashafiq.contactmanagement.dto.PostContactDto;
import com.tahashafiq.contactmanagement.entity.ContactEntity;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.repository.ContactRepository;
import com.tahashafiq.contactmanagement.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private UserServiceImpl userService;

    @Override
    public ContactEntity getContactById(String UserId) {
        return contactRepository.findById(UserId).orElse(null);
    }

    @Override
    public ContactEntity createContact(PostContactDto contactEntityDto, String userName) {
        ContactEntity contactEntity = mapToContactDto(contactEntityDto,userName);
           UserEntity userEntity= userService.findEntityByUserName(userName);
           contactEntity.setUserEntity(userEntity);
           userEntity.getContactEntities().add(contactEntity);
           userService.saveUser(userEntity);
        return contactEntity;
    }
    @Override
    public ContactEntity updateContact(ContactEntity contactEntity) {
        return contactRepository.save(contactEntity);
    }

    @Override
    public void deleteContactById(String contactId) {
        contactRepository.deleteById(contactId);
    }

    @Override
    public List<ContactEntity> findContactsByUserName(String userName) {
        return contactRepository.findAllByUserName(userName);
    }

    ContactEntity mapToContactDto(PostContactDto contactDto,String userName) {
        ContactEntity contactEntity = new ContactEntity();
        contactEntity.setContactId(UUID.randomUUID().toString());
        contactEntity.setPhoneNumber(contactDto.getPhoneNumber());
        contactEntity.setUserName(userName);
        return  contactEntity;
    }

    @Override
    public List<ContactEntity> findAllContact() {
        return contactRepository.findAll();
    }
}
