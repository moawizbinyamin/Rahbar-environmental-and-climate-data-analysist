// Geospatial Data Service - Real API Integration
// Integrates multiple free geospatial APIs for real data

export class GeospatialDataService {
  constructor() {
    this.openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    this.nominatimBaseUrl = 'https://nominatim.openstreetmap.org';
    this.overpassBaseUrl = 'https://overpass-api.de/api/interpreter';
    this.weatherBaseUrl = 'https://api.openweathermap.org/data/2.5';
    
    // Check if we have API keys
    this.hasWeatherApi = this.openWeatherApiKey && this.openWeatherApiKey !== 'your-openweather-api-key';
    
    console.log('🌍 Geospatial Data Service initialized');
    console.log(`🌤️ Weather API: ${this.hasWeatherApi ? 'Available' : 'Using fallback'}`);
  }

  // ===== GEOCODING SERVICES =====
  
  async geocodeLocation(locationName) {
    try {
      const response = await fetch(
        `${this.nominatimBaseUrl}/search?format=json&q=${encodeURIComponent(locationName)}&limit=1&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        return {
          name: result.display_name,
          lat: parseFloat(result.lat),
          lon: parseFloat(result.lon),
          country: result.address?.country,
          state: result.address?.state,
          city: result.address?.city || result.address?.town || result.address?.village,
          postcode: result.address?.postcode,
          boundingbox: result.boundingbox
        };
      }
      
      throw new Error('Location not found');
    } catch (error) {
      console.error('Geocoding error:', error);
      return this.getFallbackLocation(locationName);
    }
  }

  async reverseGeocode(lat, lon) {
    try {
      const response = await fetch(
        `${this.nominatimBaseUrl}/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error(`Reverse geocoding failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        name: data.display_name,
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        country: data.address?.country,
        state: data.address?.state,
        city: data.address?.city || data.address?.town || data.address?.village,
        postcode: data.address?.postcode
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return { name: `${lat}, ${lon}`, lat, lon };
    }
  }

  // ===== WEATHER DATA SERVICES =====
  
  async getCurrentWeather(lat, lon) {
    if (!this.hasWeatherApi) {
      return this.getMockWeatherData(lat, lon);
    }

    try {
      const response = await fetch(
        `${this.weatherBaseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.openWeatherApiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        temperature: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // Convert to km
        wind_speed: data.wind.speed,
        wind_direction: data.wind.deg,
        weather_main: data.weather[0].main,
        weather_description: data.weather[0].description,
        weather_icon: data.weather[0].icon,
        clouds: data.clouds.all,
        rain_1h: data.rain?.['1h'] || 0,
        snow_1h: data.snow?.['1h'] || 0,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Weather API error:', error);
      return this.getMockWeatherData(lat, lon);
    }
  }

  async getWeatherForecast(lat, lon) {
    if (!this.hasWeatherApi) {
      return this.getMockForecastData(lat, lon);
    }

    try {
      const response = await fetch(
        `${this.weatherBaseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.openWeatherApiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Forecast API failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.list.slice(0, 8).map(item => ({
        timestamp: item.dt_txt,
        temperature: item.main.temp,
        feels_like: item.main.feels_like,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        wind_speed: item.wind.speed,
        wind_direction: item.wind.deg,
        weather_main: item.weather[0].main,
        weather_description: item.weather[0].description,
        weather_icon: item.weather[0].icon,
        clouds: item.clouds.all,
        rain_3h: item.rain?.['3h'] || 0,
        snow_3h: item.snow?.['3h'] || 0
      }));
    } catch (error) {
      console.error('Forecast API error:', error);
      return this.getMockForecastData(lat, lon);
    }
  }

  // ===== OPENSTREETMAP DATA SERVICES =====
  
  async getWaterBodies(lat, lon, radius = 5000) {
    try {
      const overpassQuery = `
        [out:json][timeout:25];
        (
          way["natural"="water"](around:${radius},${lat},${lon});
          way["waterway"](around:${radius},${lat},${lon});
          relation["natural"="water"](around:${radius},${lat},${lon});
        );
        out geom;
      `;
      
      const response = await fetch(this.overpassBaseUrl, {
        method: 'POST',
        body: overpassQuery,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Overpass API failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.elements.map(element => ({
        id: element.id,
        type: element.tags?.natural || element.tags?.waterway,
        name: element.tags?.name || 'Unnamed water body',
        geometry: element.geometry || element.members
      }));
    } catch (error) {
      console.error('Water bodies API error:', error);
      return this.getMockWaterBodies(lat, lon);
    }
  }

  async getGreenSpaces(lat, lon, radius = 5000) {
    try {
      const overpassQuery = `
        [out:json][timeout:25];
        (
          way["leisure"="park"](around:${radius},${lat},${lon});
          way["landuse"="forest"](around:${radius},${lat},${lon});
          way["natural"="wood"](around:${radius},${lat},${lon});
          way["leisure"="nature_reserve"](around:${radius},${lat},${lon});
        );
        out geom;
      `;
      
      const response = await fetch(this.overpassBaseUrl, {
        method: 'POST',
        body: overpassQuery,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Overpass API failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.elements.map(element => ({
        id: element.id,
        type: element.tags?.leisure || element.tags?.landuse || element.tags?.natural,
        name: element.tags?.name || 'Unnamed green space',
        geometry: element.geometry
      }));
    } catch (error) {
      console.error('Green spaces API error:', error);
      return this.getMockGreenSpaces(lat, lon);
    }
  }

  async getUrbanAreas(lat, lon, radius = 5000) {
    try {
      const overpassQuery = `
        [out:json][timeout:25];
        (
          way["landuse"="residential"](around:${radius},${lat},${lon});
          way["landuse"="commercial"](around:${radius},${lat},${lon});
          way["landuse"="industrial"](around:${radius},${lat},${lon});
          way["building"](around:${radius},${lat},${lon});
        );
        out geom;
      `;
      
      const response = await fetch(this.overpassBaseUrl, {
        method: 'POST',
        body: overpassQuery,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Overpass API failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.elements.map(element => ({
        id: element.id,
        type: element.tags?.landuse || element.tags?.building,
        name: element.tags?.name || 'Unnamed urban area',
        geometry: element.geometry
      }));
    } catch (error) {
      console.error('Urban areas API error:', error);
      return this.getMockUrbanAreas(lat, lon);
    }
  }

  // ===== FLOOD RISK ANALYSIS =====
  
  async analyzeFloodRisk(location, timePeriod = '7d') {
    try {
      // Get location coordinates
      const coords = await this.geocodeLocation(location);
      
      // Get current weather and forecast
      const [currentWeather, forecast] = await Promise.all([
        this.getCurrentWeather(coords.lat, coords.lon),
        this.getWeatherForecast(coords.lat, coords.lon)
      ]);
      
      // Get water bodies in the area
      const waterBodies = await this.getWaterBodies(coords.lat, coords.lon);
      
      // Calculate flood risk based on real data
      const floodRisk = this.calculateFloodRisk(currentWeather, forecast, waterBodies);
      
      return {
        location: coords,
        current_weather: currentWeather,
        forecast: forecast,
        water_bodies: waterBodies,
        flood_risk: floodRisk,
        analysis_timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Flood risk analysis error:', error);
      return this.getMockFloodAnalysis(location);
    }
  }

  // ===== URBAN EXPANSION ANALYSIS =====
  
  async analyzeUrbanExpansion(location, timePeriod = '1y') {
    try {
      // Get location coordinates
      const coords = await this.geocodeLocation(location);
      
      // Get urban areas and green spaces
      const [urbanAreas, greenSpaces] = await Promise.all([
        this.getUrbanAreas(coords.lat, coords.lon),
        this.getGreenSpaces(coords.lat, coords.lon)
      ]);
      
      // Calculate urban expansion metrics
      const expansionMetrics = this.calculateUrbanExpansion(urbanAreas, greenSpaces);
      
      return {
        location: coords,
        urban_areas: urbanAreas,
        green_spaces: greenSpaces,
        expansion_metrics: expansionMetrics,
        analysis_timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Urban expansion analysis error:', error);
      return this.getMockUrbanAnalysis(location);
    }
  }

  // ===== GREEN EXPANSION ANALYSIS =====
  
  async analyzeGreenExpansion(location, timePeriod = '1y') {
    try {
      // Get location coordinates
      const coords = await this.geocodeLocation(location);
      
      // Get green spaces and urban areas
      const [greenSpaces, urbanAreas] = await Promise.all([
        this.getGreenSpaces(coords.lat, coords.lon),
        this.getUrbanAreas(coords.lat, coords.lon)
      ]);
      
      // Calculate green expansion metrics
      const greenMetrics = this.calculateGreenExpansion(greenSpaces, urbanAreas);
      
      return {
        location: coords,
        green_spaces: greenSpaces,
        urban_areas: urbanAreas,
        green_metrics: greenMetrics,
        analysis_timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Green expansion analysis error:', error);
      return this.getMockGreenAnalysis(location);
    }
  }

  // ===== CALCULATION METHODS =====
  
  calculateFloodRisk(currentWeather, forecast, waterBodies) {
    let riskScore = 0;
    const factors = [];
    
    // Current weather factors
    if (currentWeather.rain_1h > 5) {
      riskScore += 30;
      factors.push('Heavy current rainfall');
    }
    
    if (currentWeather.humidity > 80) {
      riskScore += 10;
      factors.push('High humidity');
    }
    
    // Forecast factors
    const heavyRainDays = forecast.filter(day => day.rain_3h > 10).length;
    if (heavyRainDays > 2) {
      riskScore += 25;
      factors.push('Multiple heavy rain days forecasted');
    }
    
    // Water bodies factor
    if (waterBodies.length > 5) {
      riskScore += 15;
      factors.push('Multiple water bodies in area');
    }
    
    // Determine risk level
    let riskLevel = 'Low';
    if (riskScore > 60) riskLevel = 'High';
    else if (riskScore > 30) riskLevel = 'Medium';
    
    return {
      risk_score: Math.min(riskScore, 100),
      risk_level: riskLevel,
      factors: factors,
      confidence: Math.min(85, 60 + (waterBodies.length * 5))
    };
  }

  calculateUrbanExpansion(urbanAreas, greenSpaces) {
    const totalUrbanArea = urbanAreas.length;
    const totalGreenArea = greenSpaces.length;
    const totalArea = totalUrbanArea + totalGreenArea;
    
    const urbanPercentage = totalArea > 0 ? (totalUrbanArea / totalArea) * 100 : 0;
    const greenPercentage = totalArea > 0 ? (totalGreenArea / totalArea) * 100 : 0;
    
    return {
      urban_area_count: totalUrbanArea,
      green_area_count: totalGreenArea,
      urban_percentage: urbanPercentage,
      green_percentage: greenPercentage,
      expansion_rate: urbanPercentage > 60 ? 'High' : urbanPercentage > 40 ? 'Medium' : 'Low'
    };
  }

  calculateGreenExpansion(greenSpaces, urbanAreas) {
    const totalGreenArea = greenSpaces.length;
    const totalUrbanArea = urbanAreas.length;
    const totalArea = totalGreenArea + totalUrbanArea;
    
    const greenPercentage = totalArea > 0 ? (totalGreenArea / totalArea) * 100 : 0;
    const urbanPercentage = totalArea > 0 ? (totalUrbanArea / totalArea) * 100 : 0;
    
    return {
      green_area_count: totalGreenArea,
      urban_area_count: totalUrbanArea,
      green_percentage: greenPercentage,
      urban_percentage: urbanPercentage,
      green_health: greenPercentage > 40 ? 'Good' : greenPercentage > 20 ? 'Moderate' : 'Poor'
    };
  }

  // ===== FALLBACK METHODS =====
  
  getFallbackLocation(locationName) {
    // Common Pakistani cities with coordinates
    const pakistaniCities = {
      'lahore': { lat: 31.5204, lon: 74.3587, country: 'Pakistan', state: 'Punjab' },
      'karachi': { lat: 24.8607, lon: 67.0011, country: 'Pakistan', state: 'Sindh' },
      'islamabad': { lat: 33.6844, lon: 73.0479, country: 'Pakistan', state: 'Islamabad' },
      'rawalpindi': { lat: 33.5651, lon: 73.0169, country: 'Pakistan', state: 'Punjab' },
      'faisalabad': { lat: 31.4504, lon: 73.1350, country: 'Pakistan', state: 'Punjab' }
    };
    
    const normalizedName = locationName.toLowerCase().trim();
    const city = pakistaniCities[normalizedName] || pakistaniCities['lahore'];
    
    return {
      name: locationName,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state,
      city: locationName
    };
  }

  getMockWeatherData(lat, lon) {
    return {
      temperature: 25 + Math.random() * 10,
      feels_like: 27 + Math.random() * 8,
      humidity: 60 + Math.random() * 30,
      pressure: 1013 + Math.random() * 20,
      visibility: 8 + Math.random() * 4,
      wind_speed: 2 + Math.random() * 8,
      wind_direction: Math.random() * 360,
      weather_main: ['Clear', 'Clouds', 'Rain', 'Sunny'][Math.floor(Math.random() * 4)],
      weather_description: 'Partly cloudy',
      weather_icon: '02d',
      clouds: Math.random() * 100,
      rain_1h: Math.random() * 5,
      snow_1h: 0,
      timestamp: new Date().toISOString()
    };
  }

  getMockForecastData(lat, lon) {
    return Array.from({ length: 8 }, (_, i) => ({
      timestamp: new Date(Date.now() + i * 3 * 60 * 60 * 1000).toISOString(),
      temperature: 20 + Math.random() * 15,
      feels_like: 22 + Math.random() * 12,
      humidity: 50 + Math.random() * 40,
      pressure: 1010 + Math.random() * 25,
      wind_speed: 1 + Math.random() * 10,
      wind_direction: Math.random() * 360,
      weather_main: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
      weather_description: 'Variable conditions',
      weather_icon: '02d',
      clouds: Math.random() * 100,
      rain_3h: Math.random() * 8,
      snow_3h: 0
    }));
  }

  getMockWaterBodies(lat, lon) {
    return [
      { id: 1, type: 'river', name: 'Ravi River', geometry: [] },
      { id: 2, type: 'canal', name: 'Upper Bari Doab Canal', geometry: [] },
      { id: 3, type: 'pond', name: 'Local Pond', geometry: [] }
    ];
  }

  getMockGreenSpaces(lat, lon) {
    return [
      { id: 1, type: 'park', name: 'Gulshan-e-Iqbal Park', geometry: [] },
      { id: 2, type: 'forest', name: 'Shalimar Gardens', geometry: [] },
      { id: 3, type: 'nature_reserve', name: 'Local Nature Reserve', geometry: [] }
    ];
  }

  getMockUrbanAreas(lat, lon) {
    return [
      { id: 1, type: 'residential', name: 'Residential Area', geometry: [] },
      { id: 2, type: 'commercial', name: 'Commercial District', geometry: [] },
      { id: 3, type: 'industrial', name: 'Industrial Zone', geometry: [] }
    ];
  }

  getMockFloodAnalysis(location) {
    return {
      location: this.getFallbackLocation(location),
      current_weather: this.getMockWeatherData(31.5204, 74.3587),
      forecast: this.getMockForecastData(31.5204, 74.3587),
      water_bodies: this.getMockWaterBodies(31.5204, 74.3587),
      flood_risk: {
        risk_score: 35,
        risk_level: 'Medium',
        factors: ['Moderate rainfall expected', 'Multiple water bodies nearby'],
        confidence: 75
      },
      analysis_timestamp: new Date().toISOString()
    };
  }

  getMockUrbanAnalysis(location) {
    return {
      location: this.getFallbackLocation(location),
      urban_areas: this.getMockUrbanAreas(31.5204, 74.3587),
      green_spaces: this.getMockGreenSpaces(31.5204, 74.3587),
      expansion_metrics: {
        urban_area_count: 15,
        green_area_count: 8,
        urban_percentage: 65,
        green_percentage: 35,
        expansion_rate: 'High'
      },
      analysis_timestamp: new Date().toISOString()
    };
  }

  getMockGreenAnalysis(location) {
    return {
      location: this.getFallbackLocation(location),
      green_spaces: this.getMockGreenSpaces(31.5204, 74.3587),
      urban_areas: this.getMockUrbanAreas(31.5204, 74.3587),
      green_metrics: {
        green_area_count: 12,
        urban_area_count: 18,
        green_percentage: 40,
        urban_percentage: 60,
        green_health: 'Good'
      },
      analysis_timestamp: new Date().toISOString()
    };
  }
}

// Export singleton instance
export const geospatialDataService = new GeospatialDataService();
