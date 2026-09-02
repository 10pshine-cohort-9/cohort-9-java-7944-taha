package com.tahashafiq.contactmanagement.config;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.impl.UserServiceImpl;
import com.tahashafiq.contactmanagement.utils.JwtUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Objects;
@Slf4j
@Configuration
public class GoogleOAuthSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtUtils jwtUtils;
    private final UserServiceImpl  userService;
    public GoogleOAuthSuccessHandler(JwtUtils jwtUtils, UserServiceImpl userService) {
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }
    @Override
    public void onAuthenticationSuccess(@NonNull HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {
        OAuth2User principal = (OAuth2User) authentication.getPrincipal();
        assert principal!=null : "principal is null";
        String firstName = Objects.requireNonNull(principal.getAttribute("given_name")).toString();
        String lastName = Objects.requireNonNull(principal.getAttribute("family_name")).toString();
        String email = Objects.requireNonNull(principal.getAttribute("email")).toString();
        String providerId = Objects.requireNonNull(principal.getAttribute("sub")).toString();
        log.info("the firstName of the person with signin with google is : "+firstName);
        log.info("the lastName of the person with signin with google is : "+lastName);
        log.info("the emailName of the person with signin with google is : "+email);
        log.info("the Provider of the person with signin with google is : "+providerId);
        UserEntity userEntity = userService.manageGoogleUser(firstName, lastName, email, providerId);
        String token = jwtUtils.generateToken(userEntity.getUserName(), userEntity.getRoles());
        response.setContentType("application/json");
        response.getWriter().write(
                """
                {"message": "Google login successful",
                    "email": "%s",
                    "token": "%s"}
                """.formatted(email, token)
        );
    }
}
