// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const LoginScreen = ({cuser,setCUser}) => {
  
//   const handleSignIn = async () => {
//     try {
//       const userInfo = await signInWithGoogle();
//       setCUser(userInfo);
//       // console.log(userInfo.user)
//       setIsSignIn(true);
//     } catch (error) {
//       console.log('Error signing in:', error);
//     }
//   };
//   return (
//     <>
//       <Text style={styles.headerText}>User </Text>
//       <Image style={styles.userPhoto} source={{uri: user.photo}} />
//       <View>
//         <Text style={styles.headerText}>User Email: {user.email}</Text>
//         <Text style={styles.headerText}>User Name: {user.name}</Text>
//       </View>
//       <TouchableOpacity onPress={handleSignIn} style={styles.loginButton}>
//         <Text style={styles.buttonText}>Log Out</Text>
//       </TouchableOpacity>
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   userPhoto:{
//     width:100,
//     height:100,
//     backgroundColor:"yellow",
//     margin:10
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#fff',
//   },
// });


// export default LoginScreen;
