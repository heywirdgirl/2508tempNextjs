
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';
import { app } from './config';

const auth = getAuth(app);

export const signUp = (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = (): Promise<void> => {
  return signOut(auth);
};
