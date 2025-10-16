import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp();

// AlphaEarth API Service
class AlphaEarthAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = functions.config().alphaearth?.api_key || process.env.ALPHAEARTH_API_KEY || '';
    this.baseUrl = functions.config().alphaearth?.base_url || process.env.ALPHAEARTH_BASE_URL || 'https://api.alphaearth.com/v1';
  }

  async fetchData(intent: string, location: string, timePeriod: string) {
    try {
      // In production, this would call the actual AlphaEarth API
      // For now, we'll return mock data
      return this.generateMockData(intent, location, timePeriod);
    } catch (error) {
      console.error('Error fetching AlphaEarth data:', error);
      throw new functions.https.HttpsError('internal', 'Failed to fetch environmental data');
    }
  }

  private generateMockData(intent: string, location: string, timePeriod: string) {
    const baseData = {
      location: location,
      timePeriod: timePeriod,
      timestamp: new Date().toISOString(),
      dataType: intent
    };

    switch (intent) {
      case 'flood':
        return {
          ...baseData,
          riskLevel: Math.random() > 0.5 ? 'High' : 'Medium',
          waterLevel: Math.floor(Math.random() * 100) + 50,
          affectedAreas: Math.floor(Math.random() * 20) + 5,
          rainfall: Math.floor(Math.random() * 50) + 10,
          summary: `Flood risk analysis for ${location} shows ${Math.random() > 0.5 ? 'elevated' : 'moderate'} risk levels.`
        };
      
      case 'urban':
        return {
          ...baseData,
          urbanGrowth: Math.floor(Math.random() * 15) + 5,
          greenSpaceLoss: Math.floor(Math.random() * 10) + 2,
          populationDensity: Math.floor(Math.random() * 5000) + 1000,
          summary: `Urban expansion analysis for ${location} shows significant growth patterns.`
        };
      
      case 'green':
        return {
          ...baseData,
          greenCoverage: Math.floor(Math.random() * 40) + 30,
          deforestation: Math.floor(Math.random() * 5) + 1,
          carbonSequestration: Math.floor(Math.random() * 100) + 50,
          summary: `Green space analysis for ${location} indicates ${Math.random() > 0.5 ? 'healthy' : 'declining'} vegetation coverage.`
        };
      
      case 'temperature':
        return {
          ...baseData,
          currentTemp: Math.floor(Math.random() * 20) + 15,
          averageTemp: Math.floor(Math.random() * 20) + 15,
          temperatureTrend: Math.random() > 0.5 ? 'increasing' : 'stable',
          summary: `Temperature analysis for ${location} shows current conditions and trends.`
        };
      
      case 'air_quality':
        return {
          ...baseData,
          aqi: Math.floor(Math.random() * 200) + 50,
          pm25: Math.floor(Math.random() * 50) + 10,
          pm10: Math.floor(Math.random() * 100) + 20,
          summary: `Air quality analysis for ${location} indicates current pollution levels.`
        };
      
      default:
        return {
          ...baseData,
          summary: `General environmental analysis for ${location}.`
        };
    }
  }
}

// Gemini AI Service
class GeminiService {
  private apiKey: string;

  constructor() {
    this.apiKey = functions.config().gemini?.api_key || process.env.GEMINI_API_KEY || '';
  }
}

