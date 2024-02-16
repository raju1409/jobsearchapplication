// Import necessary modules
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook
import userAuthFields from "../pages/UserAuthFields";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import OtpVerification from "../pages/OtpVerification";

const SignUp = () => {
  console.log("signuppage");
  const {
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    isPhoneNumberValidated,
    setIsPhoneNumberValidated,
  } = userAuthFields();

  const [isValidEmail, setIsValidEmail] = useState(true);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (email.trim() === "" || password.trim() === "" || !isValidEmail) {
      // One or both fields are empty
      console.log("Please enter a valid email and password.");
      alert("Invalid Email")
      return;
    }

    // if isPhoneNumberValidated only Register user
    // TODO Code

    try {
      console.log("entered register try block");
      const response = await fetch(
        "https://probable-waffle-76v5ggpwx7pcxxgv-8080.app.github.dev/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            phonenumber: phoneNumber,
            phonenumber_validated: isPhoneNumberValidated,
          }),
        }
      );
      console.log("after fetching");

      if (!response.ok) {
        // If the server responded with an error status, handle it here
        const responseData = await response.json();
        console.log("Error:", responseData.error); // Assuming the server returns an "error" property
        console.log("Error", "Sign-in failed. Please try again.");
        return;
      }

      // If the request was successful, handle the response here
      const responseData = await response.json();
      console.log("Response:", responseData);
      console.log("token:", responseData.token);

      // Navigating to Home Page after successfull login
      navigation.navigate("Home");
      // Assuming the response contains a token property
      // You can handle the token here as needed

      // Clear the form after successful registration
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // If an error occurs, handle it here
      console.log("Error:", error);
      console.log("Error", "Sign-in failed. Please try again.");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  // Function to handle email input change
  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text)); // Update email validity state
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <View style={styles.inputContainer}>

      <TextInput
        style={{ flex: 1, paddingRight: 40, height: 50, fontSize: Platform.OS === "ios" ? 24 : 15 }}
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
        style={{marginLeft:9}}
        />
        )}

        </View>


      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <OtpVerification />

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SignUp</Text>
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
    fontSize:  Platform.OS === "ios" ? 24 : 15,
    fontWeight: "bold",
    marginBottom: 20,
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

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 50,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: Platform.OS === "ios" ? 24 : 15
  },
  invalidInput: {
    borderColor: "red",
  },
  icon: {
    marginLeft: 5,
  },
});

export default SignUp;
