package com.busygind.lab4.service;

import com.busygind.lab4.converters.HitToResponseConverter;
import com.busygind.lab4.converters.RequestToHitConverter;
import com.busygind.lab4.entities.UserEntity;
import com.busygind.lab4.entities.dtos.HitRequest;
import com.busygind.lab4.entities.dtos.HitResponse;
import com.busygind.lab4.repos.HitRepository;
import com.busygind.lab4.entities.Hit;
import com.busygind.lab4.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class HitServiceImpl implements HitService {

    private final HitRepository hitRepository;
    private final UserRepository userRepository;
    private final HitToResponseConverter hitToResponseConverter;
    private final RequestToHitConverter requestToHitConverter;

    @Autowired
    public HitServiceImpl(HitRepository hitRepository, UserRepository userRepository, HitToResponseConverter hitToResponseConverter, RequestToHitConverter requestToHitConverter) {
        this.hitRepository = hitRepository;
        this.userRepository = userRepository;
        this.hitToResponseConverter = hitToResponseConverter;
        this.requestToHitConverter = requestToHitConverter;
    }

    public List<HitResponse> getHitsByUsername(String username) {
        System.out.println("Request to data getting received from user: " + username);
        UserEntity user = userRepository.getByUsername(username);
        List<Hit> hitsFromDB = hitRepository.getAllByUserId(user.getId());
        List<HitResponse> hitsToSend = new ArrayList<>();
        for (Hit hit : hitsFromDB) {
            if (hitToResponseConverter.convert(hit) == null) {
                return null;
            }
            hitsToSend.add(hitToResponseConverter.convert(hit));
        }
        System.out.println(hitsToSend.size());
        System.out.println(hitsToSend.get(0));
        return hitsToSend;
    }

    @Override
    public HitResponse checkAndSaveHit(HitRequest hitRequest, String username) {
        Hit hit = requestToHitConverter.convert(hitRequest);
        UserEntity user = userRepository.getByUsername(username);
        hit.setUserId(user.getId());
        hitRepository.save(hit);
        HitResponse hitResponse = hitToResponseConverter.convert(hit);

        return hitResponse;
    }

    @Transactional
    @Override
    public boolean deleteHitsByUsername(String username) {
        if (!userRepository.existsByUsername(username)) {
            System.out.println("Trying delete hits from not existing user");
            return false;
        }
        UserEntity user = userRepository.getByUsername(username);
        hitRepository.deleteAllByUserId(user.getId());
        System.out.println("Hits from user: " + username + " deleted");
        return true;
    }
}
