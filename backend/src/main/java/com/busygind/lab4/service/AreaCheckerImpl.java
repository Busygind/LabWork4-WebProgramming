package com.busygind.lab4.service;

import com.busygind.lab4.entities.Hit;
import org.springframework.stereotype.Service;

@Service
public class AreaCheckerImpl implements AreaChecker {

    @Override
    public boolean hitInArea(Hit hit) {
        return checkArea(hit.getX(), hit.getY(), hit.getR());
    }

    private boolean checkArea(Double x, Double y, Double r) {
        return inRectangle(x, y, r) || inTriangle(x, y, r) || inSector(x, y, r);
    }

    private boolean inRectangle(Double x, Double y, Double r) {
        return (x >= -r / 2 && x <= 0 && y <= r && y >= 0);
    }

    private boolean inTriangle(Double x, Double y, Double r) {
        return (y >= x - r) && (y <= 0) && (x >= 0);
    }

    private boolean inSector(Double x, Double y, Double r) {
        return (x <= 0) && (y <= 0) && (x * x + y * y <= r * r);
    }
}
