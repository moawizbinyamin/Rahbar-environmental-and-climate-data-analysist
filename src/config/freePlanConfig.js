// Configuration for Firebase Free Plan
export const FREE_PLAN_CONFIG = {
  // Use mock data instead of real API calls
  useMockData: true,
  
  // Disable Cloud Functions (requires Blaze plan)
  useCloudFunctions: false,
  
  // Use local storage for chat history instead of Firestore
  useLocalStorage: true,
  
  // Mock API responses
  mockResponses: {
    gemini: true,
    deepMind: true,
    alphaEarth: true
  },
  
  // Free plan limits
  limits: {
    maxAnalyses: 100, // Store max 100 analyses locally
    maxChatHistory: 50, // Store max 50 chat messages locally
    maxStorageMB: 5 // 5MB local storage limit
  }
};

// Mock data for demonstration
export const MOCK_CLIMATE_DATA = {
  lahore: {
    flood: {
      riskLevel: 'High',
      waterLevel: 2.8,
      affectedAreas: 12,
      rainfall: 45,
      summary: 'Lahore shows high flood risk due to poor drainage and heavy rainfall patterns.'
    },
    urban: {
      growth: 8.5,
      greenSpaceLoss: 12,
      populationDensity: 4500,
      summary: 'Lahore experiencing rapid urban expansion with significant green space loss.'
    },
    green: {
      coverage: 25,
      carbonSequestration: 1200,
      biodiversityIndex: 65,
      summary: 'Lahore has moderate green coverage with good carbon sequestration potential.'
    }
  },
  karachi: {
    flood: {
      riskLevel: 'Medium',
      waterLevel: 1.8,
      affectedAreas: 8,
      rainfall: 35,
      summary: 'Karachi shows medium flood risk with coastal vulnerability factors.'
    },
    urban: {
      growth: 6.2,
      greenSpaceLoss: 8,
      populationDensity: 3800,
      summary: 'Karachi has steady urban growth with moderate infrastructure strain.'
    },
    green: {
      coverage: 15,
      carbonSequestration: 800,
      biodiversityIndex: 45,
      summary: 'Karachi has limited green coverage due to urban density.'
    }
  },
  islamabad: {
    flood: {
      riskLevel: 'Low',
      waterLevel: 0.9,
      affectedAreas: 3,
      rainfall: 25,
      summary: 'Islamabad shows low flood risk with good drainage systems.'
    },
    urban: {
      growth: 4.8,
      greenSpaceLoss: 5,
      populationDensity: 2200,
      summary: 'Islamabad has controlled urban growth with planned development.'
    },
    green: {
      coverage: 45,
      carbonSequestration: 1800,
      biodiversityIndex: 80,
      summary: 'Islamabad has excellent green coverage and biodiversity.'
    }
  }
};

export default FREE_PLAN_CONFIG;
