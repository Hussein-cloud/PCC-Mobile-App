import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const cardWidth = screenWidth * 0.93; // Set card width to 95% of screen width
const cardHeight = screenHeight*74/100; // Set card height to 78% of screen height

const styles = StyleSheet.create({
  card: {
    marginBottom: 60,
    marginTop: 20,
    padding: 0, // Remove padding to allow the image to reach the edges
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    elevation: 6, // Increase elevation for Android
    width: cardWidth,
    height: cardHeight,
    overflow: 'hidden', // Ensure content fits within the card with rounded corners
    alignSelf: 'center', // Center the card on the screen
    position: 'relative', // Set position to relative to position overlay absolutely
    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 10, // Shadow blur radius
  },
  cardWithDarkerShadow: {
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 6 }, // Increased shadow offset
    shadowOpacity: 0.5, // Increased shadow opacity
    shadowRadius: 15, // Increased shadow blur radius
  },
  image: {
    width: '100%',
    height: '75%', // Adjust height to take up 65% of the card's height
    borderTopLeftRadius: 15, // Ensure the image follows the card's rounded corners
    borderTopRightRadius: 15,
  },
  imagePlaceholder: {
    width: '100%',
    height: '75%', // Placeholder height to match image height
    backgroundColor: '#e0e0e0',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: cardHeight * 0.65, // Center the placeholder text vertically
  },
  title: {
    fontSize: 20, // Adjust font size if needed
    color: "red",
    fontWeight: 'bold',
    marginVertical: 5,
    paddingLeft: 20,
  },
  subtitle: {
    fontSize: 18, // Adjust font size if needed
    fontWeight: 'bold',
    marginVertical: 2,
    paddingLeft: 20,
  },
  text: {
    fontSize: 18, // Adjust font size if needed
    marginVertical: 2,
    paddingLeft: 20,
  },
  overlay: {
    position: 'absolute', // Absolute position to cover the entire card
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(128, 128, 128, 0.8)', // More opaque gray overlay
    borderRadius: 15, // Ensure the overlay follows the card's rounded corners
    justifyContent: 'center', // Center content if needed
    alignItems: 'center', // Center content if needed
  },
});

export default styles;
