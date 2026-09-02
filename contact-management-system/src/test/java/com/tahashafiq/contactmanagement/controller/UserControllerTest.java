package com.tahashafiq.contactmanagement.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tahashafiq.contactmanagement.dto.SignUpDto;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.impl.JwtServiceImplementation;
import com.tahashafiq.contactmanagement.impl.UserServiceImpl;
import com.tahashafiq.contactmanagement.utils.JwtUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
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
class UserControllerTest {

    @MockitoBean
    private UserServiceImpl userService;

    @MockitoBean
    private JwtServiceImplementation jwtServiceImplementation;

    @MockitoBean
    private JwtUtils jwtUtils;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;


    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }


    @Test
    void changeUserTest() throws Exception {

        // ---------------------------------------------------------
        // ARRANGE
        // ---------------------------------------------------------

        UserControlllerDtoProvider provider =
                new UserControlllerDtoProvider();

        UserEntity userEntity =
                provider.userEntityProvider();

        SignUpDto signUpDto =
                provider.updateUserDtoProvider();


        /*
         * Username of the currently logged-in user.
         */
        String userName = userEntity.getUserName();


        /*
         * Create a fake authenticated user.
         */
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        userName,
                        null,
                        Collections.emptyList()
                );


        /*
         * Explicitly create the SecurityContext.
         */
        SecurityContext securityContext =
                SecurityContextHolder.createEmptyContext();

        securityContext.setAuthentication(authentication);

        SecurityContextHolder.setContext(securityContext);


        /*
         * Mock finding the logged-in user.
         */
        when(userService.findEntityByUserName(userName))
                .thenReturn(userEntity);


        /*
         * Mock updating the user.
         */
        when(userService.updateUser(
                any(UserEntity.class),
                any(SignUpDto.class)
        )).thenReturn(userEntity);


        // ---------------------------------------------------------
        // ACT
        // ---------------------------------------------------------

        mockMvc.perform(
                        put("/users/changeUser")
                                .contentType("application/json")
                                .content(
                                        objectMapper.writeValueAsString(
                                                signUpDto
                                        )
                                )
                )


                // -------------------------------------------------
                // ASSERT
                // -------------------------------------------------

                .andExpect(status().isOk())

                .andExpect(
                        jsonPath("$.userName")
                                .value(userEntity.getUserName())
                );


        // ---------------------------------------------------------
        // VERIFY
        // ---------------------------------------------------------

        /*
         * Controller should get the logged-in user's username
         * and use it to find the user.
         */
        verify(userService)
                .findEntityByUserName(userName);


        /*
         * Controller should update that user.
         */
        verify(userService)
                .updateUser(
                        any(UserEntity.class),
                        any(SignUpDto.class)
                );
    }
}
