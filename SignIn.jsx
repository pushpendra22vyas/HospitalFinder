import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Initialize GoogleSignin
GoogleSignin.configure({
  // Add your configuration here
});

// Function to handle Google Sign-In
const signInWithGoogle = async () => {
  try {
    const userInfo = await GoogleSignin.signIn();

    // Convert userInfo object to a JSON string

    // console.log(userInfo.user.email);
    return userInfo;
    // User signed in successfully, do something with userInfo
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // User cancelled the sign-in process
      console.warn('Sign-in process cancelled');
      return false;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // Sign-in process is already in progress
      console.log('Sign-in process already in progress');
      return true;
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Play services not available or outdated
      console.log('Play services not available or outdated');
      return false;
    } else {
      // Some other error occurred
      console.error('Error occurred:', error);
      return false;
    }
  }
};
export default signInWithGoogle;
