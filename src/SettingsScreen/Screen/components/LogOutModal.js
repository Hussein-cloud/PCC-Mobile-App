import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from '../style/styles';
import { auth } from '../../../Backend/DatabaseConnection/DataBaseAuth';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

export default function LogOutModal({ isModalVisible, setIsModalVisible }) {
  const navigation = useNavigation(); // Get the navigation object

  const logout = async () => {
    try {
      // Sign out the user
      await auth.signOut();
      console.log("Logged out");

      // Navigate to the Sign In screen
      navigation.navigate('SignIn');
    } catch (error) {
      console.error("Logout failed: ", error.message);
      // Optionally, handle the error (e.g., show an alert to the user)
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.logOutText}>Are you sure you want to log out?</Text>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              logout(); // Call logout function
              setIsModalVisible(false); // Close the modal
            }}
          >
            <Text style={styles.confirmButtonText}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}