package com.FirstApp.authentication;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String name;
//    private String lastname;
    private String email;
    private String password;
    private String phonenumber;
    private boolean phonenumber_validated;
//    private Long phoneNumber;


}
