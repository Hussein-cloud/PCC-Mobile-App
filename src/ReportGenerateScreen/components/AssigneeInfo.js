import React from "react";
import { View, Text } from "react-native";
import styles from "../style/styles";

const AssigneeInfo = ({ assignee, date }) => (
  <View style={styles.section}>
    <Text style={styles.label}>Assignee Information</Text>
    <Text style={styles.label}>
      Assignee: <Text style={styles.text}>{assignee}</Text>
    </Text>
    <Text style={styles.label}>
      Date Completed: <Text style={styles.text}>{date}</Text>
    </Text>
  </View>
);

export default AssigneeInfo;
