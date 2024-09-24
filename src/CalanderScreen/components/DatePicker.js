import React, { useState, useEffect } from 'react';
import { View, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DatePickerComponent = ({ date, onDateChange }) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [displayDate, setDisplayDate] = useState(date || new Date());

  useEffect(() => {
    if (date) {
      setDisplayDate(date);
    }
  }, [date]);

  const showPicker = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || displayDate;
    setShow(Platform.OS === 'ios');
    setDisplayDate(currentDate);
    if (selectedDate) {
      onDateChange(currentDate);
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="calendar" size={30} />
      <TouchableOpacity style={styles.label} onPress={() => showPicker('date')}>
        <Text style={styles.labelText}>
          {displayDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={displayDate}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e63938',
    marginLeft: 10
  },
  labelText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default DatePickerComponent;
