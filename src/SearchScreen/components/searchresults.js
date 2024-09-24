import React from "react";
import { FlatList, Text, TouchableOpacity, Animated, Image, View } from "react-native";
import { formatTimestamp, formatTime } from "../utils/utils";
import styles from "../style/styles"; // Adjust path as needed
import images from "../../HomeScreen/Components/body/ImageMap"; // Adjust path as needed

const SearchResult = ({ data, onItemPress }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;


  const renderItem = ({ item }) => {

    // Determine the image source based on the agenda
    const imageSource = images[item.agendaType] || null; // Default image if agenda not found

    return (
      <TouchableOpacity
        style={[styles.item]}
        onPress={() => onItemPress(item)}
      >
        <View style={styles.itemContent}>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>Customer Name: {item.customer}</Text>
            <Text style={styles.itemText}>Pest Type: {item.agendaType}</Text>
            <Text style={styles.itemText}>Technician: {item.assignee}</Text>
            <Text style={styles.itemText}>Address: {item.address}</Text>
            <Text style={styles.itemText}>Date: {item.date}</Text>
          </View>
          {imageSource ? (
            <Image 
              source={imageSource} 
              style={styles.itemImage} 
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.itemImagePlaceholder}>No Image</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text>No results found</Text>}
    />
  );
};

export default SearchResult;
