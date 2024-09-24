import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // iOS-like background color
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, 
    shadowRadius: 4,
  },
  searchBarContainer: {
    backgroundColor: '#fff', // Subtle background for iOS-like look
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: 'white', // Border similar to iOS
    borderWidth: 1,
    fontSize: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#ffffff', 
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  profileImageContainer: {
    marginRight: 15,
  },
  profileImageFallback: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#d0d0d0', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 16,
    color: '#fff',
  },
  unreadIndicator: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    top: 5,
    right: 5,
    
  },
  contactDetails: {
    flex: 1,
    justifyContent: 'center', // Ensure alignment in the vertical center
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4, // Add a little space between name and message
  },
  contactMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  contactMessage: {
    fontSize: 14,
    color: '#999',
    flexShrink: 1, // Allow message text to shrink to fit
    paddingRight: 10, // Add some padding to the right to separate from date
  },
  messageDate: {
    fontSize: 12,
    color: '#aaa',
    flexShrink: 0, // Ensure date does not shrink
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 16,
  },
});

export default styles;
