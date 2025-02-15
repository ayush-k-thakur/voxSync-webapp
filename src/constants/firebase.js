import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyEd0k9risb_SBEBWZmcbwvIsZd7sHRHk",
  authDomain: "lingo-499f3.firebaseapp.com",
  projectId: "lingo-499f3",
  storageBucket: "lingo-499f3.firebasestorage.app",
  messagingSenderId: "771339463457",
  appId: "1:771339463457:web:3203d07ffacc87b8d46c60",
  measurementId: "G-BCJPMVMY2G",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
