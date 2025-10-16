// Test script for AlphaEarth Climate Console Mock Services
import { llmService } from './src/services/llmService.js';
import { deepMindService } from './src/services/deepMindService.js';
import { alphaEarthService } from './src/services/alphaEarthService.js';

console.log('🌍 AlphaEarth Climate Console - Mock Services Test');
console.log('================================================\n');

// Test queries
const testQueries = [
  'Show me flood risk for Lahore this week',
  'How much green area did Karachi lose in the last 5 years?',
  'What is the urban expansion rate in Islamabad?',
  'Analyze air quality in Multan',
  'Show me temperature trends in Peshawar'
];

async function testMockServices() {
  for (const query of testQueries) {
    console.log(`🔍 Testing Query: "${query}"`);
    console.log('─'.repeat(50));
    
    try {
      // Step 1: Test Gemini LLM Intent Interpretation
      console.log('1. 🤖 Gemini LLM Intent Interpretation:');
      const intent = await llmService.interpretUserIntent(query);
      console.log('   Intent:', intent.intent);
      console.log('   Location:', intent.location);
      console.log('   Disaster Type:', intent.disaster_type);
      console.log('   Urgency:', intent.urgency);
      console.log('   Confidence:', intent.confidence);
      console.log('');
      
      // Step 2: Test AlphaEarth Data Retrieval
      console.log('2. 🌍 AlphaEarth Data Retrieval:');
      const alphaEarthData = await alphaEarthService.fetchData(
        intent.intent,
        intent.location,
        intent.time_period
      );
      console.log('   Data Type:', alphaEarthData.dataType);
      console.log('   Risk Level:', alphaEarthData.riskLevel || 'N/A');
      console.log('   Summary:', alphaEarthData.summary);
      console.log('   Geospatial Data:', alphaEarthData.geospatialData ? 'Available' : 'N/A');
      console.log('');
      
      // Step 3: Test DeepMind Analysis
      console.log('3. 🧠 DeepMind Climate Analysis:');
      let deepMindAnalysis = null;
      if (intent.disaster_type === 'flood') {
        deepMindAnalysis = await deepMindService.analyzeFloodRisk(
          intent.location,
          intent.time_period,
          alphaEarthData
        );
      } else if (intent.disaster_type === 'urban_expansion') {
        deepMindAnalysis = await deepMindService.analyzeUrbanExpansion(
          intent.location,
          intent.time_period,
          alphaEarthData
        );
      } else if (intent.disaster_type === 'green_expansion') {
        deepMindAnalysis = await deepMindService.analyzeGreenExpansion(
          intent.location,
          intent.time_period,
          alphaEarthData
        );
      }
      
      if (deepMindAnalysis) {
        console.log('   Model Version:', deepMindAnalysis.model_version);
        console.log('   Confidence:', deepMindAnalysis.confidence);
        if (deepMindAnalysis.flood_risk_score) {
          console.log('   Flood Risk Score:', deepMindAnalysis.flood_risk_score);
        }
        if (deepMindAnalysis.expansion_rate) {
          console.log('   Expansion Rate:', deepMindAnalysis.expansion_rate + '%');
        }
        if (deepMindAnalysis.green_coverage) {
          console.log('   Green Coverage:', deepMindAnalysis.green_coverage + '%');
        }
      }
      console.log('');
      
      // Step 4: Test Insight Generation
      console.log('4. 💡 AI Insight Generation:');
      const insights = await llmService.generateInsight(
        { ...alphaEarthData, deepMindAnalysis },
        query
      );
      console.log('   Risk Level:', insights.risk_level);
      console.log('   Urgency:', insights.urgency);
      console.log('   Summary:', insights.summary.substring(0, 100) + '...');
      console.log('   Immediate Actions:', insights.immediate_actions.length);
      console.log('   Long-term Strategies:', insights.long_term_strategies.length);
      console.log('   Policy Recommendations:', insights.policy_recommendations.length);
      console.log('');
      
    } catch (error) {
      console.error('❌ Error testing query:', error.message);
    }
    
    console.log('═'.repeat(60));
    console.log('');
  }
}

// Run the test
testMockServices().then(() => {
  console.log('✅ Mock Services Test Complete!');
  console.log('🌐 Your AlphaEarth Climate Console is ready at: https://rahbar-dcd4a.web.app');
}).catch(error => {
  console.error('❌ Test failed:', error);
});
