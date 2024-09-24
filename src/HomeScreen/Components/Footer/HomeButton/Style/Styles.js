import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 50,
    backgroundColor: 'white',
    width: windowWidth,
    // iOS Shadow Properties
    shadowColor: '#000', // Dark shadow color
    shadowOffset: { width: 0, height: 10 }, // Longer shadow offset for more pronounced shadow
    shadowOpacity: 0.3, // Higher opacity for a darker shadow
    shadowRadius: 10, // Larger radius for a more spread-out shadow

    // Android Shadow Properties
    elevation: 80, // Higher elevation for a more pronounced shadow on Android
  },
  safe:{
    backgroundColor: 'white', // Light background
  },
  container: {
    flex: 1,
    backgroundColor: 'white', // Light background
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  list: {
    backgroundColor: 'white', // Light background
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '80%', // Space from top when there are no tasks
    paddingBottom: '100%', // Padding for the list
  },
  emptyText: {
    
    fontSize: 18,
    color: '#999', // Lighter color for the empty state message
    textAlign: 'center',
  },
  flatList: {
    
    flexGrow: 1,
    paddingVertical: 10,
  },

});

export default styles;
