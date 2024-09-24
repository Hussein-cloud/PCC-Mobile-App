import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const btnText = 'Sign in';

export default function SignInBtn({ navigation }) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{btnText}</Text>
    </TouchableOpacity>
  );

 
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#e63938',
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26,
    color: '#FFFFFF',
  },
});
