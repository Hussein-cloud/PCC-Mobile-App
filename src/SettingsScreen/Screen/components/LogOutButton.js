import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../style/styles';

export default function LogOutButton({ navigationScreen, setIsModalVisible }) {
  return (
    <View style={styles.section}>

      <TouchableOpacity
        style={[styles.itemlogOut, styles.shadowBoxLogOut]}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.itemTextLogOut}>Log Out</Text>
        <FontAwesome name="angle-right" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}