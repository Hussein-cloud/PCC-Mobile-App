import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../style/styles";

const MaterialsUsed = ({
  usedMaterials,
  setUsedMaterials,
  isEditable,
  recordExists,
  toggleEdit,
}) => (
  <View style={styles.section}>
    <Text style={styles.label}>Materials Used</Text>
    <TextInput
      style={[styles.input, styles.multiLineInput]}
      placeholder="List materials used"
      value={usedMaterials}
      editable={!recordExists || isEditable.materialsSection}
      onChangeText={setUsedMaterials}
      multiline
    />
    {recordExists && (
      <TouchableOpacity
      style={isEditable.materialsSection ? styles.editButtonDisabled : styles.editButtonEnabled}
      onPress={() => toggleEdit("materialsSection")}
    >
      <Ionicons
        name={isEditable.materialsSection ? "close" : "add"}
        size={20}
        color="white"
      />
      <Text style={styles.editButtonText}>
        {isEditable.materialsSection ? "Disable Edit" : "Enable Edit"}
      </Text>
    </TouchableOpacity>
    )}
  </View>
);

export default MaterialsUsed;
