package com.busygind.lab4.converters;

import com.busygind.lab4.entities.Hit;
import com.busygind.lab4.entities.dtos.HitResponse;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Service;

@Service
public class HitToResponseConverter implements Converter<Hit, HitResponse> {

    @Override
    public HitResponse convert(Hit source) {
        HitResponse hitResponse = new HitResponse();
        hitResponse.setX(source.getX());
        hitResponse.setY(source.getY());
        hitResponse.setR(source.getR());
        hitResponse.setResult(source.isSuccess());
        hitResponse.setTimestamp(source.getTimestamp());
        return hitResponse;
    }
}
