import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, SafeAreaView, Text } from 'react-native';
import React, { useState } from 'react';
import Search from '../../../../SearchScreen/screens/SearchScreen'


export default function SearchScreen() {

  
    return (
      <Search/>
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
      width: 32,
      height: 32,
    },
  });
  