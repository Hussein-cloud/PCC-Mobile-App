import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Pest Control Center</Text>
      <Text style={styles.description}>
        Pest Control Center is dedicated to bringing peace of mind to your home and place of business.
        With over 25 years of professional pest control experience you and your family are in good hands!
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'file:///mnt/data/image.png' }}
          style={styles.image}
        />
        <Image
          source={{ uri: 'file:///mnt/data/image.png' }}
          style={styles.logo}
        />
      </View>
      <Text style={styles.footerText}>
        We service Ottawa and surrounding areas to bring PCC's expertise to more homes.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default AboutScreen;
