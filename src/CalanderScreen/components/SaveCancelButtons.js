import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SaveCancelButtons = ({ onSave, onCancel, saveButtonEnabled }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={saveButtonEnabled ? onSave : null}
        disabled={!saveButtonEnabled} // Disable the button when not enabled
      >
        <Text style={[styles.saveButtonText, !saveButtonEnabled && styles.disabledText]}>
          Save
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonSpacing} />
      <TouchableOpacity 
        style={styles.button} 
        onPress={onCancel}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
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
  saveButtonText: {
    color: '#e63938', // Default color for Save button
    fontWeight: 'bold',
    fontSize: 20,
  },
  disabledText: {
    color: '#ccc', // Grey color for disabled text
  },
  cancelButtonText: {
    color: '#ccc',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default SaveCancelButtons;
