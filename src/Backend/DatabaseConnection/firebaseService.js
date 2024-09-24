import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

export const getDataFromFirestore = async (collectionName, docId = null) => {
  const db = getFirestore();

  try {
    if (docId) {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error("No such document!");
      }
    } else {
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return data;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};
