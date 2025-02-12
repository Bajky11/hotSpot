package com.friends.friends.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RegistrationDTO {

    @NotBlank(message = "Username nesmí být prázdný")
    private String username;

    @NotBlank(message = "Email nesmí být prázdný")
    @Email(message = "Email musí být platný")
    private String email;

    @NotBlank(message = "Heslo nesmí být prázdné")
    private String password;
}
