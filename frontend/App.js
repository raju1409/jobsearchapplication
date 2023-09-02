import React, {useState} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SignUp from './pages/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/Home';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchPage from './pages/LaunchPage';
import SignIn from './pages/SignIn';


const Stack = createStackNavigator();


const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerShown: false, // Hide the header for all screens
      }}>
        <Stack.Screen name="LaunchPage" component={LaunchPage}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name='Home' component={Home}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default App;