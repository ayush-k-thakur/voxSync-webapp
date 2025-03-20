import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIt7JXKv2L2Yk8E-Ze-TZz_Fl2BmlFWgM",
  authDomain: "voxsync-8d0c4.firebaseapp.com",
  projectId: "voxsync-8d0c4",
  storageBucket: "voxsync-8d0c4.firebasestorage.app",
  messagingSenderId: "390366119534",
  appId: "1:390366119534:web:b2e94033b0f8156bba887f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;