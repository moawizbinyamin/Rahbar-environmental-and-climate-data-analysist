import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle,
  MapPin,
  Clock,
  Target,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Info,
  FileText,
  BarChart3,
  Activity,
  Droplet,
  Building2,
  Trees,
  Wind
} from 'lucide-react';

const CaseSpecificReport = ({ analysisData, darkMode = false }) => {
  if (!analysisData || !analysisData.analysis) {
    return null;
  }

  const { queryType } = analysisData;

  // Case-specific metrics and visualizations
  const renderCaseSpecificMetrics = () => {
    switch (queryType) {
      case 'flood_analysis':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <h4 className={`text-sm font-semibold flex items-center gap-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <Droplet className="w-4 h-4 text-blue-500" />
              Flood-Specific Metrics
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Water Level Rise
                </p>
                <p className="text-2xl font-bold text-blue-600">2.5m</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Rainfall Expected
                </p>
                <p className="text-2xl font-bold text-blue-600">85mm</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Drainage Capacity
                </p>
                <p className="text-2xl font-bold text-orange-600">60%</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Evacuation Time
                </p>
                <p className="text-2xl font-bold text-red-600">6hrs</p>
              </div>
            </div>
          </motion.div>
        );

      case 'urban_expansion':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <h4 className={`text-sm font-semibold flex items-center gap-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <Building2 className="w-4 h-4 text-purple-500" />
              Urban Development Metrics
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Annual Growth Rate
                </p>
                <p className="text-2xl font-bold text-purple-600">12%</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  New Infrastructure
                </p>
                <p className="text-2xl font-bold text-purple-600">145km²</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Population Density
                </p>
                <p className="text-2xl font-bold text-blue-600">8.5K/km²</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Green Space Loss
                </p>
                <p className="text-2xl font-bold text-orange-600">-18%</p>
              </div>
            </div>
          </motion.div>
        );

      case 'deforestation':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <h4 className={`text-sm font-semibold flex items-center gap-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <Trees className="w-4 h-4 text-green-500" />
              Forest & Vegetation Metrics
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Forest Cover Lost
                </p>
                <p className="text-2xl font-bold text-red-600">-850km²</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Remaining Coverage
                </p>
                <p className="text-2xl font-bold text-green-600">42%</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Carbon Impact
                </p>
                <p className="text-2xl font-bold text-yellow-600">2.1M tons</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Species Affected
                </p>
                <p className="text-2xl font-bold text-orange-600">156</p>
              </div>
            </div>
          </motion.div>
        );

      case 'air_pollution':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <h4 className={`text-sm font-semibold flex items-center gap-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <Wind className="w-4 h-4 text-gray-500" />
              Air Quality Metrics
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AQI Index
                </p>
                <p className="text-2xl font-bold text-red-600">245</p>
                <p className="text-xs text-red-600 font-medium">Hazardous</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  PM2.5 Level
                </p>
                <p className="text-2xl font-bold text-orange-600">185 µg/m³</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Visibility
                </p>
                <p className="text-2xl font-bold text-yellow-600">2.5 km</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Health Risk
                </p>
                <p className="text-2xl font-bold text-red-600">Severe</p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-4">
      {renderCaseSpecificMetrics()}
    </div>
  );
};

export default CaseSpecificReport;
