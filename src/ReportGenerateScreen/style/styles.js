import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row', // Aligns children horizontally
        justifyContent: 'space-between', // Adds space between the buttons
        alignItems: 'center', // Centers items vertically within the row
        marginVertical: 10, // Adds vertical margin to the row
      },
      buttonGenerate: {
        flex: 1, // Allows buttons to take equal width
        paddingVertical: 10,
        marginHorizontal: 5, // Adds space between the buttons
        backgroundColor: '#d32f2f', // Button background color
        borderRadius: 5, // Rounded corners
        alignItems: 'center', // Centers text within the button
      },
      buttonText: {
        color: 'white', // Text color
        fontWeight: 'bold', // Makes text bold
      },
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
      },
      editButtonEnabled: {
        backgroundColor: '#28a745', // Green when enabled
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
      },
      editButtonDisabled: {
        backgroundColor: '#d32f2f', // Gray when disabled
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
      },
      editButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
      },
      buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
      },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Light grey background
        padding: 20,
    },
    table: {
        backgroundColor: '#ffffff', // White background for the table
        borderRadius: 8,
        overflow: 'hidden', // Ensure corners are rounded
        shadowColor: '#000', // Shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // For Android shadow effect
    },
    tableHeader: {
        backgroundColor: '#d32f2f', // Red background for the header
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        color: '#ffffff', // White text
        fontSize: 18,
        fontWeight: 'bold',
    },
    tableRow: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
    },
    tableCell: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    cellLabel: {
        flex: 1,
        fontWeight: 'bold',
        color: '#333',
    },
    cellValue: {
        flex: 2,
        color: '#555',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    buttonModify: {
        flex: 1, // Allows buttons to take equal width
        paddingVertical: 10,
        marginHorizontal: 5, // Adds space between the buttons
        backgroundColor: '#28a745', // Button background color
        borderRadius: 5, // Rounded corners
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    section: {
        marginVertical: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    input: {
        fontSize: 16,
        backgroundColor: '#EFEFEF',
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
        borderColor: '#DDD',
        borderWidth: 1,
    },
    multiLineInput: {
        height: 130,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 50,
    },
    button: {
        backgroundColor: '#d32f2f', // Red for a modern touch
        borderRadius: 15,
        paddingVertical: 14,
        paddingHorizontal: 100,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    editButton: {
        backgroundColor: "#28a745", // Professional green
        paddingVertical: 10, // Adjusted padding
        paddingHorizontal: 18, // Adjusted padding
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 14,
        alignSelf: "center",
    },
    editButtonText: {
        color: "#FFFFFF",
        fontSize: 16, // Increased font size for better visibility
        marginRight: 8, // Adjusted spacing between text and icon
        fontWeight: '500',
    },
});

export default styles;
