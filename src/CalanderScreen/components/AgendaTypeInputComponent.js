import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firestore } from '../../Backend/DatabaseConnection/DataBaseAuth';
import { collection, getDocs } from 'firebase/firestore';

const AgendaTypeInputComponent = ({ initialValue, onAgendaTypeChange }) => {
  const [agendaType, setAgendaType] = useState(initialValue);
  const [agendaTypesList, setAgendaTypesList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setAgendaType(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const fetchAgendaTypes = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'PestTable'));
      const agendaTypes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        type: doc.data().type,
      }));
      setAgendaTypesList(agendaTypes);
    };

    fetchAgendaTypes();
  }, []);

  const handleSelectAgendaType = (type, id) => {
    setAgendaType(type);
    onAgendaTypeChange(type, id);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="format-list-bulleted" size={30} style={styles.icon} />
      <TouchableOpacity 
        style={styles.input} 
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text>{agendaType || "Select Agenda Type"}</Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            data={agendaTypesList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectAgendaType(item.type, item.id)}>
                <Text style={styles.dropdownItem}>{item.type}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#e63938',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 40,
    right: 0,
    maxHeight: 150,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AgendaTypeInputComponent;
