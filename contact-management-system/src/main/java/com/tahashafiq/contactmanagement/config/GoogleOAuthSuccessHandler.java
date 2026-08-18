package com.tahashafiq.contactmanagement.config;

import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.impl.UserServiceImpl;
import com.tahashafiq.contactmanagement.utils.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizationSuccessHandler;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
@Configuration
public class GoogleOAuthSuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserServiceImpl  userService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {
        OAuth2User principal = (OAuth2User) authentication.getPrincipal();
        String firstName = principal.getAttribute("given_name").toString();
        String lastName = principal.getAttribute("family_name").toString();
        String email = principal.getAttribute("email").toString();
        String providerId = principal.getAttribute("sub").toString();
        System.out.println("name of the logged in person is : "+firstName);
        System.out.println("name of the logged in person is : "+lastName);
        System.out.println("email of the logged in person is "+email);
        System.out.println("Id of the logged In person is "+providerId);
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
