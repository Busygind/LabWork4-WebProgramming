package com.busygind.lab4.controllers;

import com.busygind.lab4.entities.UserDetails;
import com.busygind.lab4.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RegisterController {

    private final RegisterService registerService;

    @Autowired
    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDetails userDetails) {
        System.out.println("Trying to register from user: " + userDetails.getUsername());
        boolean result = registerService.registerNewUser(userDetails);

        if (result) {
            System.out.println("Success register");
            return ResponseEntity.ok().build();
        }
        System.out.println("Error during register, user is already exist");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
