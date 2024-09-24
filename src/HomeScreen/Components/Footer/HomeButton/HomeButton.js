import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, RefreshControl, Dimensions } from 'react-native';
import { auth} from '../../../../Backend/DatabaseConnection/DataBaseAuth';
import { onAuthStateChanged } from 'firebase/auth';
import BodyCard from '../../body/BodyCard'; // Adjust the path as necessary

import fetchData from './utils/FetchData';
import filterAndSortTasks from './utils/filterAndSortTasks';
import styles from './Style/Styles'; // Importing the styles

const HomeContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [technicianName, setTechnicianName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(setTasks, setTechnicianName, setError, filterAndSortTasks, setLoading, setRefreshing);
      } else {
        setError('No user is currently signed in.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(setTasks, setTechnicianName, setError, filterAndSortTasks, setLoading, setRefreshing);
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(({ item }) => <BodyCard task={item} />, []);

  const windowWidth = Dimensions.get('window').height * 0.74 + 80;

  return (
    <SafeAreaView>
      <Text style={styles.title}>Tasks for {technicianName}</Text>
      <FlatList
        data={tasks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tasks available. Pull down to refresh.</Text>
            </View>
          )
        }
       
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        snapToInterval={windowWidth}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </SafeAreaView>
  );
};

export default HomeContainer;
