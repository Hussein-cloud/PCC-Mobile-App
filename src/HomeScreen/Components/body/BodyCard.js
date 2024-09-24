import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import images from './ImageMap'; // Adjust path as needed
import styles from './style/CardStyle';

const BodyCard = ({task}) => {
  const navigation = useNavigation(); // Get navigation object
  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`; // Format as MM/DD/YYYY
    }
    return 'N/A';
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const taskDate = new Date(task.date.seconds * 1000);
  const isTaskToday = isToday(taskDate);

  // Determine the image source based on agenda
  const imageSource = images[task.agendaType] || null;
  // Function to handle navigation to the ReportScreen
  const handlePress = () => {
    if(isTaskToday){
    navigation.navigate('Create Report',  task); // Navigate to ReportScreen with the task ID
  }
    
  
  };

  return (
    <TouchableOpacity onPress={handlePress}>
   <View style={[styles.card, !isTaskToday && styles.cardWithDarkerShadow]}>
      {imageSource ? (
        <Image 
          source={imageSource} 
          style={styles.image} 
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.imagePlaceholder}>No Image</Text>
      )}
      {!isTaskToday && <View style={styles.overlay} />}
      <Text  style={styles.subtitle}><Text style={styles.subtitle}>Pest Control Type: </Text><Text  style={styles.title}>{task.agendaType}</Text></Text>
      <Text style={styles.subtitle}>Customer Name: {task.customer}</Text>
      <Text style={styles.subtitle}>Customer Address: {task.address}</Text>
      <Text style={styles.text}>Task is assigned to: {task.assignee}</Text>
      <Text style={styles.text}>Date: {formatDate(task.date)}</Text>
    </View>
    </TouchableOpacity>
  );
};

export default BodyCard;
