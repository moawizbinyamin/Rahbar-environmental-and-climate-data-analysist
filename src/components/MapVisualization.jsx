import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON, Circle } from 'react-leaflet';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, TrendingUp, TrendingDown, Layers } from 'lucide-react';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

const MapVisualization = ({ analysisData, isLoading }) => {
  const [mapCenter, setMapCenter] = useState([31.5204, 74.3587]); // Default to Lahore
  const [mapZoom, setMapZoom] = useState(10);
  const [markers, setMarkers] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [showAreas, setShowAreas] = useState(true);

  useEffect(() => {
    if (analysisData && analysisData.mapVisualization) {
      console.log('🗺️ Rendering LLM-generated map visualization...');
      
      // Use LLM-provided map center and zoom
      const mapViz = analysisData.mapVisualization;
      
      if (mapViz.center) {
        setMapCenter([mapViz.center.lat, mapViz.center.lon]);
        setMapZoom(mapViz.zoom || 10);
      }
      
      // Generate markers from LLM-identified locations
      const newMarkers = generateMarkersFromLLM(mapViz);
      setMarkers(newMarkers);
      
      // Generate GeoJSON polygons from LLM-identified areas
      const geoData = generateGeoJsonFromLLM(mapViz);
      setGeoJsonData(geoData);
      
      console.log('✅ Map updated with LLM-generated data');
    }
  }, [analysisData]);

  // Generate markers from LLM-provided location data
  const generateMarkersFromLLM = (mapViz) => {
    const markers = [];
    
    if (mapViz.markers && mapViz.markers.length > 0) {
      mapViz.markers.forEach(marker => {
        markers.push({
          position: marker.position,
          type: marker.type,
          title: marker.name,
          riskLevel: marker.riskLevel,
          populationAffected: marker.populationAffected,
          reason: marker.reason,
          data: marker
        });
      });
    }
    
    return markers;
  };

  // Generate GeoJSON from LLM-provided polygon data
  const generateGeoJsonFromLLM = (mapViz) => {
    if (!mapViz.polygons || mapViz.polygons.length === 0) {
      return null;
    }

    const features = mapViz.polygons.map(polygon => ({
      type: 'Feature',
      properties: {
        name: polygon.name,
        riskLevel: polygon.riskLevel,
        color: polygon.color,
        fillOpacity: polygon.fillOpacity || 0.4
      },
      geometry: {
        type: 'Polygon',
        coordinates: [polygon.positions.map(pos => [pos[1], pos[0]])] // [lon, lat] for GeoJSON
      }
    }));

    return {
      type: 'FeatureCollection',
      features: features
    };
  };

  const generateMarkers = (data, center) => {
    const markers = [];
    
    // Main location marker
    markers.push({
      position: center,
      type: 'main',
      data: data,
      title: data.location
    });
    
    // Add additional markers based on data type
    if (data.alphaEarthData) {
      const alphaData = data.alphaEarthData;
      
      // Add risk markers for flood data
      if (data.intent === 'flood' && alphaData.affectedAreas) {
        for (let i = 0; i < Math.min(alphaData.affectedAreas, 5); i++) {
          const offset = (Math.random() - 0.5) * 0.1;
          markers.push({
            position: [center[0] + offset, center[1] + offset],
            type: 'risk',
            data: { risk: 'High', area: `Area ${i + 1}` },
            title: `High Risk Area ${i + 1}`
          });
        }
      }
      
      // Add urban growth markers
      if (data.intent === 'urban' && alphaData.urbanGrowth) {
        for (let i = 0; i < Math.min(Math.floor(alphaData.urbanGrowth / 2), 3); i++) {
          const offset = (Math.random() - 0.5) * 0.15;
          markers.push({
            position: [center[0] + offset, center[1] + offset],
            type: 'urban',
            data: { growth: alphaData.urbanGrowth, density: alphaData.populationDensity },
            title: `Urban Expansion ${i + 1}`
          });
        }
      }
    }
    
    return markers;
  };

  const generateGeoJsonData = (data, center) => {
    if (!data || !data.alphaEarthData) return null;
    
    const features = [];
    const alphaData = data.alphaEarthData;
    
    // Generate flood risk zones
    if (data.intent === 'flood') {
      const numZones = Math.min(alphaData.affectedAreas || 3, 5);
      for (let i = 0; i < numZones; i++) {
        const offset = (Math.random() - 0.5) * 0.08;
        const size = 0.02 + Math.random() * 0.03;
        const riskLevel = ['High', 'Medium', 'Low'][i % 3];
        
        features.push({
          type: 'Feature',
          properties: {
            risk_level: riskLevel,
            area_name: `${riskLevel} Risk Zone ${i + 1}`,
            water_level: (Math.random() * 3 + 1).toFixed(1),
            affected_population: Math.floor(Math.random() * 5000) + 1000,
            evacuation_priority: riskLevel === 'High' ? 'Immediate' : riskLevel === 'Medium' ? 'Within 24h' : 'Monitor'
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [center[1] + offset, center[0] + offset],
              [center[1] + offset + size, center[0] + offset],
              [center[1] + offset + size, center[0] + offset + size],
              [center[1] + offset, center[0] + offset + size],
              [center[1] + offset, center[0] + offset]
            ]]
          }
        });
      }
    }
    
    // Generate urban expansion zones
    if (data.intent === 'urban') {
      const numZones = Math.min(Math.floor((alphaData.urbanGrowth || 5) / 2), 4);
      const expansionTypes = ['Residential', 'Commercial', 'Industrial', 'Mixed-use'];
      
      for (let i = 0; i < numZones; i++) {
        const offset = (Math.random() - 0.5) * 0.12;
        const size = 0.015 + Math.random() * 0.025;
        const type = expansionTypes[i % expansionTypes.length];
        
        features.push({
          type: 'Feature',
          properties: {
            expansion_type: type,
            zone_name: `${type} Expansion ${i + 1}`,
            growth_rate: (Math.random() * 10 + 2).toFixed(1),
            building_density: Math.floor(Math.random() * 200) + 50,
            infrastructure_impact: Math.random() > 0.5 ? 'High' : 'Medium',
            completion_year: 2024 + Math.floor(Math.random() * 5)
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [center[1] + offset, center[0] + offset],
              [center[1] + offset + size, center[0] + offset],
              [center[1] + offset + size, center[0] + offset + size],
              [center[1] + offset, center[0] + offset + size],
              [center[1] + offset, center[0] + offset]
            ]]
          }
        });
      }
    }
    
    // Generate green space zones
    if (data.intent === 'green') {
      const numZones = Math.min(Math.floor((alphaData.greenCoverage || 30) / 10), 6);
      const greenTypes = ['Forest', 'Park', 'Garden', 'Wetland', 'Agricultural'];
      
      for (let i = 0; i < numZones; i++) {
        const offset = (Math.random() - 0.5) * 0.1;
        const size = 0.01 + Math.random() * 0.02;
        const type = greenTypes[i % greenTypes.length];
        
        features.push({
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
              [center[1] + offset, center[0] + offset],
              [center[1] + offset + size, center[0] + offset],
              [center[1] + offset + size, center[0] + offset + size],
              [center[1] + offset, center[0] + offset + size],
              [center[1] + offset, center[0] + offset]
            ]]
          }
        });
      }
    }
    
    return {
      type: 'FeatureCollection',
      features: features
    };
  };

  const getAreaStyle = (feature) => {
    const properties = feature.properties;
    
    if (analysisData?.intent === 'flood') {
      return {
        fillColor: properties.risk_level === 'High' ? '#e74c3c' : 
                  properties.risk_level === 'Medium' ? '#f39c12' : '#27ae60',
        weight: 3,
        opacity: 1,
        color: '#ffffff',
        dashArray: '5, 5',
        fillOpacity: 0.7
      };
    } else if (analysisData?.intent === 'urban') {
      return {
        fillColor: properties.expansion_type === 'Residential' ? '#3498db' :
                  properties.expansion_type === 'Commercial' ? '#e67e22' :
                  properties.expansion_type === 'Industrial' ? '#e74c3c' : '#9b59b6',
        weight: 3,
        opacity: 1,
        color: '#ffffff',
        dashArray: '5, 5',
        fillOpacity: 0.7
      };
    } else if (analysisData?.intent === 'green') {
      return {
        fillColor: properties.green_type === 'Forest' ? '#27ae60' :
                  properties.green_type === 'Park' ? '#2ecc71' :
                  properties.green_type === 'Garden' ? '#16a085' : 
                  properties.green_type === 'Wetland' ? '#1abc9c' : '#52c41a',
        weight: 3,
        opacity: 1,
        color: '#ffffff',
        dashArray: '5, 5',
        fillOpacity: 0.7
      };
    }
    
    return {
      fillColor: '#3498db',
      weight: 3,
      opacity: 1,
      color: '#ffffff',
      dashArray: '5, 5',
      fillOpacity: 0.7
    };
  };

  const getAreaPopup = (feature) => {
    const properties = feature.properties;
    
    if (analysisData?.intent === 'flood') {
      return `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; min-width: 250px; padding: 5px;">
          <h3 style="margin: 0 0 12px 0; color: #2c3e50; font-size: 16px; border-bottom: 2px solid #ecf0f1; padding-bottom: 8px;">${properties.area_name}</h3>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Risk Level:</strong> 
            <span style="color: ${properties.risk_level === 'High' ? '#e74c3c' : properties.risk_level === 'Medium' ? '#f39c12' : '#27ae60'}; font-weight: bold; margin-left: 5px;">${properties.risk_level}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Water Level:</strong> ${properties.water_level}m
          </div>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Affected Population:</strong> ${properties.affected_population.toLocaleString()}
          </div>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Evacuation Priority:</strong> 
            <span style="color: ${properties.evacuation_priority === 'Immediate' ? '#e74c3c' : properties.evacuation_priority === 'Within 24h' ? '#f39c12' : '#27ae60'}; font-weight: bold;">${properties.evacuation_priority}</span>
          </div>
        </div>
      `;
    } else if (analysisData?.intent === 'urban') {
      return `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; min-width: 250px; padding: 5px;">
          <h3 style="margin: 0 0 12px 0; color: #2c3e50; font-size: 16px; border-bottom: 2px solid #ecf0f1; padding-bottom: 8px;">${properties.zone_name}</h3>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Type:</strong> ${properties.expansion_type}
          </div>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Growth Rate:</strong> ${properties.growth_rate}% per year
          </div>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Building Density:</strong> ${properties.building_density} units/km²
          </div>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Infrastructure Impact:</strong> 
            <span style="color: ${properties.infrastructure_impact === 'High' ? '#e74c3c' : '#f39c12'}; font-weight: bold;">${properties.infrastructure_impact}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Completion Year:</strong> ${properties.completion_year}
          </div>
        </div>
      `;
    } else if (analysisData?.intent === 'green') {
      return `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; min-width: 250px; padding: 5px;">
          <h3 style="margin: 0 0 12px 0; color: #2c3e50; font-size: 16px; border-bottom: 2px solid #ecf0f1; padding-bottom: 8px;">${properties.area_name}</h3>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Type:</strong> ${properties.green_type}
          </div>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Coverage:</strong> ${properties.coverage_percentage}%
          </div>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Carbon Sequestration:</strong> ${properties.carbon_sequestration} tons CO₂/year
          </div>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Biodiversity Score:</strong> ${properties.biodiversity_score}/100
          </div>
          <div style="margin-bottom: 8px;">
            <strong style="color: #34495e;">Conservation Status:</strong> 
            <span style="color: ${properties.conservation_status === 'Protected' ? '#27ae60' : '#e74c3c'}; font-weight: bold;">${properties.conservation_status}</span>
          </div>
        </div>
      `;
    }
    
    return `<div>Area: ${properties.area_name || 'Unknown'}</div>`;
  };

  const getMarkerIcon = (type) => {
    const colors = {
      main: '#3a9d3a',
      risk: '#ef4444',
      urban: '#f59e0b',
      green: '#10b981'
    };
    
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${colors[type] || '#3a9d3a'};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

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

  return (
    <div className="h-full bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-earth-500" />
              Geospatial Analysis
            </h3>
            {analysisData && (
              <p className="text-sm text-gray-600">
                {analysisData.intent} analysis for {analysisData.location}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowAreas(!showAreas)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              showAreas 
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            {showAreas ? 'Hide Areas' : 'Show Areas'}
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-96 relative">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <MapUpdater center={mapCenter} zoom={mapZoom} />
          
          {/* Render GeoJSON areas if enabled */}
          {showAreas && geoJsonData && (
            <GeoJSON
              data={geoJsonData}
              style={getAreaStyle}
              onEachFeature={(feature, layer) => {
                layer.bindPopup(getAreaPopup(feature));
              }}
            />
          )}
          
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={getMarkerIcon(marker.type)}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold text-sm">{marker.title}</h4>
                  {marker.type === 'main' && marker.data.llmSummary && (
                    <div className="mt-2">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(marker.data.llmSummary.risk_level)}`}>
                        {marker.data.llmSummary.risk_level} Risk
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {marker.data.llmSummary.summary}
                      </p>
                    </div>
                  )}
                  {marker.type === 'risk' && (
                    <div className="mt-2">
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertTriangle className="w-3 h-3" />
                        <span className="text-xs font-medium">High Risk Zone</span>
                      </div>
                    </div>
                  )}
                  {marker.type === 'urban' && (
                    <div className="mt-2">
                      <div className="flex items-center gap-1 text-orange-600">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-medium">Urban Growth</span>
                      </div>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Analysis Summary */}
      {analysisData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-t border-gray-200 bg-gray-50"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Risk Assessment</span>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(analysisData.llmSummary?.risk_level)}`}>
                {analysisData.llmSummary?.risk_level || 'Unknown'}
              </div>
            </div>
            
            {analysisData.alphaEarthData && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                {analysisData.alphaEarthData.riskLevel && (
                  <div className="bg-white p-2 rounded">
                    <span className="text-gray-500">Risk Level</span>
                    <div className="font-medium">{analysisData.alphaEarthData.riskLevel}</div>
                  </div>
                )}
                {analysisData.alphaEarthData.waterLevel && (
                  <div className="bg-white p-2 rounded">
                    <span className="text-gray-500">Water Level</span>
                    <div className="font-medium">{analysisData.alphaEarthData.waterLevel}m</div>
                  </div>
                )}
                {analysisData.alphaEarthData.urbanGrowth && (
                  <div className="bg-white p-2 rounded">
                    <span className="text-gray-500">Urban Growth</span>
                    <div className="font-medium">{analysisData.alphaEarthData.urbanGrowth}%</div>
                  </div>
                )}
                {analysisData.alphaEarthData.greenCoverage && (
                  <div className="bg-white p-2 rounded">
                    <span className="text-gray-500">Green Coverage</span>
                    <div className="font-medium">{analysisData.alphaEarthData.greenCoverage}%</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MapVisualization;
