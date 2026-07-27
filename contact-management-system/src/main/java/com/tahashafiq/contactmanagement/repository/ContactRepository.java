package com.tahashafiq.contactmanagement.repository;

import com.tahashafiq.contactmanagement.entity.ContactEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository <ContactEntity,String>{
}
