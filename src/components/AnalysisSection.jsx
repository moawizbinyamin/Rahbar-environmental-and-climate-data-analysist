import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Map, BarChart3, FileText } from 'lucide-react';
import ChatInterface from './ChatInterface';
import MapVisualization from './MapVisualization';
import ReportSection from './ReportSection';

const AnalysisSection = ({ 
  currentAnalysis, 
  isLoading, 
  darkMode, 
  activeTab, 
  setActiveTab,
  onAnalysisComplete,
  onProcessingStart,
  showChat = true,
  chatCollapsed = false,
  onToggleChatCollapse
}) => {
  return (
    <section className="h-full flex flex-col">
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex rounded-xl p-1 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            {[
              { id: 'map', label: 'Map', icon: Map },
              { id: 'report', label: 'Report', icon: FileText }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? darkMode
                      ? 'bg-gray-700 text-white shadow-lg'
                      : 'bg-white text-gray-900 shadow-lg'
                    : darkMode
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Full Width */}
      <div className="hidden lg:flex flex-1 max-w-7xl mx-auto w-full">
        {/* Map Visualization - Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-1/2 p-4"
        >
          <MapVisualization 
            analysisData={currentAnalysis}
            isLoading={isLoading}
            darkMode={darkMode}
          />
        </motion.div>

        {/* Report Section - Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-1/2 p-4"
        >
          <ReportSection 
            analysisData={currentAnalysis}
            isLoading={isLoading}
            darkMode={darkMode}
          />
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="h-full p-2 sm:p-4"
            >
              <MapVisualization 
                analysisData={currentAnalysis}
                isLoading={isLoading}
                darkMode={darkMode}
              />
            </motion.div>
          )}
          
          {activeTab === 'report' && (
            <motion.div
              key="report"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="h-full p-2 sm:p-4"
            >
              <ReportSection 
                analysisData={currentAnalysis}
                isLoading={isLoading}
                darkMode={darkMode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AnalysisSection;
