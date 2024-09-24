import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './style/styles';
import LogOutModal from './components/LogOutModal';
import AccountSection from './components/AccountSection';
import LogOutButton from './components/LogOutButton';

export default function SettingsScreen() {
  const navigationScreen = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <AccountSection navigationScreen={navigationScreen}/>

        <LogOutButton  setIsModalVisible={setIsModalVisible} />
       
        <LogOutModal 
          isModalVisible={isModalVisible} 
          setIsModalVisible={setIsModalVisible} 
        />
      </ScrollView>
    </SafeAreaView>
  );
}
