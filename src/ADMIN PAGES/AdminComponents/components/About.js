import styles from '../componentStyle/styles';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const About = ({ navigation }) => {

      return (
        <View style={styles.container}>
          <Text style={styles.title}>About Pest Control Center</Text>
          <Text style={styles.description}>
            Pest Control Center is dedicated to bringing peace of mind to your home and place of business.
            With over 25 years of professional pest control experience you and your family are in good hands!
          </Text>
          <View style={styles.imageContainer}>
           
          </View>
          <Text style={styles.footerText}>
            We service Ottawa and surrounding areas to bring PCC's expertise to more homes.
          </Text>
        </View>
      );
    };export default About;