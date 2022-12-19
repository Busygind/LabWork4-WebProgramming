package com.busygind.lab4.entities.dtos;

import lombok.Data;

import java.time.Instant;

@Data
public class HitResponse {

    private Double x;
    private Double y;
    private Double r;
    private Instant timestamp;
    private boolean result;
}
