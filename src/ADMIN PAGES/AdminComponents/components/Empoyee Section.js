import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../componentStyle/styles';

const Employee = ({ navigation }) => {
  // Function to navigate to Create Employee screen
  const navigateCreate = () => {
    navigation.navigate('CreateEmployee');
  };

  // Function to navigate to Update Employee screen with parameters
  const navigateUpdate = () => {
    navigation.navigate('UpdateInfo', {
      table: 'EmployeeTable',
      userType: 'employee',
      title: 'Update employee Information',
    });
  };

  // Function to navigate to Delete Employee screen with parameters
  const navigateDelete = () => {
    navigation.navigate('DeleteInfo', {
      table: 'EmployeeTable',
      userType: 'employee',
      title: 'Delete employee Entity',
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Employees Section</Text>

      <TouchableOpacity style={[styles.item, styles.shadowBox]} onPress={navigateCreate}>
        <Ionicons name="person-add" size={24} color="#000" />
        <Text style={styles.itemText}>Create Employee Profile</Text>
        <FontAwesome name="angle-right" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.item, styles.shadowBox]} onPress={navigateUpdate}>
        <Ionicons name="create" size={24} color="#000" />
        <Text style={styles.itemText}>Update Employee Profile</Text>
        <FontAwesome name="angle-right" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.item, styles.shadowBox]} onPress={navigateDelete}>
        <Ionicons name="trash-bin" size={24} color="#000" />
        <Text style={styles.itemText}>Delete Employee Profile</Text>
        <FontAwesome name="angle-right" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default Employee;
