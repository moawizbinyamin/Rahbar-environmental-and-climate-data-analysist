import React from 'react';
import { motion } from 'framer-motion';

const WelcomeSection = ({ darkMode }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Welcome to Rahbar
          </h1>
          <h2 className={`text-2xl md:text-3xl font-semibold mb-4 transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Climate Intelligence Console
          </h2>
          <p className={`text-lg md:text-xl max-w-4xl mx-auto transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Your conversational AI assistant for environmental and climate data analysis. 
            Simply ask questions about flood risks, urban growth, air quality, and more.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className={`${
              darkMode 
                ? 'bg-gray-800/60 border-gray-700' 
                : 'bg-white/60 border-white/20'
            } backdrop-blur-sm rounded-2xl p-8 shadow-xl border transition-all duration-300 hover:shadow-2xl`}
          >
            <div className="text-4xl mb-4">🌊</div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              darkMode ? 'text-earth-300' : 'text-earth-800'
            }`}>Flood Risk Analysis</h3>
            <p className={`text-sm mb-4 transition-colors duration-300 ${
              darkMode ? 'text-earth-400' : 'text-earth-600'
            }`}>
              Real-time flood risk assessment using weather data, elevation, and historical patterns.
            </p>
            <div className={`text-xs p-2 rounded-lg transition-colors duration-300 ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              "Show me flood risk for Lahore this week"
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className={`${
              darkMode 
                ? 'bg-gray-800/60 border-gray-700' 
                : 'bg-white/60 border-white/20'
            } backdrop-blur-sm rounded-2xl p-8 shadow-xl border transition-all duration-300 hover:shadow-2xl`}
          >
            <div className="text-4xl mb-4">🏙️</div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              darkMode ? 'text-sky-300' : 'text-sky-800'
            }`}>Urban Expansion</h3>
            <p className={`text-sm mb-4 transition-colors duration-300 ${
              darkMode ? 'text-sky-400' : 'text-sky-600'
            }`}>
              Track urban growth patterns, building density, and infrastructure development.
            </p>
            <div className={`text-xs p-2 rounded-lg transition-colors duration-300 ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              "How much green area did Karachi lose?"
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className={`${
              darkMode 
                ? 'bg-gray-800/60 border-gray-700' 
                : 'bg-white/60 border-white/20'
            } backdrop-blur-sm rounded-2xl p-8 shadow-xl border transition-all duration-300 hover:shadow-2xl`}
          >
            <div className="text-4xl mb-4">🌱</div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              darkMode ? 'text-green-300' : 'text-green-800'
            }`}>Green Expansion</h3>
            <p className={`text-sm mb-4 transition-colors duration-300 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`}>
              Monitor vegetation health, green space coverage, and environmental quality.
            </p>
            <div className={`text-xs p-2 rounded-lg transition-colors duration-300 ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              "What's the air quality in Islamabad?"
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
            darkMode 
              ? 'bg-gray-800 text-gray-300 border border-gray-700' 
              : 'bg-white text-gray-600 border border-gray-200'
          }`}>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>AI-Powered • Real-Time Data • Climate Intelligence</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WelcomeSection;
