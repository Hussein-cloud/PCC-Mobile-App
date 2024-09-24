import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { firestore } from './src/Backend/DatabaseConnection/Connector'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions


const FirestoreDisplay = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchDocuments = async () => {
        try {
          const testCollection = collection(firestore, 'Pest_Control_Center');
          const snapshot = await getDocs(testCollection);
          
          if (snapshot.empty) {
            setDocuments([]);
          } else {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDocuments(docs);
          }
        } catch (error) {
          setError(`Error fetching documents: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDocuments();
    }, []);
  
    const formatValue = (value) => {
      if (typeof value === 'object' && value !== null) {
        // Handle nested objects or timestamps
        if (value.seconds) {
          // Handle Firestore timestamp
          const date = new Date(value.seconds * 1000);
          return date.toLocaleString(); // Format as a date string
        } else {
          return JSON.stringify(value, null, 2); // Format as a JSON string
        }
      }
      return String(value); // Convert to string for other types
    };
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>{error}</Text>;
    }
  
    return (
      <View style={styles.container}>
        {documents.length > 0 ? (
          <FlatList
            data={documents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>ID: {item.id}</Text>
                {Object.keys(item).map((key) => 
                  key !== 'id' && <Text key={key}>{key}: {formatValue(item[key])}</Text>
                )}
              </View>
            )}
          />
        ) : (
          <Text>No documents found.</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    item: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      width: '100%',
    },
  });
  
  export default FirestoreDisplay;