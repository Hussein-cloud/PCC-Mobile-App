import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AgendaCalendar from '../components/AgendaCalendar';
import AddButton from '../components/AddButton';
import CreateAgendaModal from './CreateAgendaModal';

const CalendarScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddButtonPress = () => {
    setModalVisible(true);
  };

  const handleSaveAgenda = (agenda) => {
    console.log('Agenda saved:', agenda);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      <AgendaCalendar />
      <View style={styles.addButtonContainer}>
        <AddButton onPress={handleAddButtonPress} />
      </View>
      <CreateAgendaModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveAgenda}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
});

export default CalendarScreen;
