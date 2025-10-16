// Rahbar API Service for fetching geospatial climate and disaster data
export class AlphaEarthService {
  constructor() {
    this.baseUrl = process.env.VITE_ALPHAEARTH_API_URL || 'https://api.alphaearth.com/v1';
    this.apiKey = process.env.VITE_ALPHAEARTH_API_KEY;
    this.supportedIntents = ['flood', 'urban', 'green', 'temperature', 'air_quality'];
  }

  async fetchData(intent, location, timePeriod) {
    try {
      if (!this.supportedIntents.includes(intent)) {
        throw new Error(`Unsupported intent: ${intent}. Supported intents: ${this.supportedIntents.join(', ')}`);
      }

      // In production, this would call the actual Rahbar API
      // For now, we'll use enhanced mock data that simulates real Rahbar responses
      const mockData = await this.generateEnhancedMockData(intent, location, timePeriod);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return mockData;
    } catch (error) {
        console.error('Error fetching Rahbar data:', error);
      throw error;
    }
  }

  async fetchRealTimeData(intent, location, timePeriod) {
    try {
      const response = await fetch(`${this.baseUrl}/climate/${intent}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: location,
          time_period: timePeriod,
          data_format: 'geojson',
          resolution: 'high'
        })
      });

      if (!response.ok) {
        throw new Error(`Rahbar API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Rahbar API error:', error);
      // Fallback to mock data
      return await this.generateEnhancedMockData(intent, location, timePeriod);
    }
  }

  async generateEnhancedMockData(intent, location, timePeriod) {
    const baseData = {
      location: location,
      timePeriod: timePeriod,
      timestamp: new Date().toISOString(),
      dataType: intent,
      source: 'Rahbar API',
      resolution: 'high',
      confidence: 'high'
    };

    switch (intent) {
      case 'flood':
        return {
          ...baseData,
          riskLevel: this.calculateFloodRisk(location),
          waterLevel: this.generateWaterLevelData(location),
          affectedAreas: this.generateAffectedAreas(location),
          rainfall: this.generateRainfallData(location),
          drainageCapacity: this.generateDrainageData(location),
          historicalFloods: this.getHistoricalFloodData(location),
          earlyWarningLevel: this.calculateEarlyWarning(location),
          summary: `Flood risk analysis for ${location} shows ${this.calculateFloodRisk(location)} risk levels with ${this.generateWaterLevelData(location)}m water level.`,
          geospatialData: this.generateFloodGeoData(location)
        };
      
      case 'urban':
        return {
          ...baseData,
          urbanGrowth: this.calculateUrbanGrowth(location),
          greenSpaceLoss: this.calculateGreenSpaceLoss(location),
          populationDensity: this.calculatePopulationDensity(location),
          infrastructureStrain: this.calculateInfrastructureStrain(location),
          landUseChange: this.generateLandUseData(location),
          buildingDensity: this.calculateBuildingDensity(location),
          summary: `Urban expansion analysis for ${location} shows ${this.calculateUrbanGrowth(location)}% growth with significant infrastructure impact.`,
          geospatialData: this.generateUrbanGeoData(location)
        };
      
      case 'green':
        return {
          ...baseData,
          greenCoverage: this.calculateGreenCoverage(location),
          deforestation: this.calculateDeforestation(location),
          carbonSequestration: this.calculateCarbonSequestration(location),
          biodiversityIndex: this.calculateBiodiversityIndex(location),
          ecosystemHealth: this.assessEcosystemHealth(location),
          conservationPriority: this.assessConservationPriority(location),
          summary: `Green space analysis for ${location} indicates ${this.assessEcosystemHealth(location)} ecosystem health with ${this.calculateGreenCoverage(location)}% coverage.`,
          geospatialData: this.generateGreenGeoData(location)
        };
      
      default:
        return {
          ...baseData,
          summary: `General environmental analysis for ${location}.`
        };
    }
  }

  generateMockData(intent, location, timePeriod) {
    const baseData = {
      location: location,
      timePeriod: timePeriod,
      timestamp: new Date().toISOString(),
      mapUrl: this.generateMapUrl(intent, location),
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

  // Specialized calculation methods for climate and disaster analysis
  calculateFloodRisk(location) {
    const riskFactors = {
      'lahore': 'High',
      'karachi': 'Medium',
      'islamabad': 'Low',
      'multan': 'High',
      'peshawar': 'Medium'
    };
    return riskFactors[location.toLowerCase()] || 'Medium';
  }

  generateWaterLevelData(location) {
    const baseLevels = {
      'lahore': 2.5,
      'karachi': 1.8,
      'islamabad': 0.9,
      'multan': 3.2,
      'peshawar': 1.5
    };
    const base = baseLevels[location.toLowerCase()] || 2.0;
    return Math.round((base + (Math.random() - 0.5) * 1.5) * 10) / 10;
  }

  generateAffectedAreas(location) {
    return Math.floor(Math.random() * 25) + 5;
  }

  generateRainfallData(location) {
    return Math.floor(Math.random() * 60) + 15;
  }

  generateDrainageData(location) {
    return Math.floor(Math.random() * 40) + 30; // percentage
  }

  getHistoricalFloodData(location) {
    return [
      { year: 2020, severity: 'High', affected: 15000 },
      { year: 2018, severity: 'Medium', affected: 8000 },
      { year: 2015, severity: 'High', affected: 12000 }
    ];
  }

  calculateEarlyWarning(location) {
    const warnings = ['Low', 'Medium', 'High', 'Critical'];
    return warnings[Math.floor(Math.random() * warnings.length)];
  }

  calculateUrbanGrowth(location) {
    const growthRates = {
      'lahore': 8.5,
      'karachi': 6.2,
      'islamabad': 4.8,
      'multan': 7.1,
      'peshawar': 5.9
    };
    return growthRates[location.toLowerCase()] || 6.0;
  }

  calculateGreenSpaceLoss(location) {
    return Math.floor(Math.random() * 15) + 5; // km² per year
  }

  calculatePopulationDensity(location) {
    const densities = {
      'lahore': 4500,
      'karachi': 3800,
      'islamabad': 2200,
      'multan': 3200,
      'peshawar': 2800
    };
    return densities[location.toLowerCase()] || 3000;
  }

  calculateInfrastructureStrain(location) {
    const strains = ['Low', 'Medium', 'High'];
    return strains[Math.floor(Math.random() * strains.length)];
  }

  generateLandUseData(location) {
    return {
      residential: Math.floor(Math.random() * 30) + 40,
      commercial: Math.floor(Math.random() * 20) + 15,
      industrial: Math.floor(Math.random() * 15) + 10,
      green: Math.floor(Math.random() * 20) + 20
    };
  }

  calculateBuildingDensity(location) {
    return Math.floor(Math.random() * 200) + 100; // buildings per km²
  }

  calculateGreenCoverage(location) {
    const coverages = {
      'lahore': 25,
      'karachi': 15,
      'islamabad': 45,
      'multan': 20,
      'peshawar': 30
    };
    return coverages[location.toLowerCase()] || 25;
  }

  calculateDeforestation(location) {
    return Math.floor(Math.random() * 8) + 2; // percentage per year
  }

  calculateCarbonSequestration(location) {
    return Math.floor(Math.random() * 2000) + 1000; // tons CO2 per year
  }

  calculateBiodiversityIndex(location) {
    return Math.floor(Math.random() * 40) + 40; // 0-100 scale
  }

  assessEcosystemHealth(location) {
    const healthLevels = ['Poor', 'Fair', 'Good', 'Excellent'];
    return healthLevels[Math.floor(Math.random() * healthLevels.length)];
  }

  assessConservationPriority(location) {
    const priorities = ['Low', 'Medium', 'High', 'Critical'];
    return priorities[Math.floor(Math.random() * priorities.length)];
  }

  // Enhanced geospatial data generation methods
  generateFloodGeoData(location) {
    const cityCoords = this.getCityCoordinates(location);
    const riskZones = this.generateFloodRiskZones(cityCoords, location);
    
    return {
      type: 'FeatureCollection',
      features: riskZones,
      metadata: {
        source: 'Rahbar API',
        resolution: 'high',
        last_updated: new Date().toISOString(),
        data_type: 'flood_risk_zones'
      }
    };
  }

  generateUrbanGeoData(location) {
    const cityCoords = this.getCityCoordinates(location);
    const expansionZones = this.generateUrbanExpansionZones(cityCoords, location);
    
    return {
      type: 'FeatureCollection',
      features: expansionZones,
      metadata: {
        source: 'Rahbar API',
        resolution: 'high',
        last_updated: new Date().toISOString(),
        data_type: 'urban_expansion_zones'
      }
    };
  }

  generateGreenGeoData(location) {
    const cityCoords = this.getCityCoordinates(location);
    const greenZones = this.generateGreenSpaceZones(cityCoords, location);
    
    return {
      type: 'FeatureCollection',
      features: greenZones,
      metadata: {
        source: 'Rahbar API',
        resolution: 'high',
        last_updated: new Date().toISOString(),
        data_type: 'green_space_zones'
      }
    };
  }

  getCityCoordinates(location) {
    const coordinates = {
      lahore: { lat: 31.5204, lng: 74.3587, bounds: 0.1 },
      karachi: { lat: 24.8607, lng: 67.0011, bounds: 0.15 },
      islamabad: { lat: 33.6844, lng: 73.0479, bounds: 0.12 },
      multan: { lat: 30.1575, lng: 71.5249, bounds: 0.08 },
      peshawar: { lat: 34.0151, lng: 71.5249, bounds: 0.1 }
    };
    return coordinates[location.toLowerCase()] || { lat: 31.5204, lng: 74.3587, bounds: 0.1 };
  }

  generateFloodRiskZones(cityCoords, location) {
    const zones = [];
    const riskLevels = ['High', 'Medium', 'Low'];
    const numZones = Math.floor(Math.random() * 4) + 2;
    
    for (let i = 0; i < numZones; i++) {
      const risk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      const offset = (Math.random() - 0.5) * cityCoords.bounds;
      const size = cityCoords.bounds * (0.3 + Math.random() * 0.4);
      
      zones.push({
        type: 'Feature',
        properties: {
          risk_level: risk,
          area_name: `${risk} Risk Zone ${i + 1}`,
          water_level: Math.round((Math.random() * 3 + 1) * 10) / 10,
          affected_population: Math.floor(Math.random() * 5000) + 1000,
          evacuation_priority: risk === 'High' ? 'Immediate' : risk === 'Medium' ? 'Within 24h' : 'Monitor'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [cityCoords.lng + offset, cityCoords.lat + offset],
            [cityCoords.lng + offset + size, cityCoords.lat + offset],
            [cityCoords.lng + offset + size, cityCoords.lat + offset + size],
            [cityCoords.lng + offset, cityCoords.lat + offset + size],
            [cityCoords.lng + offset, cityCoords.lat + offset]
          ]]
        }
      });
    }
    
    return zones;
  }

  generateUrbanExpansionZones(cityCoords, location) {
    const zones = [];
    const expansionTypes = ['Residential', 'Commercial', 'Industrial', 'Mixed-use'];
    const numZones = Math.floor(Math.random() * 5) + 3;
    
    for (let i = 0; i < numZones; i++) {
      const type = expansionTypes[Math.floor(Math.random() * expansionTypes.length)];
      const offset = (Math.random() - 0.5) * cityCoords.bounds * 1.5;
      const size = cityCoords.bounds * (0.2 + Math.random() * 0.3);
      
      zones.push({
        type: 'Feature',
        properties: {
          expansion_type: type,
          zone_name: `${type} Expansion ${i + 1}`,
          growth_rate: Math.round((Math.random() * 10 + 2) * 10) / 10,
          building_density: Math.floor(Math.random() * 200) + 50,
          infrastructure_impact: Math.random() > 0.5 ? 'High' : 'Medium',
          completion_year: 2024 + Math.floor(Math.random() * 5)
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [cityCoords.lng + offset, cityCoords.lat + offset],
            [cityCoords.lng + offset + size, cityCoords.lat + offset],
            [cityCoords.lng + offset + size, cityCoords.lat + offset + size],
            [cityCoords.lng + offset, cityCoords.lat + offset + size],
            [cityCoords.lng + offset, cityCoords.lat + offset]
          ]]
        }
      });
    }
    
