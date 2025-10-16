import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, Layers, Users } from 'lucide-react';
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

const EnhancedMapVisualization = ({ analysisData, isLoading, darkMode = false }) => {
  const [mapCenter, setMapCenter] = useState([31.5204, 74.3587]); // Default to Lahore
  const [mapZoom, setMapZoom] = useState(10);
  const [showAreas, setShowAreas] = useState(true);

  useEffect(() => {
    if (analysisData && analysisData.mapVisualization) {
      console.log('🗺️ Rendering LLM-generated map with pins and radius circles...');
      
      const mapViz = analysisData.mapVisualization;
      
      if (mapViz.center) {
        setMapCenter([mapViz.center.lat, mapViz.center.lon]);
        setMapZoom(mapViz.zoom || 11);
      }
      
      console.log('✅ Map updated with pins and proportional circles');
    }
  }, [analysisData]);

  // Calculate proportional radius based on risk and population
  const calculateRadius = (marker) => {
    const baseRadius = 2000; // 2km base radius
    let multiplier = 1;
    
    // Risk level multiplier (higher risk = larger radius)
    const riskLevel = marker.riskLevel?.toLowerCase();
    if (riskLevel === 'critical') multiplier = 3;
    else if (riskLevel === 'high') multiplier = 2.2;
    else if (riskLevel === 'medium') multiplier = 1.5;
    else if (riskLevel === 'low') multiplier = 1;
    
    // Population multiplier
    if (marker.populationAffected) {
      const popString = marker.populationAffected.toString().toLowerCase();
      if (popString.includes('million')) multiplier *= 2;
      else if (popString.includes('thousand')) {
        const num = parseInt(popString);
        if (num > 500) multiplier *= 1.5;
        else multiplier *= 1.2;
      }
    }
    
    return baseRadius * multiplier;
  };

  const getCircleColor = (riskLevel) => {
    const level = riskLevel?.toLowerCase();
    if (level === 'critical') return '#dc2626';
    if (level === 'high') return '#ea580c';
    if (level === 'medium') return '#ca8a04';
    if (level === 'low') return '#16a34a';
    return '#3b82f6';
  };

  const createCustomIcon = (type, riskLevel) => {
    const color = getCircleColor(riskLevel);
    const iconHtml = `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        position: relative;
      ">
        <div style="
          width: 12px;
          height: 12px;
          background-color: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "></div>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: 'custom-marker',
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40]
    });
  };

  if (isLoading) {
    return (
      <div className={`h-full flex items-center justify-center rounded-2xl ${
        darkMode ? 'bg-gray-800/90' : 'bg-white/90'
      }`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-earth-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const markers = analysisData?.mapVisualization?.markers || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`h-full rounded-2xl shadow-xl overflow-hidden ${
        darkMode ? 'bg-gray-800/90' : 'bg-white/90'
      }`}
    >
      {/* Header */}
      <div className={`p-4 border-b ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold flex items-center gap-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <MapPin className="w-5 h-5 text-earth-500" />
              Interactive Map
            </h3>
            {analysisData && (
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {analysisData.queryType?.replace('_', ' ')} • {analysisData.locations?.[0]?.name}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowAreas(!showAreas)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showAreas 
                ? darkMode 
                  ? 'bg-earth-500 text-white hover:bg-earth-600' 
                  : 'bg-earth-500 text-white hover:bg-earth-600'
                : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            {showAreas ? 'Hide Coverage' : 'Show Coverage'}
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[calc(100%-5rem)]">
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
          
          {/* Render Markers with Proportional Radius Circles */}
          {markers.map((marker, index) => {
            const radius = calculateRadius(marker);
            const circleColor = getCircleColor(marker.riskLevel);

            return (
              <React.Fragment key={index}>
                {/* Proportional Coverage Circle */}
                {showAreas && marker.riskLevel && (
                  <Circle
                    center={marker.position}
                    radius={radius}
                    pathOptions={{
                      fillColor: circleColor,
                      fillOpacity: 0.15,
                      color: circleColor,
                      weight: 2,
                      opacity: 0.7,
                      dashArray: '8, 12'
                    }}
                  >
                    <Popup>
                      <div className="p-3 min-w-[240px]">
                        <h4 className="font-semibold text-base text-gray-900 mb-2 border-b pb-2">
                          {marker.name} Area
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Risk Level:</span>
                            <span className={`px-2 py-0.5 rounded font-bold ${
                              marker.riskLevel === 'critical' ? 'bg-red-100 text-red-700' :
                              marker.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                              marker.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {marker.riskLevel?.toUpperCase()}
                            </span>
                          </div>
                          {marker.populationAffected && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                Population:
                              </span>
                              <span className="font-semibold text-gray-900">{marker.populationAffected}</span>
                            </div>
                          )}
                          {marker.reason && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-gray-700 italic">{marker.reason}</p>
                            </div>
                          )}
                          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                            <span className="text-gray-600">Coverage Radius:</span>
                            <span className="font-semibold text-earth-600">~{(radius / 1000).toFixed(1)} km</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Circle>
                )}

                {/* Custom Pin Marker */}
                <Marker
                  position={marker.position}
                  icon={createCustomIcon(marker.type, marker.riskLevel)}
                >
                  <Popup>
                    <div className="p-3 min-w-[200px]">
                      <h4 className="font-bold text-base text-gray-900 mb-2">{marker.name}</h4>
                      {marker.riskLevel && (
                        <div className={`mb-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                          marker.riskLevel === 'critical' ? 'bg-red-100 text-red-700' :
                          marker.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                          marker.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                        }`}>
                          <AlertTriangle className="w-3 h-3" />
                          {marker.riskLevel} Risk
                        </div>
                      )}
                      {marker.populationAffected && (
                        <p className="text-sm text-gray-700 mt-2">
                          <strong>Affected:</strong> {marker.populationAffected}
                        </p>
                      )}
                      {marker.reason && (
                        <p className="text-xs text-gray-600 mt-2 italic">
                          {marker.reason}
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className={`p-3 border-t ${
        darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Critical/High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Low</span>
            </div>
          </div>
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Circle size = Risk × Population
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedMapVisualization;
