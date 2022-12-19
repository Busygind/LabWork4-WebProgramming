package com.busygind.lab4.service;

import com.busygind.lab4.entities.Hit;
import com.busygind.lab4.entities.dtos.HitRequest;
import com.busygind.lab4.entities.dtos.HitResponse;


public interface HitService {
    /**
     *
     * @param hitDTO object received from req body
     * @return hit with all completed fields
     */
    HitResponse checkAndSaveHit(HitRequest hitRequest, String username);

    boolean deleteHitsByUsername(String username);
}