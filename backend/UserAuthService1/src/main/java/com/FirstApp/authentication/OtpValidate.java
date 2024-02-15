// Install the Java helper library from twilio.com/docs/java/install
package com.FirstApp.authentication;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

import java.util.Random;

public class OtpValidate {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = "ACb347c3cad972b52a0fbdf279bdfd3a5b";
    public static final String AUTH_TOKEN = "be74feba62ce00a67acbb62a8e2e9399";
    private static final String TWILIO_PHONENUMBER = "+447361591720";

    public static String validatePhoneNumber(String phonenumber) {
//        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        String otp = generateOTP();
//        Message message = Message.creator(
//                        new com.twilio.type.PhoneNumber(phonenumber),
//                        new com.twilio.type.PhoneNumber(TWILIO_PHONENUMBER),
//                        "Your OTP is "+otp)
//                .create();
//
//        System.out.println(message.getSid());
        System.out.println("phonenumber : " + phonenumber);
        System.out.println("otp : " + otp);
        return otp;
    }

    private static String generateOTP() {
        // Logic to generate a random 6-digit OTP
        Random random = new Random();
        int otpNumber = 100_000 + random.nextInt(900_000);
        return Integer.toString(otpNumber);
    }
}