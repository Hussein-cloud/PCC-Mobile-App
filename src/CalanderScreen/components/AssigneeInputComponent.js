import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firestore } from '../../Backend/DatabaseConnection/DataBaseAuth';
import { collection, getDocs } from 'firebase/firestore';

const AssigneeInputComponent = ({ initialValue, onAssigneeChange }) => {
  const [assignee, setAssignee] = useState(initialValue);
  const [employeeList, setEmployeeList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setAssignee(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'EmployeeTable'));
      const employees = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: `${doc.data().firstName} ${doc.data().lastName}`,
      }));
      setEmployeeList(employees);
    };

    fetchEmployees();
  }, []);

  const handleSelectEmployee = (employee) => {
    setAssignee(employee.name);
    onAssigneeChange(employee.name, employee.id);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="account" size={30} style={styles.icon} />
      <TouchableOpacity 
        style={styles.input} 
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text>{assignee || "Select Assignee"}</Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            data={employeeList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectEmployee(item)}>
                <Text style={styles.dropdownItem}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
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
    left: 40,
    right: 0,
    maxHeight: 150,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AssigneeInputComponent;
