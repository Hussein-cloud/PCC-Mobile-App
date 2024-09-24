import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, SafeAreaView, Text } from 'react-native';
import React, { useState } from 'react';


export default function SignInScreen() {

  return (
    <SafeAreaView style={styles.container}>
      

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  logoImage: {
    width: 150,
    height: 108,
    resizeMode: 'stretch',
    marginBottom: 10,
  },
});
