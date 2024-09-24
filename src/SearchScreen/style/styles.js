import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 3,
    paddingTop: 10,
    backgroundColor: "white",
  },
  searchContainer: {
    backgroundColor: "white",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  inputContainerStyle: {
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    height: 50,
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderLeftWidth: 10,
    borderColor: "black",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row', // Align children in a row
    alignItems: 'center', // Center items vertically
  },
  itemTextContainer: {
    flex: 1, // Allow text to take up remaining space
    paddingRight: 10, // Space between text and image
  },
  itemText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  itemImage: {
    width: 120, // Small size for the image
    height: 90,
    borderRadius: 10, // Optional: make image rounded
    marginLeft: 10, // Space between text and image
  },
  itemImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: '#ccc', // Placeholder background color
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 50, // Center the text vertically
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Ensure it takes up full width
  },
});

export default styles;
