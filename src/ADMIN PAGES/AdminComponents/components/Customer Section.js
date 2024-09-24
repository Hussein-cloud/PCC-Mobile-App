import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../componentStyle/styles';

const CustomersCRUD = ({ navigation }) => {
  // Function to navigate to Create Customer screen
  const navigateCreate = () => {
    navigation.navigate('CreateCustomer');
  };

  // Function to navigate to Update Customer screen with parameters
  const navigateUpdate = () => {
    navigation.navigate('UpdateInfo', {
      table: 'CustomerTable',
      userType: 'customer',
      title: 'Update Customer Information',
    });
  };

  // Function to navigate to Delete Customer screen with parameters
  const navigateDelete = () => {
    navigation.navigate('DeleteInfo', {
      table: 'CustomerTable',
      userType: 'customer',
      title: 'Delete Customer Entity',
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Customers Section</Text>

      <TouchableOpacity style={[styles.item, styles.shadowBox]} onPress={navigateCreate}>
        <Ionicons name="person-add-outline" size={24} color="#000" />
        <Text style={styles.itemText}>Create New Customer Contact</Text>
        <FontAwesome name="angle-right" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.item, styles.shadowBox]} onPress={navigateUpdate}>
        <Ionicons name="create-outline" size={24} color="#000" />
        <Text style={styles.itemText}>Update Customer Contact</Text>
        <FontAwesome name="angle-right" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.item, styles.shadowBox]} onPress={navigateDelete}>
        <Ionicons name="trash-bin-outline" size={24} color="#000" />
        <Text style={styles.itemText}>Delete Customer Contact</Text>
        <FontAwesome name="angle-right" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomersCRUD;
