import React, { useState } from "react";
import { Image } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import flag from "../assets/flag.png"; // Corrected import statement
import userAuthFields from "../pages/UserAuthFields";
import { MaterialIcons } from "@expo/vector-icons";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const {
    phoneNumber,
    setPhoneNumber,
    isPhoneNumberValidated,
    setIsPhoneNumberValidated,
  } = userAuthFields();

  const handleSendOtp = async () => {
    try {
      console.log("otp : ", otp);
      console.log("userOTP : " , userOtp)
      console.log("entered send otp try block");
      
      const response = await fetch(
        "https://probable-waffle-76v5ggpwx7pcxxgv-8080.app.github.dev/api/v1/auth/sendotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phonenumber: phoneNumber
          }),
        }
        );
        console.log("after fetching sendotp");
        console.log("Phonenumber in otp block " + phoneNumber);

      const responseData = await response.json();
      console.log("sendotp response : " + responseData);
      if (!response.ok) {
        // If the server responded with an error status, handle it here
        console.log("Error:", responseData.error); // Assuming the server returns an "error" property
        console.log("Error", "Sign-in failed. Please try again.");
        return;
      }

      setIsSendingOtp(true);
      setOtp(responseData.otp);

      if (responseData.otp === userOtp) {
        setIsPhoneNumberValidated(true);
      }
      // If the request was successful, handle the response here
      console.log("isPhonenumber_validatd :", isPhoneNumberValidated);
      console.log("otp :", otp);
    } catch (error) {
      // If an error occurs, handle it here
      console.log("Error:", error);
      console.log("Error", "Sign-in failed. Please try again.");
    }
  };

  const handleOtpChange = (text) => {
    setUserOtp(text);
    // Compare userOtp with otp and update the isPhoneNumberValidated state accordingly
    setIsPhoneNumberValidated(text === otp);
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Image
          source={flag} // Assuming flag.png is located in the correct path
          style={{ width: 24, height: 24, marginLeft: 0,marginRight:8, borderRadius:12 }} // Adjust width and height as needed
        />

        <TextInput
          style={{ flex: 1, paddingRight: 40, fontSize:  15 }}
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />
        {!isSendingOtp ? (
          <TouchableOpacity
            onPress={handleSendOtp}
            style={{
              padding: 0,
              marginRight: 0,
            }}
          >
            <Text style={{ color: "black", fontSize:  12 }}>Send OTP</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ marginLeft: 10 }}>
            <MaterialIcons name="check-circle" size={38} color="green" />
          </View>
        )}
      </View>

      {/* {otp && (
            <View>
            <Text>Received OTP: {otp}</Text>
            <Text>User OTP: {userOtp}</Text>
            <Text>Phone Number Validated: {isPhoneNumberValidated ? 'Yes' : 'No'}</Text>
            </View>
        )} */}

      {/* Back Button */}
      {/* ... Other JSX code ... */}

      {/* OTP Input field and check circle or cancel icon */}
      <View style={styles.inputContainer}>
        <TextInput
          style={{ flex: 1, paddingRight: 40, height: 50, fontSize: 15 }}
          placeholder="Enter OTP"
          value={userOtp}
          onChangeText={handleOtpChange} // Use the custom method to handle OTP changes
          autoCapitalize="none"
          keyboardType="numeric"
        />
        {userOtp && otp && (
          <View style={{ marginLeft: 9 }}>
            {isPhoneNumberValidated ? (
              <MaterialIcons name="check-circle" size={24} color="green" />
            ) : (
              <MaterialIcons name="cancel" size={24} color="red" />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 50,
    width: "100%",
  },
});

export default OtpVerification;