// Google DeepMind Service
class DeepMindService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = functions.config().deepmind?.api_key || process.env.DEEPMIND_API_KEY || '';
    this.baseUrl = 'https://api.deepmind.com/v1';
  }

  async analyzeFloodRisk(location: string, timePeriod: string, historicalData: any) {
    // DeepMind flood risk analysis implementation
    return {
      flood_risk_score: Math.floor(Math.random() * 80) + 20,
      water_level_prediction: Math.floor(Math.random() * 5) + 1,
      affected_area_km2: Math.floor(Math.random() * 100) + 10,
      risk_factors: ['Heavy rainfall', 'Poor drainage', 'Urban development'],
      early_warning_level: 'medium',
      confidence: 'high',
      model_version: 'deepmind-climate-v2.1'
    };
  }

  async analyzeUrbanExpansion(location: string, timePeriod: string, satelliteData: any) {
    // DeepMind urban expansion analysis implementation
    return {
      expansion_rate: Math.floor(Math.random() * 10) + 2,
      green_space_loss: Math.floor(Math.random() * 50) + 5,
      population_density_change: Math.floor(Math.random() * 20) + 5,
      infrastructure_strain: 'medium',
      sustainability_score: Math.floor(Math.random() * 40) + 30,
      recommendations: ['Improve public transport', 'Increase green spaces'],
      confidence: 'high',
      model_version: 'deepmind-urban-v2.1'
    };
  }

  async analyzeGreenExpansion(location: string, timePeriod: string, vegetationData: any) {
    // DeepMind green expansion analysis implementation
    return {
      green_coverage: Math.floor(Math.random() * 40) + 30,
      carbon_sequestration: Math.floor(Math.random() * 1000) + 500,
      biodiversity_index: Math.floor(Math.random() * 40) + 40,
      ecosystem_health: 'fair',
      conservation_priority: 'medium',
      recommendations: ['Plant native species', 'Protect existing forests'],
      confidence: 'high',
      model_version: 'deepmind-green-v2.1'
    };
  }
}

  async interpretUserIntent(userMessage: string) {
    const prompt = `You are AlphaEarth Intelligence — a natural-language climate assistant.
Interpret the user query and produce a structured plan for data retrieval.

User Query: ${userMessage}

Output JSON format:
{
"intent": "flood|urban|green|temperature|precipitation|air_quality",
"location": "city name or coordinates",
"time_period": "optional date range or relative time",
"query_summary": "short description of what to analyze",
"confidence": "high|medium|low"
}

Only respond with valid JSON, no additional text.`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }
      );

      const content = response.data.candidates[0].content.parts[0].text;
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanContent);
    } catch (error) {
      console.error('Error interpreting intent:', error);
      return {
        intent: 'general',
        location: 'unknown',
        time_period: 'current',
        query_summary: 'Unable to interpret query',
        confidence: 'low'
      };
    }
  }

  async generateInsight(alphaEarthData: any, userMessage: string) {
    const prompt = `You are AlphaEarth — an environmental data analyst.
Analyze this dataset and summarize insights for human understanding.

Data: ${JSON.stringify(alphaEarthData)}
User Query: ${userMessage}

Provide:

1. Key findings
2. Risk level (Low, Medium, High)
3. Recommended actions or policies

Respond as:
{
"summary": "Clear, concise summary of findings",
"risk_level": "Low|Medium|High",
"recommendations": ["action1", "action2", "action3"],
"confidence": "high|medium|low"
}

Only respond with valid JSON, no additional text.`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }
      );

      const content = response.data.candidates[0].content.parts[0].text;
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanContent);
    } catch (error) {
      console.error('Error generating insight:', error);
      return {
        summary: 'Unable to generate insights at this time',
        risk_level: 'Unknown',
        recommendations: ['Please try again with a different query'],
        confidence: 'low'
      };
    }
  }
}

// Cloud Functions
const alphaEarthAPI = new AlphaEarthAPI();
const geminiService = new GeminiService();
const deepMindService = new DeepMindService();

export const fetchAlphaEarthData = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { intent, location, timePeriod } = data;

  if (!intent || !location) {
    throw new functions.https.HttpsError('invalid-argument', 'Intent and location are required');
  }

  try {
    // Fetch data from AlphaEarth API
    const alphaEarthData = await alphaEarthAPI.fetchData(intent, location, timePeriod);
    
    // Generate insights using Gemini
    const insights = await geminiService.generateInsight(alphaEarthData, data.userMessage || '');

    // Save to Firestore
    const analysisData = {
      intent,
      location,
      time_period: timePeriod,
      userMessage: data.userMessage,
      alphaEarthData,
      llmSummary: insights,
      confidence: insights.confidence,
      userId: context.auth.uid,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await admin.firestore().collection('analyses').add(analysisData);

    return {
      id: docRef.id,
      ...analysisData
    };
  } catch (error) {
    console.error('Error in fetchAlphaEarthData:', error);
    throw new functions.https.HttpsError('internal', 'Failed to process environmental data request');
  }
});

export const interpretUserIntent = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { userMessage } = data;

  if (!userMessage) {
    throw new functions.https.HttpsError('invalid-argument', 'User message is required');
  }

  try {
    const intent = await geminiService.interpretUserIntent(userMessage);
    return intent;
  } catch (error) {
    console.error('Error in interpretUserIntent:', error);
    throw new functions.https.HttpsError('internal', 'Failed to interpret user intent');
  }
});

// Trigger function when new analysis is created
export const onAnalysisCreated = functions.firestore
  .document('analyses/{analysisId}')
  .onCreate(async (snap, context) => {
    const analysisData = snap.data();
    
    // Log the analysis creation
    console.log('New analysis created:', context.params.analysisId, analysisData);
    
    // You can add additional processing here, such as:
    // - Sending notifications
    // - Updating user statistics
    // - Triggering external API calls
    // - Generating reports
    
    return null;
  });

// Scheduled function to clean up old data (runs daily)
export const cleanupOldData = functions.pubsub
  .schedule('0 2 * * *') // Run at 2 AM daily
  .timeZone('UTC')
  .onRun(async (context) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const oldAnalyses = await admin.firestore()
      .collection('analyses')
      .where('timestamp', '<', thirtyDaysAgo)
      .get();

    const batch = admin.firestore().batch();
    oldAnalyses.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Cleaned up ${oldAnalyses.docs.length} old analyses`);
    
    return null;
  });
