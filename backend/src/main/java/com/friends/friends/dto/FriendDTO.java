package com.friends.friends.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class FriendDTO {

    @NotBlank(message = "name nesmí být prázdný")
    private String name;

    @NotBlank(message = "birthday nesmí být prázdný")
    private LocalDate birthday;

    @NotBlank(message = "relationshipPriority nesmí být prázdný")
    private String relationshipPriority;

    private boolean trackLoveScore;
}
