package com.tahashafiq.contactmanagement.repository;

import com.tahashafiq.contactmanagement.entity.ContactEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContactRepository extends JpaRepository <ContactEntity,String>{
    List<ContactEntity> findAllByUserName(String userName);

    Optional<ContactEntity> findByContactIdAndUserName(String contactId, String userName);

//    List<ContactEntity> findAllByUserName(String userName);
}
