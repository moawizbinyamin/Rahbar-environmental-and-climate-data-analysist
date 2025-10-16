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
          
          {/* Overall Risk Badge */}
          <div className={`px-4 py-2 rounded-lg border-2 ${riskColors.bg} ${riskColors.text} ${riskColors.border} flex items-center gap-2`}>
            {getRiskIcon(analysis.risk_assessment?.overall_risk_level)}
            <div>
              <p className="text-xs font-medium opacity-80">Overall Risk</p>
              <p className="text-sm font-bold uppercase">{analysis.risk_assessment?.overall_risk_level || 'N/A'}</p>
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

          {/* Risk Assessment with Percentages */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <BarChart3 className="w-4 h-4" />
              Risk Metrics
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Overall Risk Level */}
              <div className={`p-4 rounded-lg border ${
                darkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Risk Level</span>
                  <span className={`text-2xl font-bold ${riskColors.text}`}>
                    {analysis.risk_assessment?.overall_risk_level === 'critical' ? '95%' :
                     analysis.risk_assessment?.overall_risk_level === 'high' ? '75%' :
                     analysis.risk_assessment?.overall_risk_level === 'medium' ? '50%' : '25%'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      analysis.risk_assessment?.overall_risk_level === 'critical' ? 'bg-red-500 w-[95%]' :
                      analysis.risk_assessment?.overall_risk_level === 'high' ? 'bg-orange-500 w-[75%]' :
                      analysis.risk_assessment?.overall_risk_level === 'medium' ? 'bg-yellow-500 w-1/2' : 'bg-green-500 w-1/4'
                    }`}
                  />
                </div>
              </div>

              {/* Confidence Level */}
              <div className={`p-4 rounded-lg border ${
                darkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Confidence</span>
                  <span className="text-2xl font-bold text-blue-500">
                    {analysis.risk_assessment?.confidence === 'high' ? '90%' :
                     analysis.risk_assessment?.confidence === 'medium' ? '70%' : '50%'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`bg-blue-500 h-2 rounded-full transition-all duration-1000 ${
                      analysis.risk_assessment?.confidence === 'high' ? 'w-[90%]' :
                      analysis.risk_assessment?.confidence === 'medium' ? 'w-[70%]' : 'w-1/2'
                    }`}
                  />
                </div>
              </div>

              {/* Urgency Level */}
              <div className={`p-4 rounded-lg border ${
                darkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Urgency</span>
                  <Zap className={`w-6 h-6 ${
                    urgency === 'critical' || urgency === 'high' ? 'text-red-500' :
                    urgency === 'medium' ? 'text-yellow-500' : 'text-green-500'
                  }`} />
                </div>
                <p className={`text-lg font-bold capitalize ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {urgency}
                </p>
              </div>

              {/* Population Affected */}
              {locations?.[0]?.population_affected && (
                <div className={`p-4 rounded-lg border ${
                  darkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Population</span>
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <p className={`text-lg font-bold ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {locations[0].population_affected}
                  </p>
                </div>
              )}
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

          {/* Location-Specific Insights */}
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
                Location Analysis
              </h4>
              <div className="space-y-3">
                {analysis.location_specific_insights.map((insight, index) => {
                  const insightColors = getRiskColor(insight.risk_level);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`p-4 rounded-lg border ${insightColors.bg} ${insightColors.border}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className={`font-semibold ${insightColors.text}`}>
                          {insight.location}
                        </h5>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${insightColors.text}`}>
                          {insight.risk_level}
                        </span>
                      </div>
                      <p className={`text-sm mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {insight.current_status}
                      </p>
                      {insight.specific_concerns && insight.specific_concerns.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {insight.specific_concerns.map((concern, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-earth-500 mt-1.5 flex-shrink-0" />
                              <p className={`text-xs ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>{concern}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {insight.affected_population && (
                        <div className={`mt-3 pt-3 border-t ${
                          darkMode ? 'border-gray-600' : 'border-gray-200'
                        }`}>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-500" />
                            <span className={`text-xs font-medium ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Affected Population: {insight.affected_population}
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
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
