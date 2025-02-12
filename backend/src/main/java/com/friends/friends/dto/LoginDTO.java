package com.friends.friends.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class LoginDTO {

    @NotBlank(message = "Username nesmí být prázdný")
    private String username;

    @NotBlank(message = "Heslo nesmí být prázdné")
    private String password;
}
