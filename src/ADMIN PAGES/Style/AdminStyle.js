import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light grey background for the entire screen
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF', // White background for header
    shadowColor: '#000', // Dark shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, // Slightly lighter shadow for modern look
    shadowRadius: 4,
    elevation: 3, // Subtle elevation
  },
  searchInput: {
    height: 45,
    borderColor: '#E0E0E0', // Light grey border
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF', // White background for input
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1, // Minimal elevation for input
  },
  section: {
    marginVertical: 12,
    backgroundColor: '#FFFFFF', // White background for section
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10, // Rounded corners for sections
    shadowColor: '#000', // Dark shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Light shadow for subtle effect
    shadowRadius: 4,
    elevation: 2, // Subtle elevation
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333333', // Dark grey color for section title
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Light grey border for item separation
  },
  itemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#333333', // Dark grey color for item text
  },
  shadowBox: {
    backgroundColor: '', // White background for shadow box
    borderRadius: 10,
    padding: 12,
    margin: 8,
    shadowColor: '#000', // Dark shadow color
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, // More pronounced shadow
    shadowRadius: 6,
    elevation: 5, // Higher elevation for better shadow effect
  }
});

export default styles;
