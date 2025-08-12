
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  orderBy,
} from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Timestamp;
  userId: string;
}

export const addTask = (userId: string, text: string) => {
  return addDoc(collection(db, 'tasks'), {
    userId,
    text,
    completed: false,
    createdAt: serverTimestamp(),
  });
};

export const getTasks = async (userId: string): Promise<Task[]> => {
  const q = query(collection(db, 'tasks'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
};

export const updateTask = (taskId: string, updates: Partial<Pick<Task, 'text' | 'completed'>>) => {
  const taskDoc = doc(db, 'tasks', taskId);
  return updateDoc(taskDoc, updates);
};

export const deleteTask = (taskId: string) => {
  const taskDoc = doc(db, 'tasks', taskId);
  return deleteDoc(taskDoc);
};
