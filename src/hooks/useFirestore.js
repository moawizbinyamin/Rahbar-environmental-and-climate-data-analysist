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
import { db } from '../firebase/config';

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addAnalysis = async (analysisData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Sanitize data to avoid Firestore nested array issues
      const sanitizedData = sanitizeForFirestore(analysisData);
      
      const docRef = await addDoc(collection(db, 'analyses'), {
        ...sanitizedData,
        timestamp: serverTimestamp(),
        userId: 'anonymous', // For free plan without auth
        sessionId: Date.now().toString() // Unique session identifier
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
    const sanitized = { ...data };
    
    // Convert nested arrays to strings to avoid Firestore issues
    if (sanitized.alphaEarthData?.geospatialData) {
      sanitized.alphaEarthData.geospatialData = JSON.stringify(sanitized.alphaEarthData.geospatialData);
    }
    
    if (sanitized.deepMindAnalysis?.neural_network_analysis) {
      sanitized.deepMindAnalysis.neural_network_analysis = JSON.stringify(sanitized.deepMindAnalysis.neural_network_analysis);
    }
    
    if (sanitized.deepMindAnalysis?.computer_vision_analysis) {
      sanitized.deepMindAnalysis.computer_vision_analysis = JSON.stringify(sanitized.deepMindAnalysis.computer_vision_analysis);
    }
    
    if (sanitized.deepMindAnalysis?.satellite_imagery_analysis) {
      sanitized.deepMindAnalysis.satellite_imagery_analysis = JSON.stringify(sanitized.deepMindAnalysis.satellite_imagery_analysis);
    }
    
    return sanitized;
  };

  const addChatMessage = async (messageData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Sanitize data to avoid Firestore nested array issues
      const sanitizedData = sanitizeForFirestore(messageData);
      
      const docRef = await addDoc(collection(db, 'chatHistory'), {
        ...sanitizedData,
        timestamp: serverTimestamp(),
        userId: 'anonymous', // For free plan without auth
        sessionId: Date.now().toString() // Unique session identifier
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
