package com.FirstApp.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {


    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        System.out.println("register triggered");
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/sendotp")
    public ResponseEntity<ResponseOTP> sendotp(
            @RequestBody RequestPhoneNumber request
    ){
        String otp = OtpValidate.validatePhoneNumber(request.getPhonenumber());
        return ResponseEntity.ok(ResponseOTP.builder()
                        .otp(otp)
                .build());
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
    @GetMapping("/test")
    public String testMethod(){
        System.out.println("test endpiont triggered");
        return "Test Endpoint";
    }

}
