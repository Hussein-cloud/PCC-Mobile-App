import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../style/styles";

const SaveButton = ({ handleSave }) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={handleSave}>
      <Text style={styles.buttonText}>Save Report</Text>
    </TouchableOpacity>
  </View>
);

export default SaveButton;
