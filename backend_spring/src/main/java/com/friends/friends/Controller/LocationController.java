package com.friends.friends.Controller;

import com.friends.friends.Entity.Location.OUT_DTO.LocationOUT_DTO;
import com.friends.friends.Entity.Location.Location;
import com.friends.friends.Repository.LocationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/location")
public class LocationController {

    private final LocationRepository locationRepository;

    public LocationController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @GetMapping()
    public ResponseEntity<List<LocationOUT_DTO>> getAllLocations() {
        List<LocationOUT_DTO> locations = locationRepository.findAll().stream()
                .map(LocationOUT_DTO::fromEntity)
                .collect(Collectors.toList());
        if (locations.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/radius")
    public List<Location> getLocationsNearby(@RequestParam double latitude, @RequestParam double longitude, @RequestParam double radius) {
        return locationRepository.findLocationsWithinDistance(latitude, longitude, radius);
    }
}
