import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { firestore } from '../../../Backend/DatabaseConnection/DataBaseAuth'; // Update the path as necessary
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import styles from '../Style/style'; // Import the styles

// Modal components
const ConfirmationModal = ({ visible, userName, onConfirm, onCancel }) => (
  <Modal
    transparent={true}
    visible={visible}
    animationType="fade"
    onRequestClose={onCancel}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Are you sure you want to delete this user {userName}?</Text>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const SuccessModal = ({ visible, onClose }) => (
  <Modal
    transparent={true}
    visible={visible}
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>User deleted successfully.</Text>
        <TouchableOpacity onPress={onClose} style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const DeleteEntity = ({ route, navigation }) => {
  const { table, userType, title } = route.params;
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = await getDocs(collection(firestore, table));
        const userData = userCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userData);
        setFilteredUsers(userData); // Initially, display all users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [table]);

  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({
        headerTitle: title, // Dynamically set the header title
        headerTitleAlign: 'center',
      });
    }
  }, [navigation, title]);

  const handleExpand = useCallback((userId) => {
    setExpandedUserId(prevId => prevId === userId ? null : userId);
  }, []);

  const handleDelete = useCallback((userId, userName) => {
    setSelectedUserId(userId);
    setUserName(userName);
    setIsModalVisible(true); // Show confirmation modal
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      const userRef = doc(firestore, table, selectedUserId);
      await deleteDoc(userRef);
      const updatedUsers = users.filter(user => user.id !== selectedUserId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers); // Update the filtered list after deletion
      setIsModalVisible(false);
      setIsSuccessModalVisible(true); // Show success modal
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }, [selectedUserId, users, table]);

  const handleSearch = useCallback((text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredUsers(users); // If search is cleared, show all users
    } else {
      const filtered = users.filter(user =>
        user.firstName.toLowerCase().includes(text.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered); // Update filtered users based on search term
    }
  }, [users]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name..."
            value={searchTerm}
            onChangeText={handleSearch}
          />
          <View style={styles.section}>
            {filteredUsers.length === 0 ? (
              <Text style={styles.noResultsText}>No results</Text>
            ) : (
              filteredUsers.map(user => (
                <View key={user.id}>
                  <TouchableOpacity 
                    style={[styles.item, styles.shadowBox]} 
                    onPress={() => handleExpand(user.id)}
                  >
                    <Text style={styles.itemText}>{user.firstName} {user.lastName}</Text>
                  </TouchableOpacity>
                  {expandedUserId === user.id && (
                    <View style={styles.dropdown}>
                      <TouchableOpacity 
                        style={styles.updateButton} 
                        onPress={() => handleDelete(user.id, `${user.firstName} ${user.lastName}`)}
                      >
                        <Text style={styles.updateButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))
            )}
          </View>
        </View>

        {/* Custom Modals */}
        <ConfirmationModal 
          visible={isModalVisible} 
          userName={userName}
          onConfirm={confirmDelete}
          onCancel={() => setIsModalVisible(false)}
        />
        <SuccessModal 
          visible={isSuccessModalVisible} 
          onClose={() => setIsSuccessModalVisible(false)}
        />
      </ScrollView>
    </View>
  );
};

export default DeleteEntity;