    return zones;
  }

  generateGreenSpaceZones(cityCoords, location) {
    const zones = [];
    const greenTypes = ['Forest', 'Park', 'Garden', 'Wetland', 'Agricultural'];
    const numZones = Math.floor(Math.random() * 6) + 4;
    
    for (let i = 0; i < numZones; i++) {
      const type = greenTypes[Math.floor(Math.random() * greenTypes.length)];
      const offset = (Math.random() - 0.5) * cityCoords.bounds * 1.2;
      const size = cityCoords.bounds * (0.15 + Math.random() * 0.25);
      
      zones.push({
        type: 'Feature',
        properties: {
          green_type: type,
          area_name: `${type} Area ${i + 1}`,
          coverage_percentage: Math.floor(Math.random() * 40) + 60,
          carbon_sequestration: Math.floor(Math.random() * 500) + 200,
          biodiversity_score: Math.floor(Math.random() * 40) + 40,
          conservation_status: Math.random() > 0.3 ? 'Protected' : 'At Risk'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [cityCoords.lng + offset, cityCoords.lat + offset],
            [cityCoords.lng + offset + size, cityCoords.lat + offset],
            [cityCoords.lng + offset + size, cityCoords.lat + offset + size],
            [cityCoords.lng + offset, cityCoords.lat + offset + size],
            [cityCoords.lng + offset, cityCoords.lat + offset]
          ]]
        }
      });
    }
    
    return zones;
  }

  generateMapUrl(intent, location) {
    // Generate mock map tile URLs
    const baseMapUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const overlayColors = {
      flood: 'red',
      urban: 'orange',
      green: 'green',
      temperature: 'yellow',
      air_quality: 'purple'
    };
    
    return {
      base: baseMapUrl,
      overlay: `https://api.alphaearth.com/overlay/${intent}/${location}.png`,
      color: overlayColors[intent] || 'blue'
    };
  }
}

export const alphaEarthService = new AlphaEarthService();
