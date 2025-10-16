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

  const { queryType, analysis } = analysisData;

  // Extract case-specific data from LLM response
  const getCaseData = () => {
    // Get case-specific metrics from LLM analysis
    const caseMetrics = analysis.case_specific_metrics || {};
    const environmentalFactors = analysis.environmental_factors || {};
    const projections = analysis.projections || {};
    
    return {
      metrics: caseMetrics,
      factors: environmentalFactors,
      projections: projections
    };
  };

  const caseData = getCaseData();

  // Case-specific metrics and visualizations
  const renderCaseSpecificMetrics = () => {
    switch (queryType) {
      case 'flood_analysis':
        // Get flood-specific data from LLM
        const floodData = caseData.metrics.flood || caseData.factors.flood || {};
        const waterLevel = floodData.water_level_rise || floodData.water_level || '1.5-3.0m';
        const rainfall = floodData.rainfall || floodData.expected_rainfall || '60-120mm';
        const drainage = floodData.drainage_capacity || floodData.drainage || '55-65%';
        const evacuation = floodData.evacuation_time || floodData.evacuation_window || '4-8hrs';
        const season = floodData.season || floodData.time_period || 'monsoon season (July-September)';
        
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
                Expected conditions during {season}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Water Level Rise
                </p>
                <p className="text-xl font-bold text-blue-600">{waterLevel}</p>
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
                <p className="text-xl font-bold text-blue-600">{rainfall}</p>
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
                <p className="text-xl font-bold text-orange-600">{drainage}</p>
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
                <p className="text-xl font-bold text-red-600">{evacuation}</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Safe response time
                </p>
              </div>
            </div>
          </motion.div>
        );

      case 'urban_expansion':
        // Get urban expansion data from LLM
        const urbanData = caseData.metrics.urban || caseData.factors.urban_expansion || {};
        const growthRate = urbanData.growth_rate || urbanData.annual_growth || '10-14%';
        const newDevelopment = urbanData.new_development || urbanData.expansion_area || '120-170km²';
        const populationDensity = urbanData.population_density || urbanData.density || '7.5-9.5K/km²';
        const greenLoss = urbanData.green_space_loss || urbanData.environmental_impact || '-15-22%';
        const context = urbanData.context || 'current development patterns';
        
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
                Projected trends based on {context}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Annual Growth Rate
                </p>
                <p className="text-xl font-bold text-purple-600">{growthRate}</p>
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
                <p className="text-xl font-bold text-purple-600">{newDevelopment}</p>
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
                <p className="text-xl font-bold text-blue-600">{populationDensity}</p>
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
                <p className="text-xl font-bold text-orange-600">{greenLoss}</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Expected loss
                </p>
              </div>
            </div>
          </motion.div>
        );

      case 'deforestation':
        // Get deforestation data from LLM
        const forestData = caseData.metrics.deforestation || caseData.factors.forest || {};
        const forestLoss = forestData.annual_loss || forestData.forest_loss || '700-950km²';
        const coverage = forestData.coverage || forestData.current_coverage || '38-45%';
        const carbonImpact = forestData.carbon_impact || forestData.co2_emissions || '1.8-2.5M tons';
        const speciesRisk = forestData.species_affected || forestData.biodiversity_impact || '140-170';
        const timePeriod = forestData.time_period || forestData.analysis_period || '2015-2025';
        
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
                Historical trends and projected impacts ({timePeriod})
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Annual Forest Loss
                </p>
                <p className="text-xl font-bold text-red-600">{forestLoss}</p>
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
                <p className="text-xl font-bold text-green-600">{coverage}</p>
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
                <p className="text-xl font-bold text-yellow-600">{carbonImpact}</p>
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
                <p className="text-xl font-bold text-orange-600">{speciesRisk}</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Threatened species
                </p>
              </div>
            </div>
          </motion.div>
        );

      case 'air_pollution':
        // Get air pollution data from LLM
        const airData = caseData.metrics.air_pollution || caseData.factors.air_quality || {};
        const aqiRange = airData.aqi || airData.aqi_range || '200-300';
        const pm25 = airData.pm25 || airData.pm25_levels || '150-220 µg/m³';
        const visibility = airData.visibility || airData.visibility_range || '1.5-3.5 km';
        const healthImpact = airData.health_impact || airData.health_risk || 'High-Severe';
        const airSeason = airData.season || airData.time_period || 'winter season (November-February)';
        
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
                Typical conditions during {airSeason}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AQI Range
                </p>
                <p className="text-xl font-bold text-red-600">{aqiRange}</p>
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
                <p className="text-xl font-bold text-orange-600">{pm25}</p>
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
                <p className="text-xl font-bold text-yellow-600">{visibility}</p>
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
                <p className="text-xl font-bold text-red-600">{healthImpact}</p>
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
