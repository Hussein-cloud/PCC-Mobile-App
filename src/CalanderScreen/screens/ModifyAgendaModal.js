import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';
import AddressInputComponent from '../components/AddressInputComponent';
import AssigneeInputComponent from '../components/AssigneeInputComponent';
import CustomerNameInputComponent from '../components/CustomerNameInputComponent';
import AgendaTypeInputComponent from '../components/AgendaTypeInputComponent';
import SaveCancelButtons from '../components/SaveCancelButtons';
import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../Backend/DatabaseConnection/DataBaseAuth';
import ConfirmModifyModal from './ConfirmModifyModal';
import ConfirmCancelUpdateModal from './ConfirmCancelUpdateModal';
import { SuccessModal, FailureModal } from './SuccessFailureUpdateModal';

const ModifyAgendaModal = ({ visible, onClose, onSave, currentAgenda }) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [assignee, setAssigneeName] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [address, setAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [agendaType, setAgendaType] = useState('');
  const [agendaTypeId, setAgendaTypeId] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [cancelConfirmVisible, setCancelConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [failureVisible, setFailureVisible] = useState(false);
  const [startTimeError, setStartTimeError] = useState('');
  const [originalValues, setOriginalValues] = useState({});
  const [isModified, setIsModified] = useState(false);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');

  useEffect(() => {
    if (visible && currentAgenda) {
      const initialDate = currentAgenda.date ? new Date(currentAgenda.date.seconds * 1000) : new Date();
      const initialStartTime = currentAgenda.startTime ? new Date(currentAgenda.startTime.seconds * 1000) : new Date();
      const initialEndTime = currentAgenda.endTime ? new Date(currentAgenda.endTime.seconds * 1000) : new Date();
      
      setDate(initialDate);
      setStartTime(initialStartTime);
      setEndTime(initialEndTime);
      setAssigneeName(currentAgenda.assignee || '');
      setAssigneeId(currentAgenda.assigneeId || '');
      setAddress(currentAgenda.address || '');
      setCustomerName(currentAgenda.customerName || '');
      setCustomerId(currentAgenda.customerId || '');
      setAgendaType(currentAgenda.agendaType || '');
      setAgendaTypeId(currentAgenda.agendaTypeId || '');
      setCustomerPhoneNumber(currentAgenda.customerPhoneNumber || '');
      
      setOriginalValues({
        date: initialDate,
        startTime: initialStartTime,
        endTime: initialEndTime,
        assignee: currentAgenda.assignee || '',
        assigneeId: currentAgenda.assigneeId || '',
        address: currentAgenda.address || '',
        customerName: currentAgenda.customerName || '',
        customerId: currentAgenda.customerId || '',
        agendaType: currentAgenda.agendaType || '',
        agendaTypeId: currentAgenda.agendaTypeId || '',
        customerPhoneNumber: currentAgenda.customerPhoneNumber || ''
      });

      setIsModified(false); // Reset modified flag on open
    }
  }, [visible, currentAgenda]);

  useEffect(() => {
    // Compare current values with original values to determine if the form is modified
    const checkIfModified = () => {
      setIsModified(
        date !== originalValues.date ||
        startTime !== originalValues.startTime ||
        endTime !== originalValues.endTime ||
        assignee !== originalValues.assignee ||
        assigneeId !== originalValues.assigneeId ||
        address !== originalValues.address ||
        customerName !== originalValues.customerName ||
        customerId !== originalValues.customerId ||
        agendaType !== originalValues.agendaType ||
        agendaTypeId !== originalValues.agendaTypeId ||
        customerPhoneNumber !== originalValues.customerPhoneNumber
      );
    };

    checkIfModified();
  }, [date, startTime, endTime, assignee, assigneeId, address, customerName, customerId, agendaType, agendaTypeId, originalValues, customerPhoneNumber]);

  const validateTimes = () => {
    if (endTime <= startTime) {
      setStartTimeError('End time must be greater than start time.');
      return false;
    } else {
      setStartTimeError('');
      return true;
    }
  };

  const handleSave = () => {
    if (!validateTimes()) return;
    if (isModified) {
      setConfirmVisible(true);
    }
  };

  const handleConfirmSave = async () => {
    try {
      const updatedAgenda = {
        ...currentAgenda,
        date: Timestamp.fromDate(date),
        startTime: Timestamp.fromDate(startTime),
        endTime: Timestamp.fromDate(endTime),
        assignee,
        assigneeId,
        address,
        customerName,
        customerId,
        agendaType,
        agendaTypeId,
        customerPhoneNumber
      };

      const agendaRef = doc(firestore, 'AgendaTable', currentAgenda.docId);
      await updateDoc(agendaRef, updatedAgenda);

      setConfirmVisible(false);
      setSuccessVisible(true);
    } catch (error) {
      console.error('Error updating agenda:', error);
      setFailureVisible(true);
      setConfirmVisible(false);
    }
  };

  const handleCancelSave = () => {
    setConfirmVisible(false);
  };

  const handleCancel = () => {
    setCancelConfirmVisible(true);
  };

  const handleConfirmCancel = () => {
    setCancelConfirmVisible(false);
    onClose();
  };

  const handleCancelCancel = () => {
    setCancelConfirmVisible(false);
  };

  const handleSuccessClose = () => {
    setSuccessVisible(false);
    onClose();
  };

  const handleFailureClose = () => {
    setFailureVisible(false);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleStartTimeChange = (newStartTime) => {
    setStartTime(newStartTime);
  };

  const handleEndTimeChange = (newEndTime) => {
    setEndTime(newEndTime);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Modify Agenda</Text>

          <DatePicker date={date} onDateChange={handleDateChange} />
          <TimePicker
            startTime={startTime}
            endTime={endTime}
            onStartTimeChange={handleStartTimeChange}
            onEndTimeChange={handleEndTimeChange}
          />
          {startTimeError ? <Text style={styles.errorText}>{startTimeError}</Text> : null}

          <AssigneeInputComponent 
            initialValue={assignee} 
            onAssigneeChange={(name, id) => { setAssigneeName(name); setAssigneeId(id); }} 
          />
          <AddressInputComponent 
            initialValue={address} 
            onAddressChange={(newAddress) => { setAddress(newAddress); }} 
            editable={false}  
          />
          <AgendaTypeInputComponent 
            initialValue={agendaType} 
            onAgendaTypeChange={(type, id) => { setAgendaType(type); setAgendaTypeId(id); }} 
          />
          <CustomerNameInputComponent 
            initialValue={customerName} 
            onCustomerNameChange={(name, id) => { setCustomerName(name); setCustomerId(id); }} 
            onAddressChange={(newAddress) => { setAddress(newAddress); }} 
          />

          <SaveCancelButtons 
            onSave={handleSave} 
            onCancel={handleCancel} 
            saveButtonEnabled={isModified}
          />

          <ConfirmCancelUpdateModal 
            visible={cancelConfirmVisible} 
            onConfirm={handleConfirmCancel} 
            onCancel={handleCancelCancel} 
          />

          <ConfirmModifyModal 
            visible={confirmVisible} 
            onConfirm={handleConfirmSave} 
            onCancel={handleCancelSave} 
          />

          <SuccessModal 
            visible={successVisible} 
            onClose={handleSuccessClose} 
          />
          <FailureModal 
            visible={failureVisible} 
            onClose={handleFailureClose} 
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ModifyAgendaModal;
