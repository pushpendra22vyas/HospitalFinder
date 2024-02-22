// App.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Home from './Home';
import Login from './Login';

GoogleSignin.configure({
  // You need to configure your Google Sign-In credentials here
});

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        if (userInfo) {
          setUser(userInfo.user);
        }
      } catch (error) {
        // console.error('Silent sign-in error:', error);
      }
    };

    fetchUser();
  }, []); // Fetch user on component mount

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo.user); // Set the user upon successful sign-in
    } catch (error) {
      // console.error('Google Sign-In Error:', error);
      return false
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen name="Home">
            {props => (
              <ImageBackground
                source={{ uri: 'https://thumbs.dreamstime.com/b/doctor-hospital-corridor-unfocused-background-77263373.jpg' }}
                style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center' }}
              >
                <Home {...props} setUser={setUser} user={user} />
                {/* <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Home</Text> */}
              </ImageBackground>
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {props => (
              <ImageBackground
                source={{ uri: 'https://thumbs.dreamstime.com/b/doctor-hospital-corridor-unfocused-background-77263373.jpg' }}
                style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center' }}
              >
                <Login {...props} setUser={setUser} signIn={signIn} />
                {/* <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Login </Text> */}
              </ImageBackground>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
