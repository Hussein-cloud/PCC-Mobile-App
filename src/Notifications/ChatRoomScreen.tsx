import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, Linking, Alert } from 'react-native';
import { collection, addDoc, query, onSnapshot, orderBy, getDocs, writeBatch, doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../Backend/DatabaseConnection/DataBaseAuth'; 
import { useRoute } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 
import { formatDistanceToNow } from 'date-fns';
import * as Notifications from 'expo-notifications';

interface Message {
  id: string;
  text: string;
  sender: string;
  senderName: string;
  timestamp: any;
  read?: boolean;
}

async function sendPushNotification(expoPushToken: string, senderName: string, messageText: string, contactId: string) {
    const notification = {
      to: expoPushToken,
      sound: 'default',
      title: 'Pest Control Center',
      body: `${senderName}: ${messageText}`,
      data: { contactId },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    });
}

export default function ChatRoomScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);
  const { contact } = route.params as { contact: { id: string, name: string, phone: string } };

  useEffect(() => {
    const q = query(
      collection(firestore, 'chats', auth.currentUser?.uid, 'messages', contact.id, 'messages'), 
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const messagesList: Message[] = [];
      const batch = writeBatch(firestore);
      
      snapshot.forEach((doc) => {
        messagesList.push({
          id: doc.id,
          ...doc.data(),
        } as Message);

        if (doc.data().sender !== auth.currentUser?.uid && !doc.data().read) {
          batch.update(doc.ref, { read: true });
        }
      });
      
      await batch.commit();
      setMessages(messagesList);
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    return unsubscribe;
  }, [contact.id]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const currentUserId = auth.currentUser?.uid;
      if (!currentUserId) return;

      const senderDocRef = doc(firestore, 'EmployeeTable', currentUserId);
      const senderDoc = await getDoc(senderDocRef);

      let senderName = 'Anonymous'; 
      if (senderDoc.exists()) {
        const senderData = senderDoc.data();
        senderName = senderData?.firstName + ' ' + senderData?.lastName || 'Anonymous';
      }

      const messageData = {
        text: newMessage,
        sender: currentUserId,
        senderName: senderName,
        timestamp: new Date(),
        read: false,
      };

      const userChatRef = collection(firestore, 'chats', currentUserId, 'messages', contact.id, 'messages');
      const contactChatRef = collection(firestore, 'chats', contact.id, 'messages', currentUserId, 'messages');

      await Promise.all([
        addDoc(userChatRef, messageData),
        addDoc(contactChatRef, messageData),
      ]);

      const contactDocRef = doc(firestore, 'EmployeeTable', contact.id);
      const contactDoc = await getDoc(contactDocRef);

      if (contactDoc.exists()) {
        const contactData = contactDoc.data();
        const expoPushToken = contactData?.pushToken;

        if (expoPushToken) {
          await sendPushNotification(expoPushToken, senderName, newMessage, contact.id);
        } else {
          console.log('Recipient does not have a push token.');
        }
      } else {
        console.log('Recipient not found in EmployeeTable.');
      }

      setNewMessage('');
    }
  };

  const handleCall = () => {
    const phoneNumber = contact.phone;
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const handleClearChat = async () => {
    Alert.alert(
      "Clear Chat",
      "Are you sure you want to clear this chat?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            const batch = writeBatch(firestore);

            const userChatRef = collection(firestore, 'chats', auth.currentUser?.uid, 'messages', contact.id, 'messages');
            const userMessages = await getDocs(userChatRef);
            userMessages.forEach((doc) => {
              batch.delete(doc.ref);
            });

            const contactChatRef = collection(firestore, 'chats', contact.id, 'messages', auth.currentUser?.uid, 'messages');
            const contactMessages = await getDocs(contactChatRef);
            contactMessages.forEach((doc) => {
              batch.delete(doc.ref);
            });

            await batch.commit();
            setMessages([]);
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isSender = item.sender === auth.currentUser?.uid;
    const isRead = item.read;

    return (
      <View style={[ 
        styles.messageContainer, 
        isSender ? styles.sentMessage : styles.receivedMessage,
        !isRead && !isSender ? styles.unreadMessage : null
      ]}>
        <Text style={[styles.sentMessageText, isSender && Platform.OS === 'ios'? styles.sentMessageText : styles.receivedMessageText]}>
          {item.text}
        </Text>

        <Text style={[styles.timestamp, isSender?  styles.senttimestamp: styles.timestamp]}>{formatDistanceToNow(new Date(item.timestamp.toDate()), { addSuffix: true })}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{contact.name}</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleCall}>
              <Ionicons name="call" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClearChat}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.messagesList}
          ref={flatListRef}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message"
            style={styles.input}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: newMessage.trim() === '' ? '#ccc' : 'red' }
            ]}
            onPress={handleSendMessage}
            disabled={newMessage.trim() === ''}
          >
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#e3e1e1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 70, // Increased height for a larger header
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'black',
    fontSize: 20, // Increased font size
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messagesList: {
    flex: 1,
    padding: 15, // Slightly more padding for better spacing
  },
  messageContainer: {
    marginBottom: 15, // Increased margin for more space between messages
    maxWidth: '85%', // Increased max width for larger message bubbles
    borderRadius: 15, // Larger border radius for rounder bubbles
    padding: 15, // More padding inside the bubbles
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'gray',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  unreadMessage: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  sentMessageText: {
    color: 'white',
    fontSize: 16, // Increased font size for sent messages
  },
  receivedMessageText: {
    color: 'black',
    fontSize: 16, // Increased font size for received messages
  },
  timestamp: {
    fontSize: 14, // Slightly larger timestamp
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
  },
  senttimestamp: {
    fontSize: 14, // Slightly larger timestamp
    color: '#c9c7c8',
    textAlign: 'right',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginBottom:0,
  },
  input: {
    flex: 1,
    height: 50, // Taller input field
    backgroundColor: '#f0f0f0',
    borderRadius: 25, // More rounded input field
    paddingHorizontal: 15, // More padding inside the input field
    marginRight: 10,
  },
  sendButton: {
    width: 50, // Larger send button
    height: 50, // Larger send button
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

