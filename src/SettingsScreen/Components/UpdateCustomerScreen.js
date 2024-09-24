import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UpdateCustomerScreen = () => {
  return (
    <View style={styles.section}>

    <Text style={styles.sectionTitle}>Update Customer Options</Text>

    <TouchableOpacity style={[styles.item, styles.shadowBox]}>
      <Text style={styles.itemText}>Change Address</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.item, styles.shadowBox]}>
      <Text style={styles.itemText}>Change Phone Number</Text>
    </TouchableOpacity>

  </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  itemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#000',
  },
  shadowBox: {
    shadowColor: '#000', // black shadow
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android only
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    margin: 6,
  },
});

export default UpdateCustomerScreen;