import React, { useState, useEffect } from 'react';
import { View, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TimePickerComponent = ({ startTime, endTime, onStartTimeChange, onEndTimeChange }) => {
  const [show, setShow] = useState(false);
  const [currentMode, setCurrentMode] = useState('start'); // 'start' or 'end'
  const [displayStartTime, setDisplayStartTime] = useState(startTime || new Date());
  const [displayEndTime, setDisplayEndTime] = useState(endTime || new Date());

  useEffect(() => {
    if (startTime) {
      setDisplayStartTime(startTime);
    }
    if (endTime) {
      setDisplayEndTime(endTime);
    }
  }, [startTime, endTime]);

  const showPicker = (mode) => {
    setCurrentMode(mode);
    setShow(true);
  };

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || (currentMode === 'start' ? displayStartTime : displayEndTime);

    setShow(Platform.OS === 'ios');

    if (currentMode === 'start') {
      setDisplayStartTime(currentTime);
      onStartTimeChange(currentTime);
    } else {
      setDisplayEndTime(currentTime);
      onEndTimeChange(currentTime);
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="clock-outline" size={30} />
      <View style={styles.timeSelectors}>
        <TouchableOpacity style={styles.label} onPress={() => showPicker('start')}>
          <Text style={styles.labelText}>
            Start Time: {displayStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.label} onPress={() => showPicker('end')}>
          <Text style={styles.labelText}>
            End Time: {displayEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          value={currentMode === 'start' ? displayStartTime : displayEndTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          is24Hour={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  timeSelectors: {
    flexDirection: 'row',
    marginLeft: 5,
    flex: 1,
  },
  label: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e63938',
    marginHorizontal: 5,
  },
  labelText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default TimePickerComponent;
