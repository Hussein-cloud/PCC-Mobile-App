import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import styles from '../style/styles';

export default function AccountSection() {
  const navigation = useNavigation(); // Get the navigation object

  const navigateToResetPassword = () => {
    navigation.navigate('Auth', { screen: 'ResetPassword' });
  };

  return (
    <View style={styles.section}>
      <TouchableOpacity style={[styles.item, styles.shadowBox]}>
        <Ionicons name="notifications" size={24} color="#000" />
        <Text style={styles.itemText}>Notification</Text>
        <FontAwesome name="angle-right" size={24} color="#000" />
      </TouchableOpacity>



      <TouchableOpacity
        style={[styles.item, styles.shadowBox]}
        onPress={navigateToResetPassword}
      >
        <Ionicons name="lock-open" size={24} color="#000" />
        <Text style={styles.itemText}>Reset Password</Text>
        <FontAwesome name="angle-right" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}