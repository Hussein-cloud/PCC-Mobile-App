import React from "react";
import { View, Text } from "react-native";
import styles from "../style/styles";

const CustomerInfo = ({ customer, address, phoneNumber }) => (
  <View style={styles.section}>
    <Text style={styles.header}>Customer Information</Text>
    <Text style={styles.label}>
      Name: <Text style={styles.text}>{customer}</Text>
    </Text>
    <Text style={styles.label}>
      Address: <Text style={styles.text}>{address}</Text>
    </Text>
    <Text style={styles.label}>
      Phone Number: <Text style={styles.text}>{phoneNumber}</Text>
    </Text>
  </View>
);

export default CustomerInfo;
