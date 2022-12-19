package com.busygind.lab4.controllers;

import com.busygind.lab4.entities.dtos.HitRequest;
import com.busygind.lab4.entities.dtos.HitResponse;
import com.busygind.lab4.exception_handlers.ExceptionsHandler;
import com.busygind.lab4.service.HitServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hits")
public class HitController extends ExceptionsHandler {

    private final HitServiceImpl service;

    @Autowired
    public HitController(HitServiceImpl service) {
        this.service = service;
    }

    @GetMapping("")
    public List<HitResponse> getHitsByUser(Authentication authentication) {
        return service.getHitsByUsername(authentication.getName());
    }

    @PostMapping("")
    public HitResponse addNewHit(@RequestBody HitRequest hitRequest, Authentication authentication) {
        return service.checkAndSaveHit(hitRequest, authentication.getName());
    }

    @DeleteMapping("")
    public boolean deleteHitsByUsername(Authentication authentication) {
        return service.deleteHitsByUsername(authentication.getName());
    }
}
