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
  Activity
} from 'lucide-react';

const ReportSection = ({ analysisData, darkMode = false }) => {
  if (!analysisData || !analysisData.analysis) {
    return (
      <div className={`h-full flex items-center justify-center rounded-2xl ${
        darkMode ? 'bg-gray-800/90' : 'bg-white/90'
      }`}>
        <div className="text-center">
          <FileText className={`w-12 h-12 mx-auto mb-4 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <h3 className={`text-lg font-semibold mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>No Report Available</h3>
          <p className={`text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Start a conversation to generate analysis reports
          </p>
        </div>
      </div>
    );
  }

  const { analysis, queryType, locations, urgency, timestamp } = analysisData;

  // Dynamic Risk Calculation based on multiple factors
  const calculateDynamicRisk = () => {
    let riskScore = 0;
    let factors = [];

    // Factor 1: Base risk level from LLM (40% weight)
    const baseRiskWeights = {
      'critical': 40,
      'high': 30,
      'medium': 20,
      'low': 10
    };
    const baseRisk = analysis.risk_assessment?.overall_risk_level?.toLowerCase() || 'medium';
    riskScore += baseRiskWeights[baseRisk] || 20;
    factors.push({ name: 'Base Assessment', value: baseRiskWeights[baseRisk] || 20, max: 40 });

    // Factor 2: Urgency level (25% weight)
    const urgencyWeights = {
      'critical': 25,
      'high': 20,
      'medium': 12,
      'low': 5
    };
    const urgencyLevel = urgency?.toLowerCase() || 'medium';
    riskScore += urgencyWeights[urgencyLevel] || 12;
    factors.push({ name: 'Urgency', value: urgencyWeights[urgencyLevel] || 12, max: 25 });

    // Factor 3: Population impact (20% weight)
    let populationScore = 10;
    if (locations?.[0]?.population_affected) {
      const popString = locations[0].population_affected.toString();
      if (popString.includes('million') || popString.includes('M')) populationScore = 20;
      else if (popString.includes('thousand') || popString.includes('K')) populationScore = 15;
      else if (parseInt(popString.replace(/,/g, '')) > 100000) populationScore = 18;
    }
    riskScore += populationScore;
    factors.push({ name: 'Population Impact', value: populationScore, max: 20 });

    // Factor 4: Confidence (inverse - 15% weight)
    const confidenceWeights = {
      'high': 5,
      'medium': 10,
      'low': 15
    };
    const confidence = analysis.risk_assessment?.confidence?.toLowerCase() || 'medium';
    riskScore += confidenceWeights[confidence] || 10;
    factors.push({ name: 'Data Uncertainty', value: confidenceWeights[confidence] || 10, max: 15 });

    // Calculate final percentage (out of 100)
    const riskPercentage = Math.min(100, riskScore);
    
    // Determine risk level based on percentage
    let calculatedRiskLevel = 'low';
    if (riskPercentage >= 80) calculatedRiskLevel = 'critical';
    else if (riskPercentage >= 60) calculatedRiskLevel = 'high';
    else if (riskPercentage >= 40) calculatedRiskLevel = 'medium';

    return {
      percentage: riskPercentage,
      level: calculatedRiskLevel,
      factors: factors,
      breakdown: `${riskScore}/100 points`
    };
  };

  const dynamicRisk = calculateDynamicRisk();

  const getRiskColor = (riskLevel) => {
    const level = riskLevel?.toLowerCase();
    switch (level) {
      case 'critical': return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', border: 'border-red-300 dark:border-red-700' };
      case 'high': return { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-300 dark:border-orange-700' };
      case 'medium': return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-300 dark:border-yellow-700' };
      case 'low': return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', border: 'border-green-300 dark:border-green-700' };
      default: return { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-300 dark:border-gray-700' };
    }
  };

  const getRiskIcon = (riskLevel) => {
    const level = riskLevel?.toLowerCase();
    if (level === 'critical' || level === 'high') return <AlertTriangle className="w-5 h-5" />;
    if (level === 'low') return <CheckCircle className="w-5 h-5" />;
    return <Info className="w-5 h-5" />;
  };

  const riskColors = getRiskColor(analysis.risk_assessment?.overall_risk_level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`h-full rounded-2xl shadow-xl overflow-hidden ${
        darkMode ? 'bg-gray-800/90' : 'bg-white/90'
      }`}
    >
      {/* Header with Analysis Type and Location */}
      <div className={`p-6 border-b ${
        darkMode ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700' : 'border-gray-200 bg-gradient-to-r from-earth-50 to-sky-50'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className={`text-2xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Analysis Report
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
              }`}>
                <Activity className="w-4 h-4" />
                <span className="font-medium capitalize">{queryType?.replace('_', ' ')}</span>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
              }`}>
                <MapPin className="w-4 h-4" />
                <span>{locations?.[0]?.name || 'Unknown'}</span>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{new Date(timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          
          {/* Overall Risk Badge - Dynamic */}
          <div className={`px-4 py-2 rounded-lg border-2 ${getRiskColor(dynamicRisk.level).bg} ${getRiskColor(dynamicRisk.level).text} ${getRiskColor(dynamicRisk.level).border} flex items-center gap-2`}>
            {getRiskIcon(dynamicRisk.level)}
            <div>
              <p className="text-xs font-medium opacity-80">Risk Score</p>
              <p className="text-lg font-bold">{dynamicRisk.percentage}%</p>
              <p className="text-xs font-medium uppercase">{dynamicRisk.level}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto h-[calc(100%-8rem)]">
        <div className="p-6 space-y-6">
          {/* Executive Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700/50' : 'bg-earth-50'
            }`}
          >
            <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <FileText className="w-4 h-4" />
              Executive Summary
            </h4>
            <p className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {analysis.executive_summary}
            </p>
          </motion.div>

          {/* Dynamic Risk Assessment with Factor Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <BarChart3 className="w-4 h-4" />
              Dynamic Risk Calculation
            </h4>
            
            {/* Overall Risk Score */}
            <div className={`p-5 rounded-lg border-2 mb-4 ${getRiskColor(dynamicRisk.level).bg} ${getRiskColor(dynamicRisk.level).border}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className={`text-xs font-medium opacity-80 ${getRiskColor(dynamicRisk.level).text}`}>
                    Calculated Risk Score
                  </p>
                  <p className={`text-4xl font-bold ${getRiskColor(dynamicRisk.level).text}`}>
                    {dynamicRisk.percentage}%
                  </p>
                  <p className={`text-sm font-semibold uppercase mt-1 ${getRiskColor(dynamicRisk.level).text}`}>
                    {dynamicRisk.level} Risk
                  </p>
                </div>
                <div className="text-right">
                  {getRiskIcon(dynamicRisk.level)}
                  <p className={`text-xs mt-2 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {dynamicRisk.breakdown}
                  </p>
                </div>
              </div>
              
              {/* Overall Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dynamicRisk.percentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-3 rounded-full ${
                    dynamicRisk.level === 'critical' ? 'bg-red-500' :
                    dynamicRisk.level === 'high' ? 'bg-orange-500' :
                    dynamicRisk.level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                />
              </div>

              {/* Risk Factor Breakdown */}
              <div className="space-y-2 mt-4">
                <p className={`text-xs font-semibold mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Contributing Factors:
                </p>
                {dynamicRisk.factors.map((factor, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {factor.name}
                      </span>
                      <span className={`text-xs font-bold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {factor.value}/{factor.max}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(factor.value / factor.max) * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        className="bg-earth-500 h-1.5 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Key Findings */}
          {analysis.risk_assessment?.key_findings && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                <Target className="w-4 h-4" />
                Key Findings
              </h4>
              <div className="space-y-2">
                {analysis.risk_assessment.key_findings.map((finding, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`p-3 rounded-lg flex items-start gap-3 ${
                      darkMode ? 'bg-gray-700/30' : 'bg-gray-50'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 text-earth-500 flex-shrink-0 mt-0.5" />
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{finding}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Summarized Location Analysis Card */}
          {analysis.location_specific_insights && analysis.location_specific_insights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                <MapPin className="w-4 h-4" />
                Location Summary
              </h4>
              
              {/* Combined Location Card */}
              <div className={`p-5 rounded-lg border ${
                darkMode ? 'bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
              }`}>
                {/* Locations Header */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {analysis.location_specific_insights.map((insight, index) => {
                    const insightColors = getRiskColor(insight.risk_level);
                    return (
                      <span
                        key={index}
                        className={`px-3 py-1.5 rounded-lg border ${insightColors.bg} ${insightColors.text} ${insightColors.border} text-sm font-semibold`}
                      >
                        {insight.location}
                      </span>
                    );
                  })}
                </div>

                {/* Population Impact Visualization */}
                <div className="mb-4">
                  <p className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <Users className="w-4 h-4" />
                    Population Impact Analysis
                  </p>
                  
                  {analysis.location_specific_insights.map((insight, index) => {
                    // Parse population numbers for visualization
                    const parsePopulation = (popStr) => {
                      if (!popStr) return 0;
                      const str = popStr.toString().toLowerCase();
                      if (str.includes('million') || str.includes('m')) {
                        const num = parseFloat(str.match(/[\d.]+/)?.[0] || 0);
                        return num * 1000000;
                      }
                      if (str.includes('thousand') || str.includes('k')) {
                        const num = parseFloat(str.match(/[\d.]+/)?.[0] || 0);
                        return num * 1000;
                      }
                      return parseInt(str.replace(/,/g, '')) || 0;
                    };

                    const population = parsePopulation(insight.affected_population);
                    const maxPop = 2000000; // 2 million as max for scaling
                    const percentage = Math.min(100, (population / maxPop) * 100);

                    return (
                      <div key={index} className="mb-3 last:mb-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-medium ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {insight.location}
                          </span>
                          <span className={`text-xs font-bold ${
                            darkMode ? 'text-gray-200' : 'text-gray-800'
                          }`}>
                            {insight.affected_population || 'Unknown'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1.2, delay: 0.6 + index * 0.2 }}
                            className={`h-2 rounded-full ${
                              getRiskColor(insight.risk_level).level === 'critical' ? 'bg-red-500' :
                              getRiskColor(insight.risk_level).level === 'high' ? 'bg-orange-500' :
                              getRiskColor(insight.risk_level).level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                          />
                        </div>
                        <p className={`text-xs mt-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Risk: {insight.risk_level} • {insight.current_status}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Combined Concerns */}
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-gray-600/30' : 'bg-gray-100'
                }`}>
                  <p className={`text-xs font-semibold mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Key Concerns Across All Locations:
                  </p>
                  <div className="space-y-1">
                    {analysis.location_specific_insights.flatMap(insight => 
                      insight.specific_concerns || []
                    ).filter((concern, index, self) => 
                      self.indexOf(concern) === index
                    ).slice(0, 5).map((concern, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <AlertTriangle className="w-3 h-3 text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{concern}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Immediate Actions */}
          {analysis.immediate_actions && analysis.immediate_actions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                <Zap className="w-4 h-4 text-orange-500" />
                Immediate Actions Required
              </h4>
              <div className="space-y-2">
                {analysis.immediate_actions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`p-3 rounded-lg border-l-4 ${
                      action.priority === 'high' 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : action.priority === 'medium'
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                        : 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className={`text-sm font-medium ${
                        darkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        {action.action}
                      </p>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        action.priority === 'high' ? 'bg-red-500 text-white' :
                        action.priority === 'medium' ? 'bg-yellow-500 text-white' :
                        'bg-green-500 text-white'
                      }`}>
                        {action.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <strong>Target:</strong> {action.target}
                      </span>
                      <span className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <strong>Timeline:</strong> {action.timeline}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Long-term Recommendations */}
          {analysis.long_term_recommendations && analysis.long_term_recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                <Shield className="w-4 h-4 text-blue-500" />
                Long-term Recommendations
              </h4>
              <div className="space-y-2">
                {analysis.long_term_recommendations.map((recommendation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    className={`p-3 rounded-lg flex items-start gap-3 ${
                      darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{recommendation}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Data Sources */}
          {analysis.data_sources && analysis.data_sources.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-700/30' : 'bg-gray-50'
              }`}
            >
              <h4 className={`text-xs font-semibold mb-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Data Sources
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.data_sources.map((source, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs ${
                      darkMode ? 'bg-gray-600 text-gray-300' : 'bg-white text-gray-700'
                    }`}
                  >
                    {source}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReportSection;
