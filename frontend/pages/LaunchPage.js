import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


const LaunchPage = () => {
  console.log("launch page");
  const navigation = useNavigation();
  const handleSignIn = () => {
    navigation.navigate("SignIn")
    console.log("signin"); 

  }
  const handleSignUp = () => {
    navigation.navigate("SignUp")
    console.log("signup"); 

  }
  return (
    <LinearGradient colors={['#0D47A1', 'black']} style={styles.container}>
        <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>
        <TouchableOpacity style={[styles.buttonContainer, styles.signInButton]} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.signUpButton]} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        

        
      </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: '#311B92',
  },
  signUpButton: {
    backgroundColor: '#01579B',
  },
  googleButton: {
    backgroundColor: '#D32F2F',
  },
  googleButtonText: {
    letterSpacing: 1,
  },
});

export default LaunchPage;
