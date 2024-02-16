import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the back arrow icon
import userAuthFields from "../pages/UserAuthFields";

const SignIn = () => {
  console.log("signinpage")
  const { email, setEmail, password, setPassword } = userAuthFields();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("SignUp");
  };

  const handleSignIn = async () => {
    setEmailError(false); // Clear previous email error
    setPasswordError(false); // Clear previous password error

    if (email.trim() === "") {
      setEmailError(true);
    }

    if (password.trim() === "") {
      setPasswordError(true);
    }

    if (email.trim() === "" || password.trim() === "") {
      return; // Do not proceed further if any of the fields are empty
    }

    try {
      const response = await fetch("https://probable-waffle-76v5ggpwx7pcxxgv-8080.app.github.dev/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.log("Error:", responseData.error);
        console.log("Error", "Sign-in failed. Please try again.");
        return;
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
      console.log("token:", responseData.token);

      if (responseData.token === null) {
        setShowAlert(true);
        return;
      }

      navigation.navigate("Home");
      setEmail(""); // Clear the form after successful login
      setPassword("");
    } catch (error) {
      console.log("Error:", error);
      console.log("Error", "Sign-in failed. Please try again.");
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(false); // Clear the email error when user starts entering text
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(false); // Clear the password error when user starts entering text
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={[styles.input, emailError && styles.errorInput]}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
      />
      {emailError && <Text style={styles.errorText}>Email field cannot be empty</Text>}

      <TextInput
        style={[styles.input, passwordError && styles.errorInput]}
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      {passwordError && <Text style={styles.errorText}>Password field cannot be empty</Text>}

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Conditionally show the alert message */}
      {showAlert && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>User does not exist.</Text>
          <Text style={styles.registerLink} onPress={handleRegister}>
            SignUp
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#979797",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
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
  alertContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  alertText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  registerLink: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 18,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default SignIn;
