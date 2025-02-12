package com.friends.friends.Entity;

import com.friends.friends.dto.RegistrationDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    public User(RegistrationDTO registrationDTO) {
        this.username = registrationDTO.getUsername();
        this.email = registrationDTO.getEmail();
        this.password = registrationDTO.getPassword();
    }
}
