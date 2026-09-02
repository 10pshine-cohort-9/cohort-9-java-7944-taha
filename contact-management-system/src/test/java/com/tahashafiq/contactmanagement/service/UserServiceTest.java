package com.tahashafiq.contactmanagement.service;

import com.tahashafiq.contactmanagement.dto.SignUpDto;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.impl.UserServiceImpl;
import com.tahashafiq.contactmanagement.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ArgumentsSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@Slf4j
class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserServiceImpl userService;
    @Mock
    private PasswordEncoder passwordEncoder;
    @ParameterizedTest
    @ArgumentsSource(UserDetailsProvider.class)
    void createUserTest(SignUpDto dto) {
        when(userRepository.save(any(UserEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
        when(passwordEncoder.encode(anyString()))
                .thenReturn(dto.getPassword());
        UserEntity user = userService.createUser(dto);

        assertEquals(dto.getUserName(), user.getUserName());
        assertEquals(dto.getPassword(), user.getPassword());

        verify(passwordEncoder).encode(dto.getPassword());
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "userIdOne",
            "userIdTwo",
            "userIdThree"
    })
     void findByIdTest(String userId) {
        UserDetailsProvider userDetailsProvider = new UserDetailsProvider();
        UserEntity userEntity = userDetailsProvider.dummyUserEntity();
        when(userRepository.findById(userId))
                .thenReturn(Optional.of(userEntity));
        assertNotNull(userService.findById(userId));
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "tahashafi175",
            "usamashafiq175",
            "muhammadshafiq175"
    })
    void findByUserNameTest(String userName) {
        UserDetailsProvider userDetailsProvider = new UserDetailsProvider();
        UserEntity userEntity = userDetailsProvider.dummyUserEntity();
        when(userRepository.findByUserName(userName)).thenReturn(userEntity);
        assertNotNull(userService.findByUserName(userName));
    }


    @ParameterizedTest
    @ValueSource(strings = {
            "userIdOne",
            "userIdTwo",
            "userIdThree"
    })
    void deleteUserTest(String userId) {
        userService.deleteUser(userId);
        verify(userRepository).deleteById(userId);
        verifyNoMoreInteractions(userRepository);
    }

    @ParameterizedTest
    @MethodSource("com.tahashafiq.contactmanagement.service.UserServiceMethodSource#dummyUpdateUser")
    void updateUserTest(UserEntity originalEntity, SignUpDto updatedEntity) {
        when(passwordEncoder.encode(updatedEntity.getPassword())).thenReturn("encodedPassword");
        userService.updateUser(originalEntity, updatedEntity);

        System.out.println("AFTER PASSWORD = " + originalEntity.getPassword());


        assertEquals("encodedPassword",
                        originalEntity.getPassword());

        assertEquals(
                updatedEntity.getUserName(),
                originalEntity.getUserName()
        );

        verify(userRepository).save(originalEntity);
    }
}
