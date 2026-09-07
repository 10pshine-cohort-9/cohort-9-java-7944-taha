package com.tahashafiq.contactmanagement.filter;
import com.tahashafiq.contactmanagement.impl.JwtServiceImplementation;
import com.tahashafiq.contactmanagement.utils.JwtUtils;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtils  jwtUtils;
    final JwtServiceImplementation jwtServiceImplementation;
    JwtFilter(JwtUtils jwtUtils, JwtServiceImplementation jwtServiceImplementation) {
        this.jwtUtils = jwtUtils;
        this.jwtServiceImplementation = jwtServiceImplementation;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain chain) throws ServletException,IOException {
        String authorization = request.getHeader("Authorization");
        String userName;
        String jwt;
        if(authorization != null && authorization.startsWith("Bearer ")) {
           jwt = authorization.substring(7);
           userName=jwtUtils.extractUserName(jwt);

               if (jwtUtils.validateToken(jwt) && userName!=null) {
                       UserDetails userDetails = jwtServiceImplementation.loadUserByUsername(userName);
                       log.info("USERNAME: " + userDetails.getUsername());
                       log.info("AUTHORITIES: " + userDetails.getAuthorities());
                   UsernamePasswordAuthenticationToken auth =
                           new UsernamePasswordAuthenticationToken(userDetails,
                                   null,
                                   userDetails.getAuthorities());
                   auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                   SecurityContextHolder
                           .getContext()
                           .setAuthentication(auth);
           }

        }
        chain.doFilter(request,response);
    }
}
