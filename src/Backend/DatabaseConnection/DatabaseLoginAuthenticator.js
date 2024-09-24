import { auth } from './DataBaseAuth'; // Import Firebase Authentication
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'; // Import Firestore functions
import * as Notifications from 'expo-notifications'; // Import Expo Notifications
import Constants from 'expo-constants';

/**
 * Logs in a user with email and password, retrieves user data, asks for notification permissions, stores the Expo push token, and navigates to the main app screen.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {function} setLoading - State setter to manage loading state.
 * @param {function} setError - State setter to manage error messages.
 * @param {object} navigation - Navigation object for navigating between screens.
 */
export const login = async (email, password, setLoading, setError, navigation) => {
  setLoading(true);
  setError("");

  const db = getFirestore(); // Initialize Firestore

  try {
    // Authenticate the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Check for notification permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // If permissions haven't been granted yet, ask for them
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Throw an error if notifications permission is denied
    if (finalStatus !== 'granted') {
      throw new Error('Notification permissions denied');
    }

    // Get Expo push token
    if (!Constants?.expoConfig?.extra?.eas?.projectId && !Constants?.easConfig?.projectId) {
      throw new Error('Project ID is missing in expoConfig or easConfig.');
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync({ projectId });

    if (!expoPushToken) {
      throw new Error('Failed to obtain Expo push token');
    }

    // Correct Firestore document reference
    const userDocRef = doc(db, 'EmployeeTable', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('User Data:', userData);

      // Update Firestore with Expo push token
      await updateDoc(userDocRef, {
        pushToken: expoPushToken, // Ensure this field is correctly set or created
      });

      // Handle navigation based on user data
      navigation.reset({
        index: 0,
        routes: [
          { 
            name: 'App', 
            state: {
              routes: [
                {
                  name: 'Pest Control Center',
                  params: { isAdmin: userData.isAdmin }
                }
              ]
            }
          }
        ]
      });

      console.log('Authenticated and push token stored successfully');
    } else {
      setError('User data not found!');
      console.log('User data not found!');
    }
  } catch (error) {
    setError('Authentication failed: ' + error.message);
    console.error('Authentication failed:', error.message);
  } finally {
    setLoading(false);
  }
};
