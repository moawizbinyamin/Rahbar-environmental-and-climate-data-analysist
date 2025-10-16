# 🌍 Geospatial APIs Setup Guide

## 🎯 **REAL GEOSPATIAL DATA INTEGRATION**

Your AlphaEarth Climate Console now integrates with **real geospatial data sources**! Here's how to set up the free APIs:

## 🔑 **REQUIRED API KEYS:**

### 1. **OpenWeatherMap API** (Optional but Recommended)
- **Purpose**: Real weather data, forecasts, and climate information
- **Cost**: Free tier available (1000 calls/day)
- **Setup**:
  1. Go to [OpenWeatherMap](https://openweathermap.org/api)
  2. Sign up for a free account
  3. Get your API key from the dashboard
  4. Add to `.env`: `VITE_OPENWEATHER_API_KEY=your-api-key`

### 2. **Nominatim API** (Free - No Key Required)
- **Purpose**: Geocoding and reverse geocoding
- **Cost**: Completely free
- **Usage**: Automatic - no setup required
- **Rate Limit**: 1 request per second (respectful usage)

### 3. **Overpass API** (Free - No Key Required)
- **Purpose**: OpenStreetMap data (water bodies, green spaces, urban areas)
- **Cost**: Completely free
- **Usage**: Automatic - no setup required
- **Rate Limit**: Reasonable usage (no strict limits)

## 🌐 **INTEGRATED DATA SOURCES:**

### 🌤️ **Weather Data (OpenWeatherMap)**
- **Current Weather**: Temperature, humidity, pressure, wind
- **Forecasts**: 5-day weather forecast with 3-hour intervals
- **Rainfall Data**: Precipitation amounts and patterns
- **Climate Indicators**: Weather conditions for flood risk analysis

### 🗺️ **Geographic Data (Nominatim)**
- **Geocoding**: Convert location names to coordinates
- **Reverse Geocoding**: Convert coordinates to location names
- **Address Details**: Country, state, city information
- **Bounding Boxes**: Geographic boundaries for analysis

### 🏞️ **Environmental Data (Overpass/OpenStreetMap)**
- **Water Bodies**: Rivers, lakes, canals, ponds
- **Green Spaces**: Parks, forests, nature reserves
- **Urban Areas**: Residential, commercial, industrial zones
- **Infrastructure**: Buildings, roads, utilities

## 🚀 **HOW IT WORKS:**

### 1. **User Query Processing**
```
User: "Show me flood risk for Lahore this week"
↓
Gemini interprets intent: flood analysis
↓
Geospatial service gets real data:
- Current weather in Lahore
- 5-day forecast
- Water bodies in the area
- Geographic coordinates
↓
Gemini analyzes real data + provides insights
```

### 2. **Real Data Integration**
- **Flood Analysis**: Real rainfall data + water body locations
- **Urban Expansion**: Real building/land use data from OpenStreetMap
- **Green Expansion**: Real park/forest data from OpenStreetMap
- **Weather Analysis**: Real current conditions and forecasts

### 3. **Fallback System**
- If APIs are unavailable → Uses intelligent mock data
- If rate limits hit → Graceful degradation
- If location not found → Uses Pakistani city database

## 📊 **DATA QUALITY IMPROVEMENTS:**

### ✅ **Before (Mock Data)**
- Static, simulated data
- Generic responses
- Limited accuracy
- No real-time information

### ✅ **After (Real APIs)**
- Live weather data
- Actual geographic features
- Real-time conditions
- Location-specific insights
- Historical context

## 🔧 **SETUP INSTRUCTIONS:**

### Step 1: Get OpenWeatherMap API Key
1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Go to "API Keys" in your dashboard
4. Copy your API key
5. Add to your `.env` file:
   ```bash
   VITE_OPENWEATHER_API_KEY=your-actual-api-key
   ```

### Step 2: Test the Integration
1. Restart your development server
2. Ask: "What's the weather in Karachi?"
3. Check browser console for API calls
4. Verify real data is being fetched

### Step 3: Verify Data Sources
- **Weather**: Should show real temperature, humidity, etc.
- **Geocoding**: Should find exact coordinates for cities
- **Environmental**: Should show real water bodies and green spaces

## 🌟 **FEATURES NOW AVAILABLE:**

### 🌊 **Enhanced Flood Analysis**
- Real rainfall data from weather APIs
- Actual water body locations from OpenStreetMap
- Current weather conditions
- 5-day precipitation forecasts

### 🏙️ **Real Urban Analysis**
- Actual building and land use data
- Real green space locations
- Current urban development patterns
- Geographic feature mapping

### 🌱 **Accurate Green Analysis**
- Real park and forest locations
- Actual green space coverage
- Current environmental conditions
- Geographic distribution analysis

## 🎯 **EXAMPLE QUERIES WITH REAL DATA:**

### Weather Queries
- "What's the current temperature in Islamabad?"
- "Show me the 5-day forecast for Lahore"
- "Is it raining in Karachi right now?"

### Flood Risk Queries
- "What's the flood risk for Lahore this week?"
- "Are there any water bodies near Faisalabad?"
- "How much rain is expected in Rawalpindi?"

### Urban Analysis Queries
- "How much green space is there in Karachi?"
- "Show me urban development in Lahore"
- "What parks are near Islamabad?"

## 🔒 **PRIVACY & RATE LIMITS:**

### OpenWeatherMap
- **Free Tier**: 1000 calls/day
- **Rate Limit**: 60 calls/minute
- **Data Retention**: Not stored, only processed

### Nominatim
- **Rate Limit**: 1 request/second
- **Usage Policy**: Respectful usage only
- **No Personal Data**: Only geographic information

### Overpass API
- **Rate Limit**: Reasonable usage
- **Timeout**: 25 seconds per query
- **Public Data**: OpenStreetMap data only

## 🚨 **TROUBLESHOOTING:**

### API Key Issues
```bash
# Check if API key is loaded
console.log(import.meta.env.VITE_OPENWEATHER_API_KEY)
```

### Rate Limit Issues
- Wait a few seconds between requests
- Use fallback data when limits hit
- Consider upgrading to paid tier if needed

### Location Not Found
- Try different city names
- Use more specific locations
- Check spelling and format

## 🎉 **BENEFITS:**

### For Users
- **Real-time Data**: Live weather and conditions
- **Accurate Analysis**: Based on actual geographic features
- **Location-Specific**: Tailored to exact locations
- **Up-to-Date**: Current information, not simulated

### For Analysis
- **Better Insights**: Real data leads to better recommendations
- **Higher Confidence**: Actual conditions vs. estimates
- **Geographic Accuracy**: Real water bodies, parks, buildings
- **Weather Context**: Current and forecasted conditions

## 🌐 **Your Enhanced App:**

**URL**: https://rahbar-dcd4a.web.app

**New Capabilities**:
- 🌤️ **Real Weather Data** from OpenWeatherMap
- 🗺️ **Accurate Geocoding** from Nominatim
- 🏞️ **Environmental Data** from OpenStreetMap
- 🤖 **AI Analysis** of real geospatial data
- 📊 **Enhanced Insights** based on actual conditions

**Your AlphaEarth Climate Console now provides real, actionable insights based on live geospatial data! 🌍✨**
