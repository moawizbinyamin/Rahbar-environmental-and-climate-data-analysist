import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Clock,
  Target,
  Lightbulb
} from 'lucide-react';

const InsightPanel = ({ analysisData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 rounded-2xl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-earth-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Analysis Yet</h3>
          <p className="text-sm text-gray-500">
            Start a conversation to see environmental insights here
          </p>
        </div>
      </div>
    );
  }

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'Medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'Low': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-earth-50 to-sky-50">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-earth-500" />
          Environmental Insights
        </h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {analysisData.locations?.[0]?.name || analysisData.location || 'Unknown Location'}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {analysisData.time_period || 'Current'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 overflow-y-auto h-full">
        {/* Risk Assessment */}
        {analysisData.llmSummary && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-4 rounded-xl border-2 ${getRiskColor(analysisData.llmSummary.risk_level)}`}
          >
            <div className="flex items-center gap-2 mb-2">
              {getRiskIcon(analysisData.llmSummary.risk_level)}
              <h4 className="font-semibold">Risk Assessment</h4>
            </div>
            <p className="text-sm">{analysisData.llmSummary.summary}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs font-medium">Confidence:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(analysisData.confidence)}`}>
                {analysisData.confidence}
              </span>
            </div>
          </motion.div>
        )}

        {/* Key Metrics */}
        {analysisData.alphaEarthData && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-earth-500" />
              Key Metrics
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              {analysisData.alphaEarthData.riskLevel && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Risk Level</div>
                  <div className="font-semibold text-lg">{analysisData.alphaEarthData.riskLevel}</div>
                </div>
              )}
              
              {analysisData.alphaEarthData.waterLevel && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-xs text-blue-600 mb-1">Water Level</div>
                  <div className="font-semibold text-lg text-blue-800">{analysisData.alphaEarthData.waterLevel}m</div>
                </div>
              )}
              
              {analysisData.alphaEarthData.urbanGrowth && (
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-xs text-orange-600 mb-1">Urban Growth</div>
                  <div className="font-semibold text-lg text-orange-800">{analysisData.alphaEarthData.urbanGrowth}%</div>
                </div>
              )}
              
              {analysisData.alphaEarthData.greenCoverage && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-xs text-green-600 mb-1">Green Coverage</div>
                  <div className="font-semibold text-lg text-green-800">{analysisData.alphaEarthData.greenCoverage}%</div>
                </div>
              )}
              
              {analysisData.alphaEarthData.rainfall && (
                <div className="bg-sky-50 p-3 rounded-lg">
                  <div className="text-xs text-sky-600 mb-1">Rainfall</div>
                  <div className="font-semibold text-lg text-sky-800">{analysisData.alphaEarthData.rainfall}mm</div>
                </div>
              )}
              
              {analysisData.alphaEarthData.aqi && (
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-xs text-purple-600 mb-1">Air Quality Index</div>
                  <div className="font-semibold text-lg text-purple-800">{analysisData.alphaEarthData.aqi}</div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Recommendations */}
        {analysisData.llmSummary?.recommendations && analysisData.llmSummary.recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <Target className="w-4 h-4 text-earth-500" />
              Recommendations
            </h4>
            
            <div className="space-y-2">
              {analysisData.llmSummary.recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-earth-50 rounded-lg border border-earth-200"
                >
                  <div className="w-6 h-6 bg-earth-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700">{recommendation}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analysis Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <h4 className="font-semibold text-gray-800">Analysis Details</h4>
          
          <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Analysis Type:</span>
              <span className="font-medium capitalize">{analysisData.intent}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{analysisData.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time Period:</span>
              <span className="font-medium">{analysisData.time_period || 'Current'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Generated:</span>
              <span className="font-medium">
                {new Date(analysisData.timestamp?.toDate?.() || analysisData.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InsightPanel;
