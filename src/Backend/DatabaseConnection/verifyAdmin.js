import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './DataBaseAuth';


export const checkIsAdmin = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return false; // No user is signed in
    }

    const userDocRef = doc(firestore, 'EmployeeTable', currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data().isAdmin || false;
    }
    
    return false; // User document does not exist or does not have `isAdmin` field
  } catch (error) {
    console.error("Error checking admin status: ", error);
    return false;
  }
};
