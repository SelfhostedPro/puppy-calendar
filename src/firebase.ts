import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNmQX8hplxTw7qQOr6CXtJ8kUGsRklPHs",
  authDomain: "puppy-tracker-bolt.firebaseapp.com",
  projectId: "puppy-tracker-bolt",
  storageBucket: "puppy-tracker-bolt.appspot.com",
  messagingSenderId: "339076550103",
  appId: "1:339076550103:web:8b6d6b8b6d6b8b6d6b8b6d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);