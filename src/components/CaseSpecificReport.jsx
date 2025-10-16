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
              Flood Risk Projections
            </h4>
            
            <div className={`mb-3 p-2 rounded-lg ${
              darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <p className={`text-xs italic ${
                darkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                Expected conditions during monsoon season (July-September)
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Water Level Rise
                </p>
                <p className="text-xl font-bold text-blue-600">1.5-3.0m</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Typical range
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Expected Rainfall
                </p>
                <p className="text-xl font-bold text-blue-600">60-120mm</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Per event
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Drainage Capacity
                </p>
                <p className="text-xl font-bold text-orange-600">55-65%</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Current infrastructure
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Evacuation Window
                </p>
                <p className="text-xl font-bold text-red-600">4-8hrs</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Safe response time
                </p>
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
              Urban Development Projections
            </h4>
            
            <div className={`mb-3 p-2 rounded-lg ${
              darkMode ? 'bg-purple-900/20' : 'bg-purple-50'
            }`}>
              <p className={`text-xs italic ${
                darkMode ? 'text-purple-300' : 'text-purple-700'
              }`}>
                Projected trends based on current development patterns
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Annual Growth Rate
                </p>
                <p className="text-xl font-bold text-purple-600">10-14%</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Historical average
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  New Development
                </p>
                <p className="text-xl font-bold text-purple-600">120-170km²</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Annual expansion
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Population Density
                </p>
                <p className="text-xl font-bold text-blue-600">7.5-9.5K/km²</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Urban core areas
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Green Space Impact
                </p>
                <p className="text-xl font-bold text-orange-600">-15-22%</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Expected loss
                </p>
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
              Forest & Vegetation Analysis
            </h4>
            
            <div className={`mb-3 p-2 rounded-lg ${
              darkMode ? 'bg-green-900/20' : 'bg-green-50'
            }`}>
              <p className={`text-xs italic ${
                darkMode ? 'text-green-300' : 'text-green-700'
              }`}>
                Historical trends and projected impacts (2015-2025)
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Annual Forest Loss
                </p>
                <p className="text-xl font-bold text-red-600">700-950km²</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Per year
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Current Coverage
                </p>
                <p className="text-xl font-bold text-green-600">38-45%</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Of total area
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Carbon Impact
                </p>
                <p className="text-xl font-bold text-yellow-600">1.8-2.5M tons</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  CO₂ released annually
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Species at Risk
                </p>
                <p className="text-xl font-bold text-orange-600">140-170</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Threatened species
                </p>
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
              Air Quality Analysis
            </h4>
            
            <div className={`mb-3 p-2 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <p className={`text-xs italic ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Typical conditions during winter season (November-February)
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AQI Range
                </p>
                <p className="text-xl font-bold text-red-600">200-300</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Unhealthy to Hazardous
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  PM2.5 Levels
                </p>
                <p className="text-xl font-bold text-orange-600">150-220 µg/m³</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Peak season average
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Visibility Range
                </p>
                <p className="text-xl font-bold text-yellow-600">1.5-3.5 km</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  During smog episodes
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Health Impact
                </p>
                <p className="text-xl font-bold text-red-600">High-Severe</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Sensitive groups affected
                </p>
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
