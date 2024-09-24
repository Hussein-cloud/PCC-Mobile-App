import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { firestore } from '../../../../Backend/DatabaseConnection/DataBaseAuth'; // Update import path if necessary
import { collection, addDoc } from 'firebase/firestore';

const CreatePest = ({ navigation }) => {
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [colour, setColour] = useState('');
  const [description, setDescription] = useState('');

  const [typeError, setTypeError] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [colourError, setColourError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    let hasError = false;

    // Reset error messages
    setTypeError('');
    setSizeError('');
    setColourError('');
    setDescriptionError('');
    setGeneralError('');

    // Check if all fields are empty
    if (!type && !size && !colour && !description) {
      setGeneralError('All fields are required.');
      return;
    }

    // Validate each field
    if (!type) {
      setTypeError('Pest type is required.');
      hasError = true;
    }
    if (!size) {
      setSizeError('Pest size is required.');
      hasError = true;
    }
    if (!colour) {
      setColourError('Pest colour is required.');
      hasError = true;
    }
    if (!description) {
      setDescriptionError('Pest description is required.');
      hasError = true;
    }

    // If any validation failed, do not proceed
    if (hasError) {
      setSuccess(''); // Clear any previous success messages
      return;
    }

    try {
      // Add new Pest to Firestore
      await addDoc(collection(firestore, 'PestTable'), {
        type,
        size,
        colour,
        description
      });

      setSuccess('Pest created successfully!');
      // Clear input fields
      setType('');
      setSize('');
      setColour('');
      setDescription('');
    } catch (error) {
      setGeneralError('Error creating Pest: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create New Pest</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Pest Type"
            value={type}
            onChangeText={setType}
          />
          {typeError ? <Text style={styles.message}>{typeError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Enter Pest Size"
            value={size}
            onChangeText={setSize}
          />
          {sizeError ? <Text style={styles.message}>{sizeError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Enter Pest Colour"
            value={colour}
            onChangeText={setColour}
          />
          {colourError ? <Text style={styles.message}>{colourError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Enter Pest Description"
            value={description}
            onChangeText={setDescription}
          />
          {descriptionError ? <Text style={styles.message}>{descriptionError}</Text> : null}

          {generalError ? <Text style={styles.message}>{generalError}</Text> : null}
          {success ? <Text style={[styles.message, { color: 'green' }]}>{success}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add Pest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    color: '#e63946',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  message: {
    marginVertical: 10,
    fontSize: 16,
    color: 'red', // Change to 'green' if you want success messages in green
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e63946',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreatePest;
