package com.FirstApp.registration;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;








@Controller
@RequestMapping(path = "api/v1/registration")
public class RegistrationController {


    @GetMapping("/test")
    public String test() {
        return "test endpoint";
    }



}
