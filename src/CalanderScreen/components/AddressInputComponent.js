import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AddressInputComponent = ({ initialValue, onAddressChange, editable = true }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [address, setAddress] = useState(initialValue);

  useEffect(() => {
    setAddress(initialValue); // Update address when initialValue changes
  }, [initialValue]);

  const handleAddressChange = (text) => {
    setAddress(text);
    if (onAddressChange) {
      onAddressChange(text); // Call the function if it's defined
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="home" size={30} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={handleAddressChange}
        placeholder="Enter Address"
        editable={editable}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
      />
      {showDropdown && (
        <View style={styles.dropdown}>
          {/* Render address suggestions here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#e63938',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    maxHeight: 150,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1,
  },
});

export default AddressInputComponent;
