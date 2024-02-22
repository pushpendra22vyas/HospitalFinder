import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, PermissionsAndroid, Platform, Linking, ScrollView, useWindowDimensions } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const HospitalLocator = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestHospitals, setNearestHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          fetchUserLocation();
        } else {
          setError('Location permission denied.');
        }
      } else {
        const status = await Geolocation.getAuthorizationStatus();
        if (status === 'authorized') {
          fetchUserLocation();
        } else {
          setError('Location permission denied.');
        }
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setError('Error requesting location permission.');
    }
  };

  const fetchUserLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        console.log("Location is fetched")
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchNearestHospitals(latitude, longitude);
      },
      error => {
        // console.log(error)
        setError('Error : Please Turn On Your GPS Location Sign In Again ');
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 }
    );
  };

  const fetchNearestHospitals = async (latitude, longitude) => {
    try {
      // Dummy hospital data
      const dummyHospitals = [
        { name: 'Hospital A', distance: '2.5 km', bedsAvailable: 20 },
        { name: 'Hospital B', distance: '3.2 km', bedsAvailable: 15 },
        { name: 'Hospital D', distance: '1.8 km', bedsAvailable: 25 },
        { name: 'Hospital E', distance: '2.5 km', bedsAvailable: 20 },
        { name: 'Hospital F', distance: '3.2 km', bedsAvailable: 15 },
        { name: 'Hospital G', distance: '1.8 km', bedsAvailable: 25 },
        { name: 'Hospital H', distance: '2.5 km', bedsAvailable: 20 },
        { name: 'Hospital I', distance: '3.2 km', bedsAvailable: 15 },
        { name: 'Hospital J', distance: '1.8 km', bedsAvailable: 25 },
        { name: 'Hospital K', distance: '2.5 km', bedsAvailable: 20 },
        { name: 'Hospital L', distance: '3.2 km', bedsAvailable: 15 },
        { name: 'Hospital M', distance: '1.8 km', bedsAvailable: 25 },
        { name: 'Hospital N', distance: '2.5 km', bedsAvailable: 20 },
        { name: 'Hospital O', distance: '3.2 km', bedsAvailable: 15 },
        { name: 'Hospital P', distance: '1.8 km', bedsAvailable: 25 },
        { name: 'Hospital Q', distance: '2.5 km', bedsAvailable: 20 },
        { name: 'Hospital R', distance: '3.2 km', bedsAvailable: 15 },
        { name: 'Hospital S', distance: '1.8 km', bedsAvailable: 25 },
      ];
      setNearestHospitals(dummyHospitals);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching nearest hospitals:', error);
      setError('Error fetching nearest hospitals. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Of Nearest Hospitals</Text>
      {loading ? (
        <Text tyle={[styles.loadingText, { fontSize: 20 }]}>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          {/* {userLocation && (
            <Text style={styles.locationText}>
              Your Location: Latitude {userLocation.latitude}, Longitude {userLocation.longitude}
            </Text>
          )} */}
          {/* <Button title="Refresh Hospitals" onPress={() => fetchNearestHospitals(userLocation.latitude, userLocation.longitude)} /> */}
          <ScrollView style={styles.hospitalsContainer}>
            {nearestHospitals.map((hospital, index) => (
              <View key={index} style={[styles.hospitalCard, { width: windowWidth - 40 }]}>
                <Text style={[styles.hospitalName, { fontSize: windowWidth * 0.04 }]}>{hospital.name}</Text>
                <Text style={styles.hospitalInfo}>Distance: {hospital.distance}</Text>
                <Text style={styles.hospitalInfo}>Beds Available: {hospital.bedsAvailable}</Text>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  locationText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    color: 'black',
  },
  hospitalsContainer: {
    flex: 1,
    marginTop: 20,
  },
  hospitalCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'lightblue',
    backgroundImage: 'url(https://example.com/background-image.jpg)',
  },
  hospitalName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  hospitalInfo: {
    marginBottom: 5,
    color: 'black',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default HospitalLocator;
