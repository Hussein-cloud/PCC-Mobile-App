import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const RemoveModifyButtons = ({ onModify, onRemove }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onModify}>
        <Text style={styles.modifyButtonText}>Update</Text>
      </TouchableOpacity>
      <View style={styles.buttonSpacing} />
      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonSpacing: {
    width: 10,
  },
  modifyButtonText: {
    color: '#e63938',
    fontWeight: 'bold',
    fontSize: 20
  },
  removeButtonText: {
    color: '#ccc',
    fontWeight: 'bold',
    fontSize: 20
  },
});

export default RemoveModifyButtons;
