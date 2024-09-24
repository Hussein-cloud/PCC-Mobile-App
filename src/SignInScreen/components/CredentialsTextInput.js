import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Button, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../../Backend/DatabaseConnection/DatabaseLoginAuthenticator';
import styles from '../style/styles'
export default function CredentialsTextInput({ rememberMe, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      if (rememberMe) {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
          const storedPassword = await AsyncStorage.getItem('password');
          if (storedEmail) setEmail(storedEmail);
          if (storedPassword) setPassword(storedPassword);
        } catch (e) {
          console.error('Failed to load credentials', e);
        }
      }
    };
    loadCredentials();
  }, [rememberMe]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    if (rememberMe) {
      AsyncStorage.setItem('email', email);
    }
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    if (rememberMe) {
      AsyncStorage.setItem('password', pwd);
    }
  };
  const invokeLogIn = () => {
    login(email, password, setLoading, setError, navigation); // Pass the necessary arguments
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.emailInput}
        placeholder="Enter Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
        />
        <MaterialCommunityIcons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={invokeLogIn} disabled={loading}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}


