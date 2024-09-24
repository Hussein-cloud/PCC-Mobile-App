import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  section: {
    marginVertical: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  itemlogOut: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  itemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#000',
  },
  
  itemTextLogOut: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: 'white',
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    margin: 6,
    
  },
  shadowBoxLogOut: {
    shadowColor: '#8B0000', // Dark red color
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 12,
    margin: 6,
    
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowRadius: 4,
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: 'center',
  },
  logOutText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#e63938',
    borderWidth: 1,
    width: '40%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#e63938',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#e63938',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default styles;