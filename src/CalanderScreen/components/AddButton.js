import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const AddButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.plusButton} onPress={onPress}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButton: {
    width: 50,
    height: 50, 
    borderRadius: 20,
    backgroundColor: '#e63938',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default AddButton;
