import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';

import Employee from '../AdminComponents/components/Empoyee Section';
import Account from '../AdminComponents/components/Account';
import Customer from '../AdminComponents/components/Customer Section';
import AdminQuery from '../CRUD/QueryAdmin/Query';
import Pest from '../AdminComponents/components/PestLibrary';
import LogOutButton from '../../SettingsScreen/Screen/components/LogOutButton';
import LogOutModal from '../../SettingsScreen/Screen/components/LogOutModal';
import styles from '../Style/AdminStyle'
const AdminScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const filteredComponents = () => {
    const components = [
      { key: 'account logout pfofile', component: <Account navigation={navigation}/> },
      { key: 'pest library index', component: <Pest navigation={navigation}/> },
      { key: 'Employee section create Employee  update Employee delete Employee', component: <Employee navigation={navigation}/> },
      { key: 'Customer Section create customer update customer delete customer', component: <Customer navigation={navigation}/> },
    ];

    return components.filter(component =>
      component.key.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
      <AdminQuery/>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
      <ScrollView>
        
        
        {filteredComponents().map((item) => (
          <View key={item.key}>
            {item.component}
          </View>
        ))}
            <LogOutButton  setIsModalVisible={setIsModalVisible} />
        <LogOutModal 
          isModalVisible={isModalVisible} 
          setIsModalVisible={setIsModalVisible} 
        />
      </ScrollView>
    </SafeAreaView>
  );
};



export default AdminScreen;
