// src/components/HomeContainer/utils/fetchData.js
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, firestore } from '../../../../../Backend/DatabaseConnection/DataBaseAuth';

const fetchData = async (setTasks, setTechnicianName, setError, filterAndSortTasks, setLoading, setRefreshing) => {
  setLoading(true);
  try {
    const user = auth.currentUser;
    if (user) {
      const technicianDocRef = doc(firestore, 'EmployeeTable', user.uid);
      const technicianDoc = await getDoc(technicianDocRef);

      if (technicianDoc.exists()) {
        const technicianData = technicianDoc.data();
        setTechnicianName(`${technicianData.firstName} ${technicianData.lastName}`);
      } else {
        console.log('No such document!');
      }

      const agendaCollectionRef = collection(firestore, 'AgendaTable');
      const q = query(agendaCollectionRef, where('assigneeId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const taskList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            agendaType: data.agendaType,
            customer: data.customerName,
            phoneNumber: data.customerPhoneNumber,
            address: data.address,
            assignee: data.assignee,
            date: data.date,
          };
        });
        const filteredAndSortedTasks = filterAndSortTasks(taskList);
        setTasks(filteredAndSortedTasks);
      } else {
        console.log('No tasks found for this user.');
        setTasks([]);
      }
    } else {
      setError('No user is currently signed in.');
      setTasks([]);
    }
  } catch (error) {
    setError('Error fetching data: ' + error.message);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

export default fetchData;
