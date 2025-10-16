import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyD-ZQ94VQM3QDGRZJuHl3wU2H_0F4JxfoM",
  authDomain: "rahbar-dcd4a.firebaseapp.com",
  projectId: "rahbar-dcd4a",
  storageBucket: "rahbar-dcd4a.firebasestorage.app",
  messagingSenderId: "864346139791",
  appId: "1:864346139791:web:4da0b26bfc6910b40d14fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const functions = getFunctions(app);

export default app;
