import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Brain, Map, BarChart3, Menu, X, Sun, Moon, Settings, Bell, Search, Wifi, WifiOff } from 'lucide-react';
import WelcomeSection from './components/WelcomeSection';
import AnalysisSection from './components/AnalysisSection';
import ChatInterface from './components/ChatInterface';

function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeTab, setActiveTab] = useState('chat');
  const [chatCollapsed, setChatCollapsed] = useState(false);

  const handleAnalysisComplete = (analysisData) => {
    setCurrentAnalysis(analysisData);
    setIsLoading(false);
  };

  const handleProcessingStart = () => {
    setIsLoading(true);
  };

  // Handle system theme preference and online status
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-earth-50 via-sky-50 to-earth-100'
    }`}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${
          darkMode 
            ? 'bg-gray-900/80 border-gray-700' 
            : 'bg-white/80 border-white/20'
        } backdrop-blur-sm border-b shadow-sm transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-earth-500 to-sky-500 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>Rahbar</h1>
                <p className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Climate Intelligence Console</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Status Indicators */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Brain className={`w-4 h-4 transition-colors duration-300 ${
                    darkMode ? 'text-earth-400' : 'text-earth-500'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Map className={`w-4 h-4 transition-colors duration-300 ${
                    darkMode ? 'text-sky-400' : 'text-sky-500'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Geospatial</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className={`w-4 h-4 transition-colors duration-300 ${
                    darkMode ? 'text-green-400' : 'text-green-500'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Real-time</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Online Status */}
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  isOnline 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  {isOnline ? 'Online' : 'Offline'}
                </div>

                {/* Dark Mode Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    darkMode 
                      ? 'hover:bg-gray-700 text-yellow-400' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>

                {/* Settings */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    darkMode 
                      ? 'hover:bg-gray-700 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Desktop Layout */}
        <div className="h-full flex">
          {/* Chat Interface - Collapsible */}
          <motion.div 
            className={`border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
              chatCollapsed ? 'w-16' : 'w-full lg:w-1/3'
            }`}
            animate={{ width: chatCollapsed ? '4rem' : '33.333333%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ChatInterface 
              onAnalysisComplete={handleAnalysisComplete}
              onProcessingStart={handleProcessingStart}
              darkMode={darkMode}
              collapsed={chatCollapsed}
              onToggleCollapse={() => setChatCollapsed(!chatCollapsed)}
            />
          </motion.div>
          
          {/* Right Panel - Analysis or Welcome */}
          <div className={`hidden lg:flex transition-all duration-300 ${
            chatCollapsed ? 'w-[calc(100%-4rem)]' : 'w-2/3'
          }`}>
            {!currentAnalysis ? (
              <div className="w-full flex items-center justify-center">
                <WelcomeSection darkMode={darkMode} />
              </div>
            ) : (
              <AnalysisSection
                currentAnalysis={currentAnalysis}
                isLoading={isLoading}
                darkMode={darkMode}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onAnalysisComplete={handleAnalysisComplete}
                onProcessingStart={handleProcessingStart}
                showChat={false}
                chatCollapsed={chatCollapsed}
                onToggleChatCollapse={() => setChatCollapsed(!chatCollapsed)}
              />
            )}
          </div>
        </div>
        
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {!currentAnalysis ? (
            <WelcomeSection darkMode={darkMode} />
          ) : (
            <AnalysisSection
              currentAnalysis={currentAnalysis}
              isLoading={isLoading}
              darkMode={darkMode}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onAnalysisComplete={handleAnalysisComplete}
              onProcessingStart={handleProcessingStart}
              showChat={true}
              chatCollapsed={chatCollapsed}
              onToggleChatCollapse={() => setChatCollapsed(!chatCollapsed)}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`${
          darkMode 
            ? 'bg-gray-900/60 border-gray-700' 
            : 'bg-white/60 border-white/20'
        } backdrop-blur-sm border-t transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className={`flex flex-col sm:flex-row items-center justify-between text-sm gap-4 transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <div className="text-center sm:text-left">
              © 2024 Rahbar Climate Intelligence Platform. Powered by AI and real-time environmental data.
            </div>
            <div className="flex items-center gap-4">
              <span>Status: {isOnline ? 'Online' : 'Offline'}</span>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`p-8 rounded-2xl shadow-2xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                />
                <span className={`text-lg font-medium transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Analyzing...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
