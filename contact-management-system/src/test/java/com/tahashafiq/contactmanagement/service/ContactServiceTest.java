package com.tahashafiq.contactmanagement.service;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import com.tahashafiq.contactmanagement.dto.PostContactDto;
import com.tahashafiq.contactmanagement.entity.ContactEntity;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.impl.ContactServiceImpl;
import com.tahashafiq.contactmanagement.impl.UserServiceImpl;
import com.tahashafiq.contactmanagement.repository.ContactRepository;
import com.tahashafiq.contactmanagement.repository.UserRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ArgumentsSource;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class ContactServiceTest {

    @Mock
    private ContactRepository contactRepository;

    @Mock
    private UserServiceImpl userService;

    @InjectMocks
    private ContactServiceImpl contactService;

    @Mock
    private UserRepository userRepository;


    @ParameterizedTest
    @ArgumentsSource(ContactDetailsProvider.class)
    void createContactTest(PostContactDto dto) {

        UserEntity user = new UserEntity();
        user.setContactEntities(new ArrayList<>());
        when(userService.findEntityByUserName("tahashafiq"))
                .thenReturn(user);

        ContactEntity result =
                contactService.createContact(dto, "tahashafiq");

        assertNotNull(result);
        assertEquals(dto.getPhoneNumber(), result.getPhoneNumber());

        verify(userService).saveUser(user);
    }

    @ParameterizedTest
    @ValueSource(strings = "123-456")
    void getContactByIdTest(String contactId){
        ContactDetailsProvider provider = new ContactDetailsProvider();
        ContactEntity result = provider.dummyContactEntity();
        when(contactRepository.findById(contactId)).thenReturn(Optional.of(result));
        assertNotNull(contactService.getContactById(contactId));
    }


    @ParameterizedTest
    @ValueSource(strings = "tahashafiq175")
    void getContactByUserNameTest(String userName){
        ContactDetailsProvider contactDetailsProvider = new ContactDetailsProvider();
        ContactEntity contactEntity = contactDetailsProvider.dummyContactEntity();

        UserDetailsProvider provider = new UserDetailsProvider();
        UserEntity userEntity = provider.dummyUserEntity();
        userEntity.setContactEntities(Arrays.asList(contactEntity));

        when(contactRepository.findAllByUserName(userName)).thenReturn(userEntity.getContactEntities());

        assertNotNull(contactService.findContactsByUserName(userName));
    }

//@ParameterizedTest
//@CsvSource({
//        "123-456, TahaShafiq",
//})
//void deleteContactTest(String contactId,String userName){
//        ContactDetailsProvider contactDetailsProvider = new ContactDetailsProvider();
//        ContactEntity contactEntity = contactDetailsProvider.dummyContactEntity();
//        contactEntity.setContactId(contactId);
//
//        UserDetailsProvider provider = new UserDetailsProvider();
//        UserEntity userEntity = provider.dummyUserEntity();
//        userEntity.setContactEntities(new ArrayList<>(Arrays.asList(contactEntity)));
//
//
//        contactService.deleteContactById(contactId,userName);
//        verify(contactRepository).delete(contactEntity);
//    }
    @ParameterizedTest
    @CsvSource({
            "123-456, TahaShafiq"
    })
    void updateContactTest(String contactId,String userName){
        ContactDetailsProvider contactDetailsProvider = new ContactDetailsProvider();
        ContactEntity contactEntity = contactDetailsProvider.dummyContactEntity();
        contactEntity.setContactId(contactId);

        UserDetailsProvider provider = new UserDetailsProvider();
        UserEntity userEntity = provider.dummyUserEntity();
        userEntity.setContactEntities(new ArrayList<>(Arrays.asList(contactEntity)));

        ContactMethodSource contactMethodSource = new ContactMethodSource();
        PostContactDto postContactDto = contactMethodSource.dummyUpdateContact();

        when(contactRepository.save(contactEntity)).thenReturn(contactEntity);
        ContactEntity updatedEntity = contactService.updateContact(postContactDto, contactEntity);

        assertEquals(postContactDto.getPhoneNumber(), updatedEntity.getPhoneNumber());
    }
}
