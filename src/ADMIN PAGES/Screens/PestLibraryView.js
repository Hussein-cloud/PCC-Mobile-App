import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import images from '../../HomeScreen/Components/body/ImageMap';

const PestLibraryView = ({ pest }) => {
  // Determine the image source based on the type
  const imageSource = images[pest.type] || null;

  return (
    <View style={styles.card}>
      {imageSource ? (
        <Image 
          source={imageSource} 
          style={styles.image} 
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <Text style={styles.title}>{pest.type}</Text>
      <Text style={styles.subtitle}>Size: {pest.size}</Text>
      <Text style={styles.subtitle}>Colour: {pest.colour}</Text>
      <Text style={styles.text}>Description: {pest.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', // White background for the card
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    shadowColor: '#333333', // Darker shadow color
    shadowOffset: { width: 0, height: 6 }, // Increased shadow offset
    shadowOpacity: 0.3, // Slightly higher opacity
    shadowRadius: 10, // Larger radius for a more pronounced shadow
    elevation: 8, // Higher elevation for better shadow effect
    borderWidth: 1, // Mild border width
    borderColor: '#BDC3C7', // Light grey border color
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#E0E0E0', // Light grey for placeholder
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 16,
    color: '#9E9E9E', // Grey color for placeholder text
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50', // Darker shade of blue-grey for title
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#34495E', // Medium grey-blue for subtitles
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: '#7F8C8D', // Light grey for description text
    lineHeight: 22,
  },
});

export default PestLibraryView;
