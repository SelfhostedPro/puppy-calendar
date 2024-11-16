import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.FB_apiKey,
  authDomain: import.meta.env.FB_authDomain,
  projectId: import.meta.env.FB_projectId,
  storageBucket: import.meta.env.FB_storageBucket,
  messagingSenderId: import.meta.env.FB_messagingSenderId,
  appId: import.meta.env.FB_appId,
  measurementId: import.meta.env.FB_measurementId
};



const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app);