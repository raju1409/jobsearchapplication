import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "@env";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [isEmailValidated, setIsEmailValidated] = useState(false);

  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text));
  };

  const handleSendOtp = async () => {
    if (!isValidEmail || email.trim() === "") {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.log("Error:", responseData.error);
        alert("Failed to send OTP. Please try again.");
        return;
      }

      setOtpSent(true);
      setOtp(responseData.otp); // Set OTP received from the server
      alert("OTP has been sent to your email!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    if (userOtp.trim() === "") {
      alert("Please enter the OTP sent to your email.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: userOtp }),
      });

      if (response.ok) {
        alert("OTP verified successfully!");
        setIsEmailValidated(true);
      } else {
        const responseData = await response.json();
        console.log("Error:", responseData.error);
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSignUp = async () => {
    if (!isValidEmail || !firstName || !lastName || !password || !isEmailValidated) {
      alert("Please fill in all fields correctly and validate your email.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigation.navigate("Home");
      } else {
        const responseData = await response.json();
        console.log("Error:", responseData.error);
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleOtpChange = (text) => {
    setUserOtp(text);
    setIsEmailValidated(text === otp); // Validate OTP
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={{ flex: 1, paddingRight: 90, height: 50, fontSize: 15 }}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          autoCapitalize="none"
        />
        {email.length > 0 && (
          <MaterialIcons
            name={isValidEmail ? "check-circle" : "cancel"}
            size={24}
            color={isValidEmail ? "green" : "red"}
            style={{ marginLeft: 9 }}
          />
        )}
        {!otpSent ? (
          <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp}>
            <Text style={styles.otpButtonText}>Send OTP</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ marginLeft: 10 }}>
            <MaterialIcons name="check-circle" size={38} color="green" />
          </View>
        )}
      </View>

      {otpSent && (
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, paddingRight: 40, height: 50, fontSize: 15 }}
            placeholder="Enter OTP"
            value={userOtp}
            onChangeText={handleOtpChange}
            keyboardType="numeric"
          />
          {userOtp && otp && (
            <View style={{ marginLeft: 9 }}>
              {isEmailValidated ? (
                <MaterialIcons name="check-circle" size={24} color="green" />
              ) : (
                <MaterialIcons name="cancel" size={24} color="red" />
              )}
            </View>
          )}
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={isEmailValidated ? handleSignUp : () => alert("Please verify your email first")}
      >
        <Text style={styles.buttonText}>{isEmailValidated ? "Register" : "Verify Email"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E2DFD2",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
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
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 15,
  },
  otpButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "blue",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
  },
  otpButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "blue",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUp;
