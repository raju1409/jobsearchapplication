package com.FirstApp.authentication;

import com.FirstApp.configuration.JwtService;
import com.FirstApp.user.Role;
import com.FirstApp.user.User;
import com.FirstApp.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    private final JwtService service;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) {
        User user = User
                .builder()
                .name(request.getName())
//                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(passwordEncoder.encode(request.getPhonenumber()))
                .phonenumber_validated(request.isPhonenumber_validated())
                .role(Role.USER)
                .build();
        var jwtToken = "";
        System.out.println(user.toString());

        if (user.isPhonenumber_validated()) {
            jwtToken = service.generateToken(user);
            user.setToken(jwtToken);
            repository.save(user);
        }
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userExistsFlag(true)
                .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = repository.findByEmail(request.getEmail())
                .orElse(null); // Return null if user is not found

        if (user == null) {
            // User not found, return null token
            return AuthenticationResponse.builder()
                    .token(null)
                    .userExistsFlag(false)
                    .build();
        }

        System.out.println("user: " + user);
        System.out.println("entered authenticate ");

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        System.out.println("after authenticate ");

        // Assuming user is authenticated and has a token property, use user.getToken()
        var jwtToken = user.getToken();

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userExistsFlag(true)
                .build();
    }

}
