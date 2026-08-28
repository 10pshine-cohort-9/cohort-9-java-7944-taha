package com.tahashafiq.contactmanagement.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tahashafiq.contactmanagement.dto.SignUpDto;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.impl.JwtServiceImplementation;
import com.tahashafiq.contactmanagement.impl.UserServiceImpl;
import com.tahashafiq.contactmanagement.utils.JwtUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@TestPropertySource(properties = {
        "spring.autoconfigure.exclude=" +
                "org.springframework.boot.security.oauth2.client.autoconfigure.servlet.OAuth2ClientWebSecurityAutoConfiguration"
})
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerTest {

    @MockitoBean
    private UserServiceImpl userService;

    @MockitoBean
    private JwtServiceImplementation jwtServiceImplementation;

    @MockitoBean
    private JwtUtils jwtUtils;

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper =
            new ObjectMapper();


    @Test
    void changeUserTest() throws Exception {

        UserControlllerDtoProvider provider =
                new UserControlllerDtoProvider();

        UserEntity userEntity =
                provider.userEntityProvider();

        SignUpDto signUpDto =
                provider.updateUserDtoProvider();


        // Create fake logged-in user
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        userEntity.getUserName(),
                        null,
                        Collections.emptyList()
                );

        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);


        when(userService.findEntityByUserName(
                userEntity.getUserName()))
                .thenReturn(userEntity);


        when(userService.updateUser(
                any(UserEntity.class),
                any(SignUpDto.class)))
                .thenReturn(userEntity);


        mockMvc.perform(
                        put("/users/changeUser")
                                .contentType(
                                        "application/json"
                                )
                                .content(
                                        objectMapper
                                                .writeValueAsString(
                                                        signUpDto
                                                )
                                )
                )
                .andExpect(status().isOk())
                .andExpect(
                        jsonPath("$.userName")
                                .value(
                                        userEntity.getUserName()
                                )
                );


        verify(userService)
                .findEntityByUserName(
                        userEntity.getUserName()
                );


        verify(userService)
                .updateUser(
                        any(UserEntity.class),
                        any(SignUpDto.class)
                );


        // Clean SecurityContext after test
        SecurityContextHolder.clearContext();
    }
}