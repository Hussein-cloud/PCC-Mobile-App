// LogOutScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../Colours/themeManager'; // Import the useTheme hook
import { auth } from '../../Backend/DatabaseConnection/DataBaseAuth';

const LogOutScreen = ({ setIsLoggedOut }) => {
  const navigation = useNavigation();
  const { colors } = useTheme(); // Get current theme colors

  const handleConfirmLogout = () => {
    auth.signOut();
    console.log("Logged out");
    setIsLoggedOut(false);
    navigation.navigate('Sign up');
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={[styles.logOutScreenWrapper, { backgroundColor: colors.overlay }]}>
        <View style={[styles.logOutContainer, { backgroundColor: colors.background }]}>
          <Ionicons name="exit-outline" size={64} color={colors.icon} style={styles.icon} />
          <Text style={[styles.logOutText, { color: colors.text }]}>Are you sure you wanna logout?</Text>
          <TouchableOpacity style={[styles.cancelButton, { backgroundColor: colors.cancelButtonBackground, borderColor: colors.cancelButtonBorder }]} onPress={() => setIsLoggedOut(false)}>
            <Text style={[styles.cancelButtonText, { color: colors.cancelButtonText }]}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.confirmButton, { backgroundColor: colors.confirmButtonBackground }]} onPress={handleConfirmLogout}>
            <Text style={[styles.confirmButtonText, { color: colors.confirmButtonText }]}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LogOutScreen;
