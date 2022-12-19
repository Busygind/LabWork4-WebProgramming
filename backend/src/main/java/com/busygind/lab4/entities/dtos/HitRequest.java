package com.busygind.lab4.entities.dtos;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class HitRequest {

    @NotNull
    @Min(value = -3, message = "Min value for X is -3")
    @Max(value = 5, message = "Max value for X is 3")
    private Double x;
    @NotNull
    @Min(value = -3, message = "Min value for Y is -3")
    @Max(value = 5, message = "Max value for Y is 5")
    private Double y;
    @NotNull
    @Min(value = 0, message = "Min value for R is 0+")
    @Max(value = 5, message = "Max value for R is 3")
    private Double r;
    private Integer timezoneOffset;
}
