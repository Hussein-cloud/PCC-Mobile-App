import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../style/styles";

const AgendaDetails = ({
  agendaType,
  inspectionFee,
  setInspectionFee,
  treatmentFee,
  setTreatmentFee,
  materialsUsedFee,
  setMaterialsUsedFee,
  labourCost,
  setLabourCost,
  totalCost,
  isEditable,
  recordExists,
  toggleEdit,
}) => (
  <View style={styles.section}>
    <Text style={styles.label}>
      Agenda Type (<Text style={styles.label}>{agendaType}</Text>)
    </Text>
    <Text style={styles.label}>Cost Breakdown</Text>
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      placeholder="Inspection Fee"
      value={inspectionFee}
      editable={!recordExists || isEditable.costSection}
      onChangeText={setInspectionFee}
    />
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      placeholder="Treatment Fee"
      value={treatmentFee}
      editable={!recordExists || isEditable.costSection}
      onChangeText={setTreatmentFee}
    />
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      placeholder="Materials Used Fee"
      value={materialsUsedFee}
      editable={!recordExists || isEditable.costSection}
      onChangeText={setMaterialsUsedFee}
    />
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      placeholder="Labour Cost"
      value={labourCost}
      editable={!recordExists || isEditable.costSection}
      onChangeText={setLabourCost}
    />
    <Text style={styles.label}>Total Cost: ${totalCost.toFixed(2)}</Text>
    {recordExists && (
      <TouchableOpacity
        style={isEditable.costSection ? styles.editButtonDisabled : styles.editButtonEnabled}
        onPress={() => toggleEdit("costSection")}
      >
        <Ionicons
          name={isEditable.costSection ? "close" : "add"}
          size={20}
          color="white"
        />
        <Text style={styles.editButtonText}>
          {isEditable.costSection ? "Disable Edit" : "Enable Edit"}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

export default AgendaDetails;
