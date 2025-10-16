import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD-ZQ94VQM3QDGRZJuHl3wU2H_0F4JxfoM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rahbar-dcd4a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rahbar-dcd4a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rahbar-dcd4a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "864346139791",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:864346139791:web:4da0b26bfc6910b40d14fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const auth = getAuth(app);

export default app;
