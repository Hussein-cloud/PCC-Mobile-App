import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Light background color for the container
  },
  tabBar: {
    borderTopLeftRadius: 20, // Rounded corners
    borderTopRightRadius: 20,
    backgroundColor: 'black', // Dark background for the tab bar
    height: '10%',
    shadowColor: '#000', // Subtle shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Shadow for Android
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:0,
    marginBottom:0,
  },
});

export default styles;