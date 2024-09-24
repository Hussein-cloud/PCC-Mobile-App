import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firestore } from '../../Backend/DatabaseConnection/DataBaseAuth';
import { collection, getDocs } from 'firebase/firestore';

const CustomerNameInputComponent = ({ initialValue, onCustomerNameChange, onAddressChange }) => {
  const [customerName, setCustomerName] = useState(initialValue);
  const [customerList, setCustomerList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setCustomerName(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'CustomerTable'));
      const customers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: `${doc.data().firstName} ${doc.data().lastName}`,
        address: doc.data().address, // Assuming the 'address' field exists in your Firestore document
        phoneNumber: doc.data().phoneNumber, 
      }));
      setCustomerList(customers);
    };

    fetchCustomers();
  }, []);

  const handleSelectCustomer = (customer) => {
    setCustomerName(customer.name);
    onCustomerNameChange(customer.name, customer.id, customer.phoneNumber);
   
    if (onAddressChange) {
      onAddressChange(customer.address); // Update the address when customer is selected
    }
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="account-circle" size={30} style={styles.icon} />
      <TouchableOpacity 
        style={styles.input} 
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text>{customerName || "Select Customer Name"}</Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            data={customerList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectCustomer(item)}>
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

export default CustomerNameInputComponent;
