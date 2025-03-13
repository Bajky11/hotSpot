package com.friends.friends.Entity.Location.OUT_DTO;

import com.friends.friends.Entity.Location.Location;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationOUT_DTO {
    private Long id;
    private String name;
    private double latitude;
    private double longitude;

    public LocationOUT_DTO(Long id, String name, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public static LocationOUT_DTO fromEntity(Location location) {
        return new LocationOUT_DTO(
                location.getId(),
                location.getName(),
                location.getCoordinates().getY(),  // Y = Latitude
                location.getCoordinates().getX()   // X = Longitude
        );
    }
}
