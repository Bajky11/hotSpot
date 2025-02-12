package com.friends.friends.Controller;

import com.friends.friends.Config.JwtTokenUtil;
import com.friends.friends.Entity.User;
import com.friends.friends.Repository.UserRepository;
import com.friends.friends.dto.LoginDTO;
import com.friends.friends.dto.RegistrationDTO;
import com.friends.friends.dto.UserResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "API pro autentizaci uživatelů")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthController(JwtTokenUtil jwtTokenUtil, UserRepository userRepository) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
    }

    @Operation(summary = "Registrace uživatele",
            description = "Registruje nového uživatele do systému.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Uživatel úspěšně zaregistrován"),
            @ApiResponse(responseCode = "400", description = "Uživatelské jméno je již obsazeno")
    })
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationDTO registrationDTO) {

        if (userRepository.findByUsername(registrationDTO.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already taken");
        }

        User newUser = new User(registrationDTO);
        userRepository.save(newUser);

        return ResponseEntity.ok(new UserResponseDTO(newUser, jwtTokenUtil.generateToken(newUser.getId())));
    }

    @Operation(summary = "Přihlášení uživatele",
            description = "Ověřuje přihlašovací údaje uživatele.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Přihlášení bylo úspěšné"),
            @ApiResponse(responseCode = "401", description = "Neplatné přihlašovací údaje")
    })
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {

        Optional<User> foundUser = userRepository.findByUsername(loginDTO.getUsername());

        if (foundUser.isPresent() && foundUser.get().getPassword().equals(loginDTO.getPassword())) {
            User user = foundUser.get();
            return ResponseEntity.ok(new UserResponseDTO(user, jwtTokenUtil.generateToken(user.getId())));
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
