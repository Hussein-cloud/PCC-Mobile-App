import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';
import AddressInputComponent from '../components/AddressInputComponent';
import AssigneeInputComponent from '../components/AssigneeInputComponent';
import CustomerNameInputComponent from '../components/CustomerNameInputComponent';
import AgendaTypeInputComponent from '../components/AgendaTypeInputComponent';
import SaveCancelButtons from '../components/SaveCancelButtons';
import ConfirmSaveModal from './ConfirmSaveModal'; // Import the confirmation modal
import { SuccessModal, FailureModal } from './SuccessFailureModals'; // Import the success and failure modals
import CancelConfirmationModal from './CancelConfirmationModal'; // Import the cancel confirmation modal
import { Timestamp, collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../Backend/DatabaseConnection/DataBaseAuth';

const CreateAgendaModal = ({ visible, onClose, onSave }) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [assignee, setAssigneeName] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [address, setAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [agendaType, setAgendaType] = useState('');
  const [agendaTypeId, setAgendaTypeId] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false); // State for confirmation modal visibility
  const [cancelConfirmationVisible, setCancelConfirmationVisible] = useState(false); // State for cancel confirmation modal visibility
  const [successVisible, setSuccessVisible] = useState(false); // State for success modal visibility
  const [failureVisible, setFailureVisible] = useState(false); // State for failure modal visibility
  
  // Error states for validation
  const [startTimeError, setStartTimeError] = useState('');
  const [assigneeError, setAssigneeError] = useState('');
  const [customerNameError, setCustomerNameError] = useState('');
  const [agendaTypeError, setAgendaTypeError] = useState('');

  useEffect(() => {
    if (!visible) {
      // Reset state when the modal is closed
      setDate(new Date());
      setStartTime(new Date());
      setEndTime(new Date());
      setAssigneeName('');
      setAssigneeId('');
      setAddress('');
      setCustomerName('');
      setCustomerId('');
      setAgendaType('');
      setAgendaTypeId('');
      setCustomerPhoneNumber('');
      resetErrors(); // Reset all error states
    }
  }, [visible]);

  const resetErrors = () => {
    setStartTimeError('');
    setAssigneeError('');
    setCustomerNameError('');
    setAgendaTypeError('');
  };

  const handleSave = () => {
    let isValid = true;

    // Validation checks
    if (endTime <= startTime) {
      setStartTimeError('End time must be greater than start time.');
      isValid = false;
    } else {
      setStartTimeError('');
    }

    if (!assignee) {
      setAssigneeError('Assignee cannot be empty.');
      isValid = false;
    } else {
      setAssigneeError('');
    }

    if (!customerName) {
      setCustomerNameError('Customer name cannot be empty.');
      isValid = false;
    } else {
      setCustomerNameError('');
    }

    if (!agendaType) {
      setAgendaTypeError('Agenda type cannot be empty.');
      isValid = false;
    } else {
      setAgendaTypeError('');
    }

    if (isValid) {
      // Show the confirmation modal if all fields are valid
      setConfirmVisible(true);
    }
  };

  const handleConfirmSave = async () => {
    try {
      const agenda = {
        date: Timestamp.fromDate(date),
        startTime: Timestamp.fromDate(startTime),
        endTime: Timestamp.fromDate(endTime),
        assignee,
        assigneeId,
        address,
        customerName,
        customerId,
        customerPhoneNumber,
        agendaType,
        agendaTypeId,
      };

      await addDoc(collection(firestore, 'AgendaTable'), agenda);

      setSuccessVisible(true); // Show success modal
      setConfirmVisible(false); // Hide the confirmation modal
    } catch (error) {
      console.error('Error saving agenda:', error);
      setFailureVisible(true); // Show failure modal
      setConfirmVisible(false); // Hide the confirmation modal
    }
  };

  const handleCancelSave = () => {
    // Show the cancel confirmation modal
    setCancelConfirmationVisible(true);
  };

  const handleConfirmCancel = () => {
    // Reset state and close the modal
    setDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    setAssigneeName('');
    setAssigneeId('');
    setAddress('');
    setCustomerName('');
    setCustomerId('');
    setAgendaType('');
    setAgendaTypeId('');
    setCustomerPhoneNumber('');
    setCancelConfirmationVisible(false);
    onClose(); // Close the parent modal
  };

  const handleCancelCancel = () => {
    setCancelConfirmationVisible(false);
  };

  const handleSuccessClose = () => {
    setSuccessVisible(false);
    onClose(); // Close the parent modal when success modal is closed
  };

  const handleFailureClose = () => {
    setFailureVisible(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Create Agenda</Text>

          <DatePicker date={date} onDateChange={setDate} />
          <TimePicker
            startTime={startTime}
            endTime={endTime}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
          />
          {startTimeError ? <Text style={styles.errorText}>{startTimeError}</Text> : null}

          <AssigneeInputComponent 
            initialValue={assignee} 
            onAssigneeChange={(name, id) => { setAssigneeName(name); setAssigneeId(id); }} 
          />
          {assigneeError ? <Text style={styles.errorText}>{assigneeError}</Text> : null}

          <AddressInputComponent 
            initialValue={address} 
            onAddressChange={setAddress} 
            editable={false}  
          />

          <AgendaTypeInputComponent 
            initialValue={agendaType} 
            onAgendaTypeChange={(type, id) => { setAgendaType(type); setAgendaTypeId(id); }} 
          />
          {agendaTypeError ? <Text style={styles.errorText}>{agendaTypeError}</Text> : null}

          <CustomerNameInputComponent 
            initialValue={customerName} 
            onCustomerNameChange={(name, id, customerPhoneNumber) => { setCustomerName(name); setCustomerId(id); setCustomerPhoneNumber(customerPhoneNumber);}} 
            onAddressChange={setAddress} 
          />
          {customerNameError ? <Text style={styles.errorText}>{customerNameError}</Text> : null}

          <SaveCancelButtons onSave={handleSave} onCancel={handleCancelSave} saveButtonEnabled={true}/>

          {/* Add the confirmation modal */}
          <ConfirmSaveModal 
            visible={confirmVisible} 
            onConfirm={handleConfirmSave} 
            onCancel={() => setConfirmVisible(false)} 
          />

          {/* Add the cancel confirmation modal */}
          <CancelConfirmationModal 
            visible={cancelConfirmationVisible} 
            onConfirm={handleConfirmCancel} 
            onCancel={handleCancelCancel} 
          />

          {/* Success and Failure Modals */}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default CreateAgendaModal;
