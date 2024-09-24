import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, SafeAreaView, Text } from 'react-native';
import ReportScreen from '../../../../ReportScreen/screens/ReportScreen';


export default function ReportButton() {

  
    return (
      <ReportScreen/>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    logoImage: {
      width: 32,
      height: 32,
    },
  });
  