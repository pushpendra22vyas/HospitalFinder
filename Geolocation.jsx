import Geolocation from '@react-native-community/geolocation';

// Function to fetch user's location
const fetchUserLocation = () => {
  // Request permission to access location
  Geolocation.requestAuthorization();
  
  // Fetch user's current location
  Geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      console.log('User location:', latitude, longitude);
      // Do something with user's location, such as fetching nearby hospitals
    },
    error => {
      console.error('Error fetching location:', error);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};
