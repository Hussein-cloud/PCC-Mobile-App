// Backend/DatabaseConnection/Connector.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Import Firebase Auth
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "********",
  authDomain: "********",
  projectId: "********",
  storageBucket: "********",
  messagingSenderId: "********",
  appId: "********",
  measurementId: "********"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Initialize Firestore

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { firestore, auth }; // Export Firestore and Auth
export default app;
