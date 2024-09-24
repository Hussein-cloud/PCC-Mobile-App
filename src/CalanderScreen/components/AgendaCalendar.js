import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { firestore } from '../../Backend/DatabaseConnection/DataBaseAuth';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import RemoveModifyButtons from './RemoveModifyButtons';
import ConfirmRemoveModal from '../screens/ConfirmRemoveModal';
import { SuccessModal, FailureModal } from '../screens/SuccessFailureRemoveModal';
import ModifyAgendaModal from '../screens/ModifyAgendaModal';

const formatTimestamp = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(timestamp.seconds * 1000);
  const offset = -4; // GMT-4 offset
  const adjustedDate = new Date(date.getTime() + offset * 3600000);
  return adjustedDate.toISOString().split('T')[0];
};

const adjustToGMT4 = (date) => {
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const offset = -4; // GMT-4
  return new Date(utcDate.getTime() + offset * 3600000);
};

const formatTime = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(timestamp.seconds * 1000);
  const adjustedDate = adjustToGMT4(date);
  return adjustedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const colors = ['#FF6F61', '#FFB74D', '#4DB6AC', '#81C784', '#64B5F6'];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const AgendaCalendar = () => {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [confirmRemoveModalVisible, setConfirmRemoveModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState(null);

  // Adjust today's date to GMT-4
  const today = adjustToGMT4(new Date()).toISOString().split('T')[0];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "AgendaTable"), (querySnapshot) => {
      const formattedItems = {};

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.date) {
          const dateKey = formatTimestamp(data.date);
          if (!formattedItems[dateKey]) {
            formattedItems[dateKey] = [];
          }

          formattedItems[dateKey].push({
            id: docSnap.id,
            agendaType: data.agendaType,
            assignee: data.assignee,
            customerName: data.customerName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            startTime: formatTime(data.startTime),
            endTime: formatTime(data.endTime),
            color: getRandomColor(),
            originalData: {
              ...data,
              docId: docSnap.id
            }
          });
        }
      });
      setItems(formattedItems);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleModify = (agenda) => {
    setSelectedAgenda(agenda.originalData);
    setModalVisible(true);
  };

  const handleRemove = (id) => {
    setSelectedAgenda({ id });
    setConfirmRemoveModalVisible(true);
  };

  const confirmRemove = async () => {
    try {
      await deleteDoc(doc(firestore, 'AgendaTable', selectedAgenda.id));
      setSuccessModalVisible(true);
      setConfirmRemoveModalVisible(false);
    } catch (error) {
      console.error('Error removing agenda:', error);
      setFailureModalVisible(true);
    }
  };

  const rowHasChanged = (r1, r2) => {
    return (
      r1.id !== r2.id ||
      r1.agendaType !== r2.agendaType ||
      r1.assignee !== r2.assignee ||
      r1.customerName !== r2.customerName ||
      r1.address !== r2.address ||
      r1.startTime !== r2.startTime ||
      r1.endTime !== r2.endTime ||
      r1.color !== r2.color ||
      r1.phoneNumber !== r2.phoneNumber
    );
  };

  const renderItem = (item) => (
    <View style={[styles.agenda, { backgroundColor: item.color }]}>
      <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
      <Text style={styles.agendaTypeText}>{item.agendaType}</Text>
      <Text style={styles.generalText}>Assignee to {item.assignee}</Text>
      <Text style={styles.generalText}>For Customer {item.customerName}</Text>
      <Text style={styles.generalText}>With address {item.address}</Text>
      <RemoveModifyButtons
        onModify={() => handleModify(item)}
        onRemove={() => handleRemove(item.id)}
      />
    </View>
  );

  const renderEmptyData = () => (
    <View style={styles.emptyDate}>
      <Text style={styles.noEventsFont}>No events for this day</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e63938" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Agenda
        items={items}
        selected={today}
        renderItem={renderItem}
        renderEmptyData={renderEmptyData}
        rowHasChanged={rowHasChanged}
        showOnlySelectedDayItems={true}
        theme={{
          selectedDayBackgroundColor: '#e63938',
          selectedDayTextColor: '#ffffff',
          dotColor: '#000000',
          todayTextColor: '#e63938',
          agendaDayTextColor: '#e63938',
          agendaDayNumColor: '#e63938',
        }}
      />
      {selectedAgenda && (
        <ModifyAgendaModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={() => setModalVisible(false)} // Close the modal after saving
          currentAgenda={selectedAgenda}
        />
      )}
      {confirmRemoveModalVisible && (
        <ConfirmRemoveModal
          visible={confirmRemoveModalVisible}
          onConfirm={confirmRemove}
          onCancel={() => setConfirmRemoveModalVisible(false)}
        />
      )}
      {successModalVisible && (
        <SuccessModal
          visible={successModalVisible}
          onClose={() => setSuccessModalVisible(false)}
        />
      )}
      {failureModalVisible && (
        <FailureModal
          visible={failureModalVisible}
          onClose={() => setFailureModalVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  agenda: {
    borderRadius: 10,
    padding: 10,
    marginRight: 5,
    marginTop: 17,
  },
  emptyDate: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agendaTypeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 3,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  generalText: {
    fontSize: 14,
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventsFont: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default AgendaCalendar;
