import { StyleSheet } from 'react-native';
import { getTheme } from '../../Colours/themeManager'; // Adjust the path as needed



const styles = StyleSheet.create({
    text: {
        color: '#bcbcbc',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 13,
        marginBottom: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    mainContainer: {
        width: '100%',
        marginVertical: 8,
        alignItems: 'center',
      },
      passwordContainer: {
        flexDirection: 'row',
        marginVertical: 8,
        alignItems: 'center',
        backgroundColor: '#CCC',
        width: '85%',
        height: 45,
        borderRadius: 30,
        borderColor: '#ccc',
        position: 'relative',
      },
      emailInput: {
        backgroundColor: '#CCC',
        height: 45,
        width: '85%',
        fontSize: 13,
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        marginVertical: 10,
        paddingLeft: 10,
      },
      passwordInput: {
        flex: 1,
        backgroundColor: '#CCC',
        height: 45,
        fontSize: 13,
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingLeft: 10,
        paddingRight: 40,
      },
      icon: {
        position: 'absolute',
        right: 10,
      },
      button: {
        width: 200,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#e63938',
        justifyContent: 'center',
        alignItems: 'center', 
        marginTop: 5,
      },
      buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 26,
        color: '#FFFFFF',
      },
      errorText: {
        color: 'red',
        marginTop: 10,
      },
    containerRemember: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: 10,
        backgroundColor: 'white',
    },
    labelRemember: {
        fontSize: 14,
        marginLeft: 5,
        fontWeight: 'bold',
        color: 'black',
    },
    checkBoxRemember: {
        alignSelf: 'center',
    },
    button: {
        width: 200,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#e63938',
        justifyContent: 'center',
        alignItems: 'center', 
        marginTop: 5,
      },
      buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 26,
        color: '#FFFFFF',
      },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      logoImage: {
        width: 150,
        height: 108,
        resizeMode: 'stretch',
        marginBottom: 10,
      },
    
        button: {
          width: 200,
          height: 45,
          borderRadius: 45,
          backgroundColor: '#E51616',
          justifyContent: 'center',
          alignItems: 'center', 
          marginTop: 5,
        },
        buttonText: {
          fontWeight: 'bold',
          fontSize: 16,
          lineHeight: 26,
          color: '#FFFFFF',
        },
    
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    
    modalContainer: {
        width: 300, 
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

    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 18,
    },
    okButton: {
        width: 100,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#E51616',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default styles;
