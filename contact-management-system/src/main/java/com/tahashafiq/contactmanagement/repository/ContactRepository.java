package com.tahashafiq.contactmanagement.repository;

import com.tahashafiq.contactmanagement.entity.ContactEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository <ContactEntity,String>{
    List<ContactEntity> findAllByUserName(String userName);

//    List<ContactEntity> findAllByUserName(String userName);
}
