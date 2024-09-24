import styles from '../componentStyle/styles';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { auth } from '../../../Backend/DatabaseConnection/DataBaseAuth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Account = ({ navigation }) => {

return(
    <View style={styles.section}>
    <Text style={styles.sectionTitle}>Account</Text>
    <TouchableOpacity style={[styles.item, styles.shadowBox]}>
      <FontAwesome name="user-circle" size={24} color="#000" />
      <Text style={styles.itemText}>Customize Profile</Text>
      <FontAwesome name="angle-right" size={24} color="#000" />
    </TouchableOpacity>

  </View>
);


};


export default Account;