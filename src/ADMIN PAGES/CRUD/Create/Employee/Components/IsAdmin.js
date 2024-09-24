import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const IsAdminPicker = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <View style={styles.container}>
       <Text style={styles.label}>Is Admin:</Text>
      <Picker
        selectedValue={isAdmin}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setIsAdmin(itemValue)}
        
      >
       
        <Picker.Item label="True" value={true} />
        <Picker.Item label="False" value={false} />
      
      </Picker>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 150,
    backgroundColor: "Gray",
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default IsAdminPicker;