import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { auth, firestore } from '../../../Backend/DatabaseConnection/DataBaseAuth';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import styles from '../../AdminComponents/componentStyle/styles'
const AdminQuery = () => {
    const [adminName, setAdminName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const adminDocRef = doc(firestore, 'EmployeeTable', user.uid);
            const adminDoc = await getDoc(adminDocRef);
  
            if (adminDoc.exists()) {
              const adminData = adminDoc.data();
              setAdminName(adminData.firstName + ' ' + adminData.lastName);
              console.log(adminData.firstName , ' ' , adminData.lastName);
            } else {
              console.log('No such document!');
            }
          } catch (error) {
            setError('Error fetching admin data: ' + error.message);
          } finally {
            setLoading(false);
          }
        } else {
          setError('No user is currently signed in.');
          setLoading(false);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error}</Text>;
    }

    return(
<Text style={styles.headerText}>Hello {adminName}</Text>
    );
};export default AdminQuery;