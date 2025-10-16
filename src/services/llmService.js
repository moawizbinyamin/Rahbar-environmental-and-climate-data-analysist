// LLM Service for intent understanding and insight generation
import { geospatialDataService } from './geospatialDataService';

export class LLMService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
    
    // Check if API key is available
    if (!this.apiKey || this.apiKey === 'your-gemini-api-key') {
      console.log('🔑 Gemini API key not configured - using mock service');
      this.useMockService = true;
    } else {
      console.log('🤖 Gemini API key found - using real AI service');
      this.useMockService = false;
    }
  }

  async interpretUserIntent(userMessage) {
    // Use mock service if API key is not configured
    if (this.useMockService) {
      return this.getMockIntentInterpretation(userMessage);
    }

    const prompt = `You are Rahbar Intelligence — a specialized conversational geo AI for climate and disaster management.

Your expertise covers:
- FLOOD ANALYSIS: Risk assessment, water levels, affected areas, early warnings
- URBAN EXPANSION: Growth patterns, infrastructure impact, population density
- GREEN EXPANSION: Ecosystem health, carbon sequestration, biodiversity

Interpret the user query and produce a structured plan for data retrieval.

User Query: ${userMessage}

Output JSON format:
{
"intent": "flood|urban|green|temperature|precipitation|air_quality",
"location": "city name or coordinates",
"time_period": "optional date range or relative time",
"query_summary": "short description of what to analyze",
"confidence": "high|medium|low",
"disaster_type": "flood|urban_expansion|green_expansion|general",
"urgency": "low|medium|high|critical"
}

Focus on climate and disaster management. Only respond with valid JSON, no additional text.`;

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response from Gemini API');
      }

      const content = data.candidates[0].content.parts[0].text;
      
      // Clean and parse JSON response with better error handling
      let cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      
      // Try to extract JSON from the response if it's wrapped in text
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanContent = jsonMatch[0];
      }
      
      const parsedIntent = JSON.parse(cleanContent);
      
      // Validate the response structure
      if (!parsedIntent.intent || !parsedIntent.location) {
        throw new Error('Invalid intent structure from Gemini API');
      }
      
      return parsedIntent;
    } catch (error) {
      console.error('Error interpreting intent with Gemini API:', error);
      
      // Fallback to mock service if API fails
      console.log('Falling back to mock intent interpretation...');
      return this.getMockIntentInterpretation(userMessage);
    }
  }

  // Fallback mock method for when API fails
  getMockIntentInterpretation(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Intent detection logic
    let intent = 'general';
    let disaster_type = 'general';
    let urgency = 'low';
    
    // Flood-related keywords
    if (message.includes('flood') || message.includes('water') || message.includes('rain') || 
        message.includes('drainage') || message.includes('overflow') || message.includes('inundation')) {
      intent = 'flood';
      disaster_type = 'flood';
      urgency = message.includes('urgent') || message.includes('emergency') ? 'high' : 'medium';
    }
    // Urban expansion keywords
    else if (message.includes('urban') || message.includes('city') || message.includes('growth') || 
             message.includes('expansion') || message.includes('development') || message.includes('population')) {
      intent = 'urban';
      disaster_type = 'urban_expansion';
      urgency = 'low';
    }
    // Green space keywords
    else if (message.includes('green') || message.includes('forest') || message.includes('tree') || 
             message.includes('park') || message.includes('vegetation') || message.includes('carbon')) {
      intent = 'green';
      disaster_type = 'green_expansion';
      urgency = 'low';
    }
    // Temperature keywords
    else if (message.includes('temperature') || message.includes('heat') || message.includes('climate') || 
             message.includes('weather') || message.includes('hot') || message.includes('cold')) {
      intent = 'temperature';
      disaster_type = 'general';
      urgency = 'low';
    }
    // Air quality keywords
    else if (message.includes('air') || message.includes('pollution') || message.includes('quality') || 
             message.includes('smog') || message.includes('aqi') || message.includes('pm')) {
      intent = 'air_quality';
      disaster_type = 'general';
      urgency = 'medium';
    }
    
    // Location detection
    let location = 'unknown';
    const cities = ['lahore', 'karachi', 'islamabad', 'multan', 'peshawar', 'quetta', 'faisalabad', 'rawalpindi'];
    for (const city of cities) {
      if (message.includes(city)) {
        location = city;
        break;
      }
    }
    
    // Time period detection
    let time_period = 'current';
    if (message.includes('week') || message.includes('7 days')) {
      time_period = '1 week';
    } else if (message.includes('month') || message.includes('30 days')) {
      time_period = '1 month';
    } else if (message.includes('year') || message.includes('annual')) {
      time_period = '1 year';
    } else if (message.includes('5 years') || message.includes('five years')) {
      time_period = '5 years';
    }
    
    // Generate query summary
    const query_summary = this.generateQuerySummary(intent, location, time_period, message);
    
    return {
      intent,
      location,
      time_period,
      query_summary,
      confidence: 'medium', // Lower confidence for fallback
      disaster_type,
      urgency
    };
  }

  generateQuerySummary(intent, location, timePeriod, originalMessage) {
    const summaries = {
      flood: `Flood risk analysis for ${location} over ${timePeriod}`,
      urban: `Urban expansion analysis for ${location} over ${timePeriod}`,
      green: `Green space assessment for ${location} over ${timePeriod}`,
      temperature: `Temperature analysis for ${location} over ${timePeriod}`,
      air_quality: `Air quality assessment for ${location} over ${timePeriod}`,
      general: `Environmental analysis for ${location} over ${timePeriod}`
    };
    
    return summaries[intent] || `Climate analysis for ${location}`;
  }

  async generateInsight(alphaEarthData, userMessage, climateAnalysis = null) {
    // Use mock service if API key is not configured
    if (this.useMockService) {
      return this.generateMockInsights(
        alphaEarthData.dataType || 'general',
        alphaEarthData.location || 'unknown',
        alphaEarthData
      );
    }

    // Get real geospatial data based on the analysis type
    let realGeospatialData = null;
    
    if (alphaEarthData && alphaEarthData.intent) {
      const location = alphaEarthData.location || 'Lahore';
      
      try {
        switch (alphaEarthData.intent) {
          case 'flood':
            realGeospatialData = await geospatialDataService.analyzeFloodRisk(location);
            break;
          case 'urban':
            realGeospatialData = await geospatialDataService.analyzeUrbanExpansion(location);
            break;
          case 'green':
            realGeospatialData = await geospatialDataService.analyzeGreenExpansion(location);
            break;
          default:
            // For general queries, get weather data
            const coords = await geospatialDataService.geocodeLocation(location);
            realGeospatialData = {
              location: coords,
              current_weather: await geospatialDataService.getCurrentWeather(coords.lat, coords.lon),
              forecast: await geospatialDataService.getWeatherForecast(coords.lat, coords.lon)
            };
        }
      } catch (error) {
        console.log('Using fallback data for geospatial analysis:', error.message);
      }
    }

    const prompt = `You are Rahbar — a specialized climate and disaster intelligence analyst.

Analyze this environmental dataset and provide actionable insights for disaster management and climate adaptation.

Original Data: ${JSON.stringify(alphaEarthData)}
Real Geospatial Data: ${realGeospatialData ? JSON.stringify(realGeospatialData) : 'Not available'}
Climate Analysis: ${climateAnalysis ? JSON.stringify(climateAnalysis) : 'Not available'}
User Query: ${userMessage}

Provide comprehensive analysis including:

1. Key findings and risk assessment based on real data when available
2. Disaster risk level (Low, Medium, High, Critical)
3. Immediate actions for disaster preparedness
4. Long-term climate adaptation strategies
5. Policy recommendations for urban planning

Respond as:
{
"summary": "Clear, concise summary of findings with disaster context",
"risk_level": "Low|Medium|High|Critical",
"disaster_risk": "flood|urban_expansion|green_loss|general",
"immediate_actions": ["action1", "action2", "action3"],
"long_term_strategies": ["strategy1", "strategy2"],
"policy_recommendations": ["policy1", "policy2"],
"confidence": "high|medium|low",
"urgency": "low|medium|high|critical",
"data_sources": ["real_api", "mock_data", "climate_analysis"]
}

Focus on practical disaster management and climate resilience. Use real data when available, otherwise provide insights based on available information. Only respond with valid JSON, no additional text.`;

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response from Gemini API');
      }

      const content = data.candidates[0].content.parts[0].text;
      
      // Clean and parse JSON response with better error handling
      let cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      
      // Try to extract JSON from the response if it's wrapped in text
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanContent = jsonMatch[0];
      }
      
      const parsedInsights = JSON.parse(cleanContent);
      
      // Validate the response structure
      if (!parsedInsights.summary || !parsedInsights.risk_level) {
        throw new Error('Invalid insights structure from Gemini API');
      }
      
      return {
        ...parsedInsights,
        real_geospatial_data: realGeospatialData,
        source: 'gemini_with_real_data',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating insights with Gemini API:', error);
      
      // Fallback to mock service if API fails
      console.log('Falling back to mock insight generation...');
      return this.generateMockInsights(
        alphaEarthData.dataType || 'general',
        alphaEarthData.location || 'unknown',
        alphaEarthData
      );
    }
  }

  generateMockInsights(intent, location, data) {
    const insights = {
      flood: {
        summary: `${location} shows ${data.riskLevel} flood risk with water levels at ${data.waterLevel}m. ${data.affectedAreas} areas are potentially affected. Immediate monitoring of drainage systems and early warning systems are recommended.`,
        risk_level: data.riskLevel,
        disaster_risk: 'flood',
        immediate_actions: [
          'Activate early warning systems',
          'Check drainage infrastructure',
          'Prepare emergency response teams',
          'Monitor water levels continuously'
        ],
        long_term_strategies: [
          'Improve urban drainage systems',
          'Implement flood-resistant infrastructure',
          'Develop green infrastructure for water management',
          'Create flood risk zoning regulations'
        ],
        policy_recommendations: [
          'Mandatory flood risk assessment for new developments',
          'Investment in sustainable drainage systems',
          'Community-based early warning programs',
          'Integration of climate adaptation in urban planning'
        ],
        confidence: 'high',
        urgency: data.riskLevel === 'High' ? 'high' : 'medium'
      },
      urban: {
        summary: `${location} is experiencing ${data.urbanGrowth}% urban growth with ${data.greenSpaceLoss} km² green space loss annually. Population density has reached ${data.populationDensity} people/km², indicating significant infrastructure strain.`,
        risk_level: data.infrastructureStrain === 'High' ? 'High' : data.infrastructureStrain === 'Medium' ? 'Medium' : 'Low',
        disaster_risk: 'urban_expansion',
        immediate_actions: [
          'Assess infrastructure capacity',
          'Monitor population density trends',
          'Evaluate green space preservation needs',
          'Review urban planning regulations'
        ],
        long_term_strategies: [
          'Implement smart growth policies',
          'Develop green infrastructure networks',
          'Create mixed-use development zones',
          'Invest in public transportation systems'
        ],
        policy_recommendations: [
          'Mandatory green space requirements for new developments',
          'Density-based zoning regulations',
          'Sustainable transportation infrastructure investment',
          'Community participation in urban planning'
        ],
        confidence: 'high',
        urgency: 'low'
      },
      green: {
        summary: `${location} has ${data.greenCoverage}% green coverage with ${data.carbonSequestration} tons CO₂/year sequestration capacity. Ecosystem health is ${data.ecosystemHealth} with biodiversity index of ${data.biodiversityIndex}/100.`,
        risk_level: data.ecosystemHealth === 'Poor' ? 'High' : data.ecosystemHealth === 'Fair' ? 'Medium' : 'Low',
        disaster_risk: 'green_loss',
        immediate_actions: [
          'Assess current green space distribution',
          'Identify areas for reforestation',
          'Monitor carbon sequestration rates',
          'Evaluate biodiversity conservation needs'
        ],
        long_term_strategies: [
          'Develop urban forest master plan',
          'Implement green corridor networks',
          'Create community gardens and parks',
          'Establish carbon offset programs'
        ],
        policy_recommendations: [
          'Mandatory tree planting for new developments',
          'Green space preservation ordinances',
          'Carbon credit trading programs',
          'Biodiversity protection regulations'
        ],
        confidence: 'high',
        urgency: 'low'
      },
      temperature: {
        summary: `${location} shows current temperature of ${data.currentTemp}°C with ${data.temperatureTrend} trend. Average temperature is ${data.averageTemp}°C, indicating potential climate change impacts.`,
        risk_level: data.temperatureTrend === 'increasing' ? 'Medium' : 'Low',
        disaster_risk: 'general',
        immediate_actions: [
          'Monitor temperature trends',
          'Assess heat island effects',
          'Evaluate cooling infrastructure needs',
          'Prepare heat wave response plans'
        ],
        long_term_strategies: [
          'Develop urban cooling strategies',
          'Implement heat-resistant infrastructure',
          'Create green cooling corridors',
          'Establish temperature monitoring networks'
        ],
        policy_recommendations: [
          'Heat island mitigation requirements',
          'Cooling infrastructure investment',
          'Climate adaptation planning mandates',
          'Temperature monitoring regulations'
        ],
        confidence: 'high',
        urgency: 'low'
      },
      air_quality: {
        summary: `${location} has Air Quality Index of ${data.aqi} with PM2.5 at ${data.pm25} μg/m³ and PM10 at ${data.pm10} μg/m³. Air quality is ${this.getAirQualityStatus(data.aqi)} requiring immediate attention.`,
        risk_level: data.aqi > 150 ? 'High' : data.aqi > 100 ? 'Medium' : 'Low',
        disaster_risk: 'general',
        immediate_actions: [
          'Issue air quality alerts',
          'Restrict outdoor activities for sensitive groups',
          'Monitor pollution sources',
          'Activate emergency response protocols'
        ],
        long_term_strategies: [
          'Implement emission reduction programs',
          'Develop green transportation systems',
          'Create air quality monitoring networks',
          'Establish pollution control regulations'
        ],
        policy_recommendations: [
          'Vehicle emission standards enforcement',
          'Industrial pollution control measures',
          'Green energy transition programs',
          'Public awareness campaigns'
        ],
        confidence: 'high',
        urgency: data.aqi > 150 ? 'high' : 'medium'
      }
    };

    return insights[intent] || {
      summary: `Environmental analysis for ${location} shows mixed results requiring comprehensive monitoring and adaptive management strategies.`,
      risk_level: 'Medium',
      disaster_risk: 'general',
      immediate_actions: ['Conduct comprehensive environmental assessment', 'Monitor key indicators', 'Develop response protocols'],
      long_term_strategies: ['Implement sustainable development practices', 'Create environmental monitoring systems', 'Develop adaptation strategies'],
      policy_recommendations: ['Environmental impact assessment requirements', 'Sustainable development regulations', 'Climate adaptation planning'],
      confidence: 'medium',
      urgency: 'low'
    };
  }

  getAirQualityStatus(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  }
}

export const llmService = new LLMService();
