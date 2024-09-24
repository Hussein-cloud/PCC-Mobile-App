import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';



export default function SubmitBtn({navigation, type}){


  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText} >{type}</Text>
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

