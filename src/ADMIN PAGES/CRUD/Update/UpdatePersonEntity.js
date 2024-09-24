import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert, SafeAreaView } from 'react-native';
import { firestore } from '../../../Backend/DatabaseConnection/DataBaseAuth'; 
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import styles from '../Style/style';
const UpdateEntity = ({ route, navigation }) => {
  const { table, userType, title } = route.params; 
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({ address: '', phoneNumber: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = await getDocs(collection(firestore, table));
        const fetchedUsers = userCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers); 
      } catch (error) {
        Alert.alert("Error", "Failed to fetch users.");
      }
    };
    fetchUsers();
  }, [table]);

  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({
        headerTitle: title,
        headerTitleAlign: 'center', 
      });
    }
  }, [navigation, title]);

  const handleExpand = (userId) => {
    setExpandedUserId(userId === expandedUserId ? null : userId);
    setUpdatedFields({ address: '', phoneNumber: '' });
  };

  const handleUpdate = async (userId) => {
    const updates = {};
    if (updatedFields.address.trim()) {
      updates.address = updatedFields.address;
    }
    if (updatedFields.phoneNumber.trim()) {
      updates.phoneNumber = updatedFields.phoneNumber;
    }

    if (Object.keys(updates).length > 0) {
      try {
        const userRef = doc(firestore, table, userId);
        await updateDoc(userRef, updates);
        Alert.alert("Success", "User updated successfully.");
        setExpandedUserId(null);
        setUpdatedFields({ address: '', phoneNumber: '' });
      } catch (error) {
        Alert.alert("Error", "Failed to update user.");
      }
    } else {
      Alert.alert("Error", "Please fill out at least one field to update.");
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text.length === 0) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.firstName.toLowerCase().includes(text.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{userType} List</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name..."
            value={searchTerm}
            onChangeText={handleSearch}
          />
          {filteredUsers.length === 0 ? (
            <Text style={styles.noResultsText}>No results</Text>
          ) : (
            filteredUsers.map((user) => (
              <View key={user.id}>
                <TouchableOpacity style={styles.item} onPress={() => handleExpand(user.id)}>
                  <Text style={styles.itemText}>{user.firstName} {user.lastName}</Text>
                </TouchableOpacity>
                {expandedUserId === user.id && (
                  <View style={styles.dropdown}>
                    <TextInput
                      style={styles.input}
                      placeholder="Change Address"
                      value={updatedFields.address}
                      onChangeText={(text) => setUpdatedFields({ ...updatedFields, address: text })}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Change Phone Number"
                      value={updatedFields.phoneNumber}
                      onChangeText={(text) => setUpdatedFields({ ...updatedFields, phoneNumber: text })}
                    />
                    <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdate(user.id)}>
                      <Text style={styles.updateButtonText}>Update</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default UpdateEntity;
