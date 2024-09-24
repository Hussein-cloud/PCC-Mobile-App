import React from 'react';
import { StyleSheet, View } from 'react-native';
import AgendaCalendar from './AgendaCalendarClient';

const CalendarScreen = () => {

  return (
    <View style={styles.mainContainer}>
      <AgendaCalendar />
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