import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import { collection, getDocs, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { firestore, auth } from '../Backend/DatabaseConnection/DataBaseAuth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Style/style'; // Assuming the new styles are defined in this file

interface Employee {
  id: string;
  name: string;
  phone: string;
  email: string;
  profileImage: string;
  recentMessage: string;
  hasUnreadMessages: boolean;
  lastMessageTimestamp?: number;
}

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Employee[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasContacts, setHasContacts] = useState(true);
  const navigation = useNavigation();

  const fetchAllContacts = useCallback(async () => {
    setRefreshing(true);
    try {
      const currentUserId = auth.currentUser?.uid;
      if (!currentUserId) {
        console.log('User not authenticated');
        setRefreshing(false);
        return;
      }

      const contactsMap: { [key: string]: Employee } = {};

      // Fetch all contacts
      const snapshot = await getDocs(collection(firestore, 'EmployeeTable'));
      snapshot.docs.forEach((doc) => {
        if (doc.id === currentUserId) return;

        const data = doc.data();
        contactsMap[doc.id] = {
          id: doc.id,
          name: (data.firstName + ' ' + data.lastName) || '',
          phone: data.phoneNumber || '',
          email: data.email || '',
          profileImage: data.profileImage || '',
          recentMessage: '',
          hasUnreadMessages: false,
          lastMessageTimestamp: 0,
        };
      });

      if (Object.keys(contactsMap).length === 0) {
        setHasContacts(false);
      } else {
        setHasContacts(true);
      }

      setContacts(Object.values(contactsMap)); // Initial contacts list

      // Set up real-time listeners for messages
      const contactsIds = Object.keys(contactsMap);
      contactsIds.forEach(contactId => {
        const q = query(
          collection(firestore, 'chats', currentUserId, 'messages', contactId, 'messages'),
          orderBy('timestamp', 'desc'),
          limit(1)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const recentMessageDoc = snapshot.docs[0];
            const recentMessageData = recentMessageDoc.data();
            const contact = contactsMap[contactId];
            if (contact) {
              contact.recentMessage = recentMessageData.text || '';
              contact.hasUnreadMessages = !recentMessageData.read && recentMessageData.sender !== currentUserId;
              contact.lastMessageTimestamp = recentMessageData.timestamp?.toMillis() || 0;
              const sortedContacts = Object.values(contactsMap).sort((a, b) => (b.lastMessageTimestamp || 0) - (a.lastMessageTimestamp || 0));
              setContacts(sortedContacts);
            }
          }
        });

        return () => unsubscribe();
      });

    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAllContacts();
  }, [fetchAllContacts]);

  const handleRefresh = async () => {
    await fetchAllContacts();
  };

  const formatDate = (timestamp: number) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const isToday = now.toDateString() === messageDate.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === messageDate.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isYesterday) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Employee }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ChatRoom', { contact: item })}>
      <View style={styles.contactContainer}>
      {item.hasUnreadMessages && <View style={styles.unreadIndicator} />}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageFallback}>
            {item.profileImage ? (
              <Text style={styles.profileImage} />
            ) : (
              <Text style={styles.profileImageText}>{getInitials(item.name)}</Text>
            )}
          </View>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.name}</Text>
          <View style={styles.contactMessageContainer}>
            <Text style={styles.contactMessage}>{item.recentMessage || 'No messages yet'}</Text>
            <Text style={styles.messageDate}>{formatDate(item.lastMessageTimestamp || 0)}</Text>
          </View>
        </View>
        
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Icon name="search" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={
          !hasContacts ? <Text style={styles.emptyMessage}>No contacts available</Text> : null
        }
      />
    </View>
  );
}
