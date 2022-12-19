package com.busygind.lab4.converters;

import com.busygind.lab4.entities.Hit;
import com.busygind.lab4.entities.dtos.HitRequest;
import com.busygind.lab4.service.AreaCheckerImpl;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;

@Component
public class RequestToHitConverter implements Converter<HitRequest, Hit> {

    private final AreaCheckerImpl areaChecker;

    public RequestToHitConverter(AreaCheckerImpl areaChecker) {
        this.areaChecker = areaChecker;
    }

    @Override
    public Hit convert(HitRequest source) {
        System.out.println(source);
        if (source.getTimezoneOffset() == null) {
            return null;
        }
        Hit hit = new Hit();
        hit.setX(source.getX());
        hit.setY(source.getY());
        hit.setR(source.getR());
        hit.setSuccess(areaChecker.hitInArea(hit));
        hit.setTimestamp(Instant.now().minusSeconds(source.getTimezoneOffset() * 60L));
        return hit;
    }
}
