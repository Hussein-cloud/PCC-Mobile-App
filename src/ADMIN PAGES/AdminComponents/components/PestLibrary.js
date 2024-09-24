import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from '../componentStyle/styles';

const Pest = ({ navigation }) => {
  // Function to navigate to Create Pest Entry screen
  const navigatePest = () => {
    navigation.navigate('CreatePestEntry');
  };

  // Function to navigate to View Pest Library screen
  const navigateViewPest = () => {
    navigation.navigate('PestLibrary');
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pest Library</Text>

      <TouchableOpacity style={[styles.item, styles.shadowBox]} onPress={navigatePest}>
        <Ionicons name="bug" size={24} color="black" />
        <Text style={styles.itemText}>Create Pest Entry</Text>
        <FontAwesome name="angle-right" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.item, styles.shadowBox]} onPress={navigateViewPest}>
        <MaterialCommunityIcons name="bug-outline" size={24} color="black" />
        <Text style={styles.itemText}>View Pest Library</Text>
        <FontAwesome name="angle-right" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default Pest;
