import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../style/styles";

const TechnicianComments = ({
  comment,
  setComment,
  isEditable,
  recordExists,
  toggleEdit,
  assignee,
}) => (
  <View style={styles.section}>
    <Text style={styles.label}>{assignee}'s Comments</Text>
    <TextInput
      style={[styles.input, styles.multiLineInput]}
      placeholder="Enter comments here"
      value={comment}
      editable={!recordExists || isEditable.commentSection}
      onChangeText={setComment}
      multiline
    />
    {recordExists && (
            <TouchableOpacity
            style={isEditable.commentSection ? styles.editButtonDisabled : styles.editButtonEnabled}
            onPress={() => toggleEdit("commentSection")}
          >
            <Ionicons
              name={isEditable.commentSection ? "close" : "add"}
              size={20}
              color="white"
            />
            <Text style={styles.editButtonText}>
              {isEditable.commentSection ? "Disable Edit" : "Enable Edit"}
            </Text>
          </TouchableOpacity>
    )}
  </View>
);

export default TechnicianComments;
