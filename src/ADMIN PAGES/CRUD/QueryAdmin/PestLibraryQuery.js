import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { auth, firestore } from '../../../Backend/DatabaseConnection/DataBaseAuth';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import PestLibraryView from '../../Screens/PestLibraryView'; // Adjust the path as necessary

// Loading component
const Loading = () => <Text>Loading...</Text>;

// Error component
const Error = ({ message }) => <Text>Error: {message}</Text>;

// Fetch pests data
const fetchPests = async (userId, setPest, setError, setLoading) => {
  try {
    const agendaCollectionRef = collection(firestore, 'PestTable');
    const querySnapshot = await getDocs(agendaCollectionRef);

    if (!querySnapshot.empty) {
      const taskList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          type: data.type,
          size: data.size,
          colour: data.colour,
          description: data.description,
        };
      });
      setPest(taskList);
    } else {
      console.log('No pest index found.');
    }
  } catch (error) {
    setError('Error fetching data: ' + error.message);
  } finally {
    setLoading(false);
  }
};

const PestLibraryQuery = () => {
  const [pests, setPest] = useState([]);
  const [filteredPests, setFilteredPests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAuthStateChange = useCallback(
    (user) => {
      if (user) {
        fetchPests(user.uid, setPest, setError, setLoading);
      } else {
        setError('No user is currently signed in.');
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return () => unsubscribe();
  }, [handleAuthStateChange]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = pests.filter(pest =>
        pest.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pest.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pest.colour.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pest.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPests(filtered);
    } else {
      setFilteredPests(pests);
    }
  }, [searchQuery, pests]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search pests..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <ScrollView>
        {filteredPests.map((pest) => (
          <PestLibraryView key={pest.id} pest={pest} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchInput: {
    shadowColor: '#000', // black shadow
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android only
    marginTop: 20,
    height: 40,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
});

export default PestLibraryQuery;
