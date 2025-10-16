import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addAnalysis = async (analysisData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Sanitize data to avoid Firestore nested array issues
      const sanitizedData = sanitizeForFirestore(analysisData);
      
      const userId = auth.currentUser?.uid || 'anonymous';
      const docRef = await addDoc(collection(db, 'analyses'), {
        ...sanitizedData,
        timestamp: serverTimestamp(),
        userId: userId,
        userEmail: auth.currentUser?.email || 'anonymous',
        sessionId: Date.now().toString()
      });
      return docRef.id;
    } catch (err) {
      console.error('Firestore error:', err);
      setError(err.message);
      // Don't throw error, just log it for development
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Helper function to sanitize data for Firestore
  const sanitizeForFirestore = (data) => {
    // Deep clone to avoid modifying original data
    const sanitized = JSON.parse(JSON.stringify(data));
    
    // Recursively convert nested arrays to avoid Firestore issues
    const sanitizeObject = (obj) => {
      if (Array.isArray(obj)) {
        // Convert arrays to JSON strings
        return JSON.stringify(obj);
      } else if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (Array.isArray(value)) {
              // Convert arrays to JSON strings
              result[key] = JSON.stringify(value);
            } else if (value !== null && typeof value === 'object') {
              // Recursively sanitize nested objects
              result[key] = sanitizeObject(value);
            } else {
              result[key] = value;
            }
          }
        }
        return result;
      }
      return obj;
    };
    
    return sanitizeObject(sanitized);
  };

  const addChatMessage = async (messageData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Sanitize data to avoid Firestore nested array issues
      const sanitizedData = sanitizeForFirestore(messageData);
      
      const userId = auth.currentUser?.uid || 'anonymous';
      const docRef = await addDoc(collection(db, 'chatHistory'), {
        ...sanitizedData,
        timestamp: serverTimestamp(),
        userId: userId,
        userEmail: auth.currentUser?.email || 'anonymous',
        sessionId: Date.now().toString()
      });
      return docRef.id;
    } catch (err) {
      console.error('Firestore error:', err);
      setError(err.message);
      // Don't throw error, just log it for development
      return null;
    } finally {
      setLoading(false);
    }
  };

  const useAnalyses = () => {
    const [analyses, setAnalyses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const q = query(
        collection(db, 'analyses'),
        orderBy('timestamp', 'desc'),
        limit(10)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAnalyses(data);
        setLoading(false);
      });

      return () => unsubscribe();
    }, []);

    return { analyses, loading };
  };

  const useChatHistory = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const q = query(
        collection(db, 'chatHistory'),
        orderBy('timestamp', 'desc'),
        limit(50)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(data.reverse()); // Reverse to show oldest first
        setLoading(false);
      });

      return () => unsubscribe();
    }, []);

    return { messages, loading };
  };

  return {
    addAnalysis,
    addChatMessage,
    useAnalyses,
    useChatHistory,
    loading,
    error
  };
};
