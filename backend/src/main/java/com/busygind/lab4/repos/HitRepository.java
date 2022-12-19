package com.busygind.lab4.repos;

import com.busygind.lab4.entities.Hit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HitRepository extends JpaRepository<Hit, Integer> {
    void deleteAllByUserId(Integer userId);
    List<Hit> getAllByUserId(Integer userId);
}
