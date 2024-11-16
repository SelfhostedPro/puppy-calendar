import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBVuvHcJmBrkhy9hvx9ZIOPlHLRupqyq7M",
  authDomain: "puppy-tracker-337fa.firebaseapp.com",
  projectId: "puppy-tracker-337fa",
  storageBucket: "puppy-tracker-337fa.firebasestorage.app",
  messagingSenderId: "617665821592",
  appId: "1:617665821592:web:7e136de8094f6ba5b089ed",
  measurementId: "G-L8F93EXY2R"
};



const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app);