import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import SignInBtn from '../components/SignInBtn';
import CredentialsTextInput from '../components/CredentialsTextInput';
import CantSignInText from '../components/CantSignInText';
import RememberMeCheckBox from '../components/RememberMeCheckBox';
import styles from '../style/styles'

export default function SignInScreen({navigation}) {
  const [rememberMe, setRememberMe] = useState(false);
  const btnText = 'Sign in';
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logoImage} source={require('../assets/logo.png')} />
      <CredentialsTextInput rememberMe={rememberMe} navigation={navigation}/>
      
      <StatusBar style="auto" />
      <RememberMeCheckBox onRememberMeChange={setRememberMe} />
      <CantSignInText />
      
    </SafeAreaView>
  );
}
