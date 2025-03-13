package com.friends.friends.Repository;

import com.friends.friends.Entity.Location.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    @Query(value = """
                SELECT *, 
                       ST_Distance(coordinates, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography) AS distance
                FROM location
                WHERE ST_DWithin(
                    coordinates, 
                    ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography, 
                    :radius
                )
                ORDER BY distance ASC
            """, nativeQuery = true)
    List<Location> findLocationsWithinDistance(double latitude, double longitude, double radius);
}
