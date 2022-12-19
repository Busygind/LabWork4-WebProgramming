package com.busygind.lab4.service;

import com.busygind.lab4.repos.UserRepository;
import com.busygind.lab4.entities.UserDetails;
import com.busygind.lab4.entities.UserEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean registerNewUser(UserDetails userDetails) {
        if (userRepository.existsByUsername(userDetails.getUsername())) return false;
        UserEntity newUser = new UserEntity();
        newUser.setUsername(userDetails.getUsername());
        newUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        newUser.setEnabled(true);
        newUser.addAuthority("user");
        userRepository.save(newUser);
        return true;
    }
}
