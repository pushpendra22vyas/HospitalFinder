import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const DesignTem = ({children}) => {
  const image = {
    uri: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yNV9zaW1wbGVfM2RfaWxsdXN0cmF0aW9uX29mX2FfcmVjb3Zlcnlfcm9vbV93aV80ZjhkNDIwNC02N2I4LTQwMDQtYTBlNy05YjljMjIyMzE2ZGVfMS5qcGc.jpg',
  };

  return (
    <ImageBackground source={image} style={styles.background}>
      <SafeAreaView style={styles.container}>
       {children}
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },

});

export default DesignTem;
