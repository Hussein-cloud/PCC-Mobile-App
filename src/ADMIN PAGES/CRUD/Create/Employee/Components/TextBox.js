import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CredentialsTextInput({Placeholder}) {




  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.employeeIDinput}
        placeholder={Placeholder}

      />

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    marginVertical: 8,
    alignItems: 'center',
  },


  employeeIDinput: {
    backgroundColor: '#CCC',
    height: 45,
    width: '100%',
    fontSize: 13,
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    marginVertical: 10,
    paddingLeft: 10,
  
    
  },

});
