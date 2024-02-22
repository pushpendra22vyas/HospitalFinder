import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import HospitalLocator from './HospitalLocator';

const Home = ({ user, navigation, setUser }) => {
  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        // Attempt silent sign-in
        const userInfo = await GoogleSignin.signInSilently();
        if (!userInfo) {
          // If silent sign-in fails, navigate to login screen
          navigation.navigate('Login');
        }
      } catch (error) {
        // Handle silent sign-in error
        if (error.code === 'SIGN_IN_REQUIRED') {
          console.log('User needs to sign in');
          navigation.navigate('Login');
        } else {
        //   console.error('Silent sign-in error:', error);
        }
      }
    };

    checkSignInStatus();
  }, [navigation]);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
      navigation.navigate('Login');
    } catch (error) {
      // console.error('Sign out error:', error);
      return false
    }
  };

  return (
    <ImageBackground
    source={{ uri: 'https://thumbs.dreamstime.com/b/doctor-hospital-corridor-unfocused-background-77263373.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={[styles.title,styles.textColorBlack]}>Welcome {user.name}</Text>
        <Text style={[styles.email,styles.textColorBlack]}>Email: {user.email}</Text>
        <Button title="Sign Out" onPress={signOut} />
      </View>
      <View style={styles.container}>
        <HospitalLocator />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
});

export default Home;
