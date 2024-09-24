import { useNavigation } from '@react-navigation/native';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { auth } from '../../Backend/DatabaseConnection/DataBaseAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPasswordScreen = ({navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        // Get the user's email from AsyncStorage
        const storedEmail = await AsyncStorage.getItem('email');
        setUserEmail(storedEmail);
      } catch (error) {
        setErrorMessage('Failed to authenticate. Please log in again.');
        navigation.navigate('SignIn');
      }
    };

    authenticateUser();
  }, []);

  const handleResetPassword = async () => {
    setErrorMessage(''); // Clear any previous error messages

    if (newPassword !== confirmPassword) {
      setErrorMessage('New Password and Confirm Password do not match.');
      return;
    }

    try {
      // Reauthenticate the user with the old password
      const credential = EmailAuthProvider.credential(userEmail, oldPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Check if the new password is the same as the old password
      if (newPassword === oldPassword) {
        setErrorMessage('You have already used this password. Please choose a different one.');
        return;
      }

      // Check if the new password is at least 6 characters long
      if (newPassword.length < 6) {
        setErrorMessage('New Password must be at least 6 characters long.');
        return;
      } else if (confirmPassword.length < 6) {
        setErrorMessage('Confirm Password must be at least 6 characters long.');
        return;
      } else {
        // Update the user's password
        await updatePassword(auth.currentUser, newPassword);
        Alert.alert('Success', 'Your password has been reset successfully.');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }

    } catch (error) {
      setErrorMessage('Old password is incorrect.'+'Password: '+oldPassword);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={(text) => setOldPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  form: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#e63946',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e63946',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ResetPasswordScreen;
