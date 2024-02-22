// Login.js

import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  // You need to configure your Google Sign-In credentials here
});

const Login = ({ navigation, setUser }) => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo.user); // Passing user information to the parent component
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Login cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Login is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error occurred');
      }
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://thumbs.dreamstime.com/b/doctor-hospital-corridor-unfocused-background-77263373.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={[styles.title,styles.textColorBlack]}>Log in to Continue</Text>
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signIn}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  textColorBlack:{
    color:"black"
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%', // Set width to cover entire screen
    height: '100%', // Set height to cover entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  googleButton: {
    width: 240,
    height: 54,
    marginBottom: 20,
  },
});

export default Login;
