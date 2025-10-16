import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, MapPin, AlertTriangle, CheckCircle, Paperclip, Smile, MoreVertical, Bot, User, Loader2, ChevronLeft, ChevronRight, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirestore } from '../hooks/useFirestore';
import { llmService } from '../services/llmService';
import { alphaEarthService } from '../services/alphaEarthService';
import { climateAnalysisService } from '../services/climateAnalysisService';

const ChatInterface = ({ onAnalysisComplete, onProcessingStart, darkMode = false, collapsed = false, onToggleCollapse }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const messagesEndRef = useRef(null);
  const { addChatMessage, addAnalysis } = useFirestore();

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsProcessing(true);

    // Add user message to chat
    const userMsg = {
      role: 'user',
      message: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    await addChatMessage(userMsg);

    try {
      // Step 1: Interpret user intent
      const intent = await llmService.interpretUserIntent(userMessage);
      
      // Add system message showing intent interpretation
      const intentMsg = {
        role: 'system',
        message: `Analyzing: ${intent.query_summary} for ${intent.location}`,
        timestamp: new Date(),
        intent: intent
      };
      setMessages(prev => [...prev, intentMsg]);

      // Step 2: Fetch AlphaEarth data
      const alphaEarthData = await alphaEarthService.fetchData(
        intent.intent,
        intent.location,
        intent.time_period
      );

      // Step 3: Get Real Climate Analysis for specialized climate modeling
      let climateAnalysis = null;
      if (intent.disaster_type === 'flood') {
        climateAnalysis = await climateAnalysisService.analyzeFloodRisk(
          intent.location,
          intent.time_period
        );
      } else if (intent.disaster_type === 'urban_expansion') {
        climateAnalysis = await climateAnalysisService.analyzeUrbanExpansion(
          intent.location,
          intent.time_period
        );
      } else if (intent.disaster_type === 'green_expansion') {
        climateAnalysis = await climateAnalysisService.analyzeGreenExpansion(
          intent.location,
          intent.time_period
        );
      }

      // Step 4: Generate insights with Real Climate Analysis and geospatial data
      const insights = await llmService.generateInsight(
        alphaEarthData,
        userMessage,
        climateAnalysis
      );

      // Step 5: Save analysis to Firestore
      const analysisData = {
        intent: intent.intent,
        location: intent.location,
        time_period: intent.time_period || 'current',
        userMessage: userMessage,
        alphaEarthData: alphaEarthData,
        climateAnalysis: climateAnalysis,
        llmSummary: insights,
        confidence: intent.confidence,
        disaster_type: intent.disaster_type,
        urgency: intent.urgency
      };
      
      // Step 5: Save analysis to Firestore (optional, won't break if it fails)
      try {
        await addAnalysis(analysisData);
      } catch (error) {
        console.log('Analysis saved locally (Firestore unavailable)');
      }

      // Step 6: Add assistant response
      const assistantMsg = {
        role: 'assistant',
        message: insights.summary,
        timestamp: new Date(),
        insights: insights,
        analysisData: analysisData
      };
      setMessages(prev => [...prev, assistantMsg]);
      
      // Save chat message (optional, won't break if it fails)
      try {
        await addChatMessage(assistantMsg);
      } catch (error) {
        console.log('Chat message saved locally (Firestore unavailable)');
      }

      // Notify parent component
      onAnalysisComplete(analysisData);

    } catch (error) {
      console.error('Error processing message:', error);
      const errorMsg = {
        role: 'assistant',
        message: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'High':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'Medium':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'Low':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  // Chat dropdown interface
  return (
    <div className={`flex flex-col h-full backdrop-blur-sm rounded-2xl shadow-xl transition-colors duration-300 ${
      darkMode ? 'bg-gray-800/90' : 'bg-white/90'
    }`}>
      {/* Chat Header */}
      <div className={`p-4 border-b transition-colors duration-300 ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-xl font-semibold flex items-center gap-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-5 h-5"
              >
                <Bot className={`w-5 h-5 transition-colors duration-300 ${
                  darkMode ? 'text-earth-400' : 'text-earth-500'
                }`} />
              </motion.div>
              Rahbar Assistant
            </h2>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Ask me about climate, environment, or disaster data</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleCollapse}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              darkMode 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Close Chat"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === 'user' 
                    ? 'bg-blue-500' 
                    : darkMode 
                      ? 'bg-gray-700' 
                      : 'bg-gray-100'
                }`}>
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  )}
                </div>
                
                {/* Message Bubble */}
                <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                  msg.role === 'user'
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-100'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                
                  {msg.insights && (
                    <div className={`mt-2 pt-2 border-t ${
                      msg.role === 'user' 
                        ? 'border-blue-400/30' 
                        : darkMode 
                          ? 'border-gray-600' 
                          : 'border-gray-300'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {getRiskIcon(msg.insights.risk_level)}
                        <span className={`text-xs font-medium ${
                          msg.role === 'user' 
                            ? 'text-blue-100' 
                            : darkMode 
                              ? 'text-gray-300' 
                              : 'text-gray-700'
                        }`}>
                          Risk: {msg.insights.risk_level}
                        </span>
                      </div>
                      {msg.insights.recommendations && msg.insights.recommendations.length > 0 && (
                        <div className={`text-xs ${
                          msg.role === 'user' 
                            ? 'text-blue-100' 
                            : darkMode 
                              ? 'text-gray-400' 
                              : 'text-gray-600'
                        }`}>
                          <strong>Recommendations:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {msg.insights.recommendations.slice(0, 2).map((rec, i) => (
                              <li key={i}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                
                  {msg.intent && (
                    <div className={`mt-2 pt-2 border-t ${
                      msg.role === 'user' 
                        ? 'border-blue-400/30' 
                        : darkMode 
                          ? 'border-gray-600' 
                          : 'border-gray-300'
                    }`}>
                      <div className={`text-xs ${
                        msg.role === 'user' 
                          ? 'text-blue-100' 
                          : darkMode 
                            ? 'text-gray-400' 
                            : 'text-gray-500'
                      }`}>
                        <span className="font-medium">Intent:</span> {msg.intent.intent} | 
                        <span className="font-medium"> Confidence:</span> {msg.intent.confidence}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className={`flex items-start gap-3 max-w-[80%]`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <Bot className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              </div>
              <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Analyzing...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t transition-colors duration-300 ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about flood risk, urban growth, air quality..."
              className={`w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              rows="2"
              disabled={isProcessing}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-xl transition-colors duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              disabled={isProcessing}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isProcessing}
              className="p-3 bg-earth-500 hover:bg-earth-600 text-white rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        <div className={`mt-2 text-xs text-center transition-colors duration-300 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Try: "Show me flood risk for Lahore this week" or "How much green area did Karachi lose?"
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
