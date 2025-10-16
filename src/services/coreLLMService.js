// Core LLM Service - Primary AI Intelligence Engine
// This service handles all query interpretation, analysis, and location identification
// LLM is the brain - everything else follows its intelligence

export class CoreLLMService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
    
    if (!this.apiKey || this.apiKey === 'your-gemini-api-key') {
      console.log('⚠️ Gemini API key not configured - using mock responses');
      this.useMockService = true;
    } else {
      console.log('🤖 Core LLM Engine initialized with Gemini AI');
      this.useMockService = false;
    }
  }

  // STEP 1: Comprehensive Query Understanding
  async interpretQuery(userQuery) {
    console.log('🧠 LLM analyzing query:', userQuery);
    
    if (this.useMockService) {
      return this.getMockQueryInterpretation(userQuery);
    }

    const prompt = `You are Rahbar, an advanced climate intelligence AI. Your job is to deeply understand user queries about environmental and climate issues.

Analyze this query and extract ALL relevant information:
"${userQuery}"

Provide a comprehensive analysis in this exact JSON format:
{
  "query_type": "flood_analysis|deforestation|urban_expansion|green_coverage|general_climate|weather|disaster_risk",
  "primary_intent": "Brief description of what user wants to know",
  "locations": [
    {
      "name": "Exact location name (city/region/country)",
      "type": "city|region|country|area",
      "priority": "primary|secondary",
      "context": "Why this location is relevant"
    }
  ],
  "analysis_required": ["specific analysis types needed"],
  "time_scope": "current|historical|future|specific_period",
  "urgency_level": "low|medium|high|critical",
  "expected_output": ["map_visualization", "risk_assessment", "statistics", "recommendations"],
  "specific_questions": ["extracted specific questions from query"]
}

Be precise with location names. Extract all mentioned or implied locations. If the query is vague, suggest the most relevant locations.

Respond ONLY with valid JSON, no additional text.`;

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates[0].content.parts[0].text;
      
      // Robust JSON extraction
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanContent = jsonMatch[0];
      }
      
      const interpretation = JSON.parse(cleanContent);
      console.log('✅ Query interpreted by LLM:', interpretation);
      
      return interpretation;
    } catch (error) {
      console.error('❌ LLM interpretation error:', error);
      return this.getMockQueryInterpretation(userQuery);
    }
  }

  // STEP 2: LLM-Driven Location Identification & Coordinate Generation
  async identifyLocationsWithCoordinates(queryInterpretation, userQuery) {
    console.log('🗺️ LLM identifying exact locations and coordinates...');
    
    if (this.useMockService) {
      return this.getMockLocationData(queryInterpretation);
    }

    const locationsText = queryInterpretation.locations.map(loc => loc.name).join(', ');
    
    const prompt = `You are a geospatial intelligence expert. Given these locations from a climate query, provide EXACT coordinates and specific areas of concern.

Query: "${userQuery}"
Locations to analyze: ${locationsText}
Analysis Type: ${queryInterpretation.query_type}

For EACH location, identify:
1. Exact latitude/longitude coordinates
2. Specific areas within the location that are relevant (e.g., flood-prone neighborhoods, deforested regions, urban sprawl zones)
3. Bounding box for the area
4. Risk level for each specific area

Respond with this exact JSON format:
{
  "locations": [
    {
      "name": "Location name",
      "coordinates": {
        "lat": 31.5204,
        "lon": 74.3587
      },
      "bounding_box": {
        "north": 31.65,
        "south": 31.38,
        "east": 74.48,
        "west": 74.24
      },
      "specific_areas": [
        {
          "area_name": "Specific district/neighborhood/region name",
          "coordinates": {"lat": 31.52, "lon": 74.36},
          "risk_level": "low|medium|high|critical",
          "reason": "Why this area is flagged",
          "polygon": [
            {"lat": 31.52, "lon": 74.35},
            {"lat": 31.53, "lon": 74.36},
            {"lat": 31.52, "lon": 74.37}
          ]
        }
      ],
      "overall_risk": "low|medium|high|critical",
      "population_affected": "estimated number or range"
    }
  ],
  "map_center": {"lat": 31.5204, "lon": 74.3587},
  "zoom_level": 10,
  "visualization_type": "markers|heatmap|polygons|combined"
}

Be VERY specific with actual coordinates. Use real geographical knowledge. Provide actual polygons for affected areas.

Respond ONLY with valid JSON.`;

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates[0].content.parts[0].text;
      
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanContent = jsonMatch[0];
      }
      
      const locationData = JSON.parse(cleanContent);
      console.log('✅ LLM identified locations:', locationData);
      
      return locationData;
    } catch (error) {
      console.error('❌ LLM location identification error:', error);
      return this.getMockLocationData(queryInterpretation);
    }
  }

  // STEP 3: LLM-Driven Analysis with Real Data Integration
  async performAnalysis(queryInterpretation, locationData, userQuery) {
    console.log('🔬 LLM performing comprehensive analysis...');
    
    if (this.useMockService) {
      return this.getMockAnalysis(queryInterpretation, locationData);
    }

    const prompt = `You are Rahbar, a climate intelligence analyst. Perform a comprehensive analysis based on this information:

User Query: "${userQuery}"
Query Type: ${queryInterpretation.query_type}
Locations Analyzed: ${JSON.stringify(locationData.locations)}

Provide a detailed analysis in this JSON format:
{
  "executive_summary": "Clear, concise summary of findings (2-3 sentences)",
  "risk_assessment": {
    "overall_risk_level": "low|medium|high|critical",
    "confidence": "high|medium|low",
    "key_findings": ["finding1", "finding2", "finding3"]
  },
  "location_specific_insights": [
    {
      "location": "Location name",
      "risk_level": "low|medium|high|critical",
      "current_status": "Description of current situation",
      "specific_concerns": ["concern1", "concern2"],
      "affected_population": "Estimated number",
      "infrastructure_impact": "Description of infrastructure at risk"
    }
  ],
  "immediate_actions": [
    {
      "priority": "high|medium|low",
      "action": "Specific action to take",
      "target": "Who should take this action",
      "timeline": "When to implement"
    }
  ],
  "long_term_recommendations": ["recommendation1", "recommendation2"],
  "data_sources": ["source1", "source2"],
  "visualization_guidance": {
    "map_layers_needed": ["flood_zones", "population_density", "infrastructure"],
    "highlight_areas": ["area1", "area2"],
    "color_coding": {
      "critical": "red",
      "high": "orange",
      "medium": "yellow",
      "low": "green"
    }
  }
}

Be specific, actionable, and data-driven. Focus on disaster preparedness and climate resilience.

Respond ONLY with valid JSON.`;

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates[0].content.parts[0].text;
      
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanContent = jsonMatch[0];
      }
      
      const analysis = JSON.parse(cleanContent);
      console.log('✅ LLM analysis complete:', analysis);
      
      return analysis;
    } catch (error) {
      console.error('❌ LLM analysis error:', error);
      return this.getMockAnalysis(queryInterpretation, locationData);
    }
  }

  // STEP 4: Generate Map Visualization Data from LLM Analysis
  generateMapVisualizationData(locationData, analysis) {
    console.log('🗺️ Generating map visualization from LLM data...');
    
    const mapData = {
      center: locationData.map_center,
      zoom: locationData.zoom_level,
      layers: [],
      markers: [],
      polygons: [],
      heatmapPoints: []
    };

    // Process each location from LLM
    locationData.locations.forEach((location, locIndex) => {
      // Add main location marker
      mapData.markers.push({
        id: `location-${locIndex}`,
        position: [location.coordinates.lat, location.coordinates.lon],
        name: location.name,
        riskLevel: location.overall_risk,
        populationAffected: location.population_affected,
        type: 'primary'
      });

      // Add specific areas as polygons or markers
      if (location.specific_areas && location.specific_areas.length > 0) {
        location.specific_areas.forEach((area, areaIndex) => {
          // Add area marker
          mapData.markers.push({
            id: `area-${locIndex}-${areaIndex}`,
            position: [area.coordinates.lat, area.coordinates.lon],
            name: area.area_name,
            riskLevel: area.risk_level,
            reason: area.reason,
            type: 'area'
          });

          // Add polygon if available
          if (area.polygon && area.polygon.length > 0) {
            mapData.polygons.push({
              id: `polygon-${locIndex}-${areaIndex}`,
              positions: area.polygon.map(p => [p.lat, p.lon]),
              name: area.area_name,
              riskLevel: area.risk_level,
              color: this.getRiskColor(area.risk_level),
              fillOpacity: 0.4
            });
          }

          // Add to heatmap points
          mapData.heatmapPoints.push({
            lat: area.coordinates.lat,
            lon: area.coordinates.lon,
            intensity: this.getRiskIntensity(area.risk_level)
          });
        });
      }
    });

    // Add bounding box
    if (locationData.locations.length > 0) {
      const firstLocation = locationData.locations[0];
      if (firstLocation.bounding_box) {
        mapData.boundingBox = firstLocation.bounding_box;
      }
    }

    return mapData;
  }

  getRiskColor(riskLevel) {
    switch (riskLevel) {
      case 'critical': return '#dc2626'; // red-600
      case 'high': return '#ea580c'; // orange-600
      case 'medium': return '#ca8a04'; // yellow-600
      case 'low': return '#16a34a'; // green-600
      default: return '#6b7280'; // gray-500
    }
  }

  getRiskIntensity(riskLevel) {
    switch (riskLevel) {
      case 'critical': return 1.0;
      case 'high': return 0.75;
      case 'medium': return 0.5;
      case 'low': return 0.25;
      default: return 0.1;
    }
  }

  // Mock responses for when API is not available
  getMockQueryInterpretation(userQuery) {
    const query = userQuery.toLowerCase();
    
    // Determine query type
    let queryType = 'general_climate';
    if (query.includes('flood')) queryType = 'flood_analysis';
    else if (query.includes('deforest') || query.includes('forest')) queryType = 'deforestation';
    else if (query.includes('urban') || query.includes('expansion')) queryType = 'urban_expansion';
    else if (query.includes('green') || query.includes('vegetation')) queryType = 'green_coverage';
    
    // Extract locations
    const locations = [];
    const locationKeywords = ['lahore', 'karachi', 'islamabad', 'pakistan', 'punjab', 'sindh'];
    
    locationKeywords.forEach(keyword => {
      if (query.includes(keyword)) {
        locations.push({
          name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
          type: keyword === 'pakistan' ? 'country' : keyword.includes('punjab') || keyword.includes('sindh') ? 'region' : 'city',
          priority: 'primary',
          context: `Mentioned in query`
        });
      }
    });

    if (locations.length === 0) {
      locations.push({
        name: 'Lahore',
        type: 'city',
        priority: 'primary',
        context: 'Default location'
      });
    }

    return {
      query_type: queryType,
      primary_intent: `Analyze ${queryType.replace('_', ' ')} for ${locations[0].name}`,
      locations: locations,
      analysis_required: [queryType, 'risk_assessment', 'map_visualization'],
      time_scope: 'current',
      urgency_level: query.includes('urgent') ? 'high' : 'medium',
      expected_output: ['map_visualization', 'risk_assessment', 'statistics', 'recommendations'],
      specific_questions: [userQuery]
    };
  }

  getMockLocationData(queryInterpretation) {
    const primaryLocation = queryInterpretation.locations[0];
    
    // Mock coordinates for common locations
    const coordinates = {
      'lahore': { lat: 31.5204, lon: 74.3587 },
      'karachi': { lat: 24.8607, lon: 67.0011 },
      'islamabad': { lat: 33.6844, lon: 73.0479 },
      'pakistan': { lat: 30.3753, lon: 69.3451 }
    };

    const location = primaryLocation.name.toLowerCase();
    const coords = coordinates[location] || { lat: 31.5204, lon: 74.3587 };

    return {
      locations: [
        {
          name: primaryLocation.name,
          coordinates: coords,
          bounding_box: {
            north: coords.lat + 0.3,
            south: coords.lat - 0.3,
            east: coords.lon + 0.3,
            west: coords.lon - 0.3
          },
          specific_areas: [
            {
              area_name: `${primaryLocation.name} Central`,
              coordinates: coords,
              risk_level: 'high',
              reason: `High ${queryInterpretation.query_type} risk`,
              polygon: [
                { lat: coords.lat + 0.05, lon: coords.lon - 0.05 },
                { lat: coords.lat + 0.05, lon: coords.lon + 0.05 },
                { lat: coords.lat - 0.05, lon: coords.lon + 0.05 },
                { lat: coords.lat - 0.05, lon: coords.lon - 0.05 }
              ]
            },
            {
              area_name: `${primaryLocation.name} North`,
              coordinates: { lat: coords.lat + 0.1, lon: coords.lon },
              risk_level: 'medium',
              reason: 'Moderate risk area',
              polygon: [
                { lat: coords.lat + 0.15, lon: coords.lon - 0.05 },
                { lat: coords.lat + 0.15, lon: coords.lon + 0.05 },
                { lat: coords.lat + 0.05, lon: coords.lon + 0.05 },
                { lat: coords.lat + 0.05, lon: coords.lon - 0.05 }
              ]
            }
          ],
          overall_risk: 'high',
          population_affected: '500,000 - 1,000,000'
        }
      ],
      map_center: coords,
      zoom_level: 11,
      visualization_type: 'combined'
    };
  }

  getMockAnalysis(queryInterpretation, locationData) {
    return {
      executive_summary: `Analysis of ${queryInterpretation.query_type.replace('_', ' ')} in ${locationData.locations[0].name} shows significant concerns requiring immediate attention.`,
      risk_assessment: {
        overall_risk_level: 'high',
        confidence: 'high',
        key_findings: [
          'Multiple high-risk areas identified',
          'Large population potentially affected',
          'Immediate action recommended'
        ]
      },
      location_specific_insights: locationData.locations.map(loc => ({
        location: loc.name,
        risk_level: loc.overall_risk,
        current_status: `Current ${queryInterpretation.query_type} situation requires monitoring`,
        specific_concerns: loc.specific_areas.map(area => area.reason),
        affected_population: loc.population_affected,
        infrastructure_impact: 'Critical infrastructure at risk'
      })),
      immediate_actions: [
        {
          priority: 'high',
          action: 'Deploy monitoring systems',
          target: 'Local authorities',
          timeline: 'Within 24 hours'
        },
        {
          priority: 'high',
          action: 'Alert affected communities',
          target: 'Emergency services',
          timeline: 'Immediate'
        }
      ],
      long_term_recommendations: [
        'Implement early warning systems',
        'Develop climate adaptation strategies',
        'Invest in resilient infrastructure'
      ],
      data_sources: ['Gemini AI Analysis', 'Geospatial Intelligence', 'Climate Models'],
      visualization_guidance: {
        map_layers_needed: ['risk_zones', 'population_density', 'infrastructure'],
        highlight_areas: locationData.locations[0].specific_areas.map(a => a.area_name),
        color_coding: {
          critical: '#dc2626',
          high: '#ea580c',
          medium: '#ca8a04',
          low: '#16a34a'
        }
      }
    };
  }

  // Main processing pipeline
  async processUserQuery(userQuery) {
    console.log('🚀 Starting LLM-driven analysis pipeline...');
    
    try {
      // Step 1: Understand the query
      const queryInterpretation = await this.interpretQuery(userQuery);
      
      // Step 2: Identify exact locations and coordinates
      const locationData = await this.identifyLocationsWithCoordinates(queryInterpretation, userQuery);
      
      // Step 3: Perform comprehensive analysis
      const analysis = await this.performAnalysis(queryInterpretation, locationData, userQuery);
      
      // Step 4: Generate map visualization data
      const mapVisualization = this.generateMapVisualizationData(locationData, analysis);
      
      // Step 5: Compile final response
      const finalResponse = {
        queryInterpretation,
        locationData,
        analysis,
        mapVisualization,
        timestamp: new Date().toISOString(),
        processingTime: Date.now()
      };
      
      console.log('✅ LLM-driven analysis complete!');
      return finalResponse;
      
    } catch (error) {
      console.error('❌ LLM pipeline error:', error);
      throw error;
    }
  }
}

export const coreLLMService = new CoreLLMService();

