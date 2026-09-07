package com.tahashafiq.contactmanagement.impl;

import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.repository.UserRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtServiceImplementation implements UserDetailsService {
    private final UserRepository userRepository;

    JwtServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        UserEntity byUserName = userRepository.findByUserName(username);

        return org.springframework.security.core.userdetails.User.builder()
                .username(byUserName.getUserName())
                .password(byUserName.getPassword())  // already hashed
                .roles(byUserName.getRoles())
                .build();
    }
}
