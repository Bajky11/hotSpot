package com.friends.friends.Entity.Location.DtoOut;

import com.friends.friends.Entity.Location.Location;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationDtoOut {
    private Long id;
    private String name;
    private double latitude;
    private double longitude;

    public LocationDtoOut(Long id, String name, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public static LocationDtoOut fromEntity(Location location) {
        return new LocationDtoOut(
                location.getId(),
                location.getName(),
                location.getCoordinates().getY(),  // Y = Latitude
                location.getCoordinates().getX()   // X = Longitude
        );
    }
}
