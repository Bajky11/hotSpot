package com.friends.friends.dto;

import com.friends.friends.Entity.User;
import lombok.Getter;

@Getter
public class UserResponseDTO {

    private final Long id;

    private final String token;

    private final String username;

    private final String email;

    public UserResponseDTO(User user, String token) {
        this.id = user.getId();
        this.token = token;
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
