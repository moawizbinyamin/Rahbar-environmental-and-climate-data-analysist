# 🌍 Rahbar - Climate Intelligence Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-rahbar--dcd4a.web.app-blue?style=for-the-badge&logo=firebase)](https://rahbar-dcd4a.web.app)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7.1-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-2.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

> **Rahbar** (رہبر) - A conversational AI-driven environmental intelligence platform for climate and disaster management, focusing on flood analysis, urban expansion monitoring, and green space assessment.

## 🚀 Features

### 🤖 **Conversational AI Interface**
- **Real-time Chat**: Interactive conversation with Rahbar AI Assistant
- **Collapsible Layout**: Dynamic chat interface that adapts to user needs
- **Voice Input**: Speech-to-text capabilities for hands-free interaction
- **Multi-language Support**: Intelligent intent detection and response

### 🗺️ **Advanced Geospatial Analysis**
- **Interactive Maps**: Real-time visualization with Leaflet.js
- **Flood Risk Assessment**: Comprehensive flood analysis with risk levels
- **Urban Expansion Monitoring**: Track city growth and development patterns
- **Green Space Analysis**: Monitor vegetation and ecosystem health
- **Real-time Weather Data**: Integration with OpenWeatherMap API

### 📊 **Climate Intelligence**
- **Real-time Data Sources**: 
  - OpenWeatherMap for weather data
  - Nominatim for geocoding
  - Overpass API for geographical features
  - Open-Elevation API for terrain data
- **AI-Powered Insights**: Gemini 2.5 Flash integration for intelligent analysis
- **Risk Assessment**: Automated disaster risk evaluation
- **Policy Recommendations**: AI-generated climate adaptation strategies

### 🎨 **Modern UI/UX**
- **Dark/Light Mode**: Adaptive theme switching
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Smooth Animations**: Framer Motion powered transitions
- **Accessibility**: WCAG compliant interface design

## 🛠️ Technology Stack

### **Frontend**
- **React 18.2.0** - Modern UI framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Leaflet.js** - Interactive maps
- **Lucide React** - Beautiful icons

### **Backend & Services**
- **Firebase Hosting** - Web hosting
- **Firestore** - NoSQL database
- **Google Gemini AI** - Large Language Model
- **OpenWeatherMap API** - Weather data
- **Nominatim API** - Geocoding service
- **Overpass API** - OpenStreetMap data
- **Open-Elevation API** - Elevation data

### **Development Tools**
- **Firebase CLI** - Deployment and management
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/moawizbinyamin/Rahbar-environmental-and-climate-data-analysist.git
cd Rahbar-environmental-and-climate-data-analysist
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# OpenWeatherMap API
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here

# Firebase Configuration (Optional - already configured)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the application.

### 5. Build for Production
```bash
npm run build
```

### 6. Deploy to Firebase
```bash
firebase deploy --only hosting
```

## 🔑 API Keys Setup

### Google Gemini AI
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `VITE_GEMINI_API_KEY`

### OpenWeatherMap
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Add it to your `.env` file as `VITE_OPENWEATHER_API_KEY`

## 📱 Usage

### Desktop Experience
1. **Chat Interface**: Always visible on the left side
2. **Collapsible Panel**: Click the chevron to collapse/expand chat
3. **Analysis Results**: View maps and insights on the right panel
4. **Dark Mode**: Toggle theme using the sun/moon icon

### Mobile Experience
1. **Tab Navigation**: Switch between Chat, Map, and Insights
2. **Floating Chat**: Tap the brain icon to access chat when collapsed
3. **Full-screen Maps**: Interactive maps optimized for mobile
4. **Voice Input**: Use microphone for hands-free interaction

### Example Queries
- *"What's the flood risk in Lahore?"*
- *"Show me urban expansion in Karachi over the last 5 years"*
- *"Analyze green space coverage in Islamabad"*
- *"What's the current weather and air quality in Multan?"*

## 🏗️ Project Structure

```
rahbar-climate-platform/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── AnalysisSection.jsx      # Main analysis layout
│   │   ├── ChatInterface.jsx        # Chat component
│   │   ├── InsightPanel.jsx         # AI insights display
│   │   ├── MapVisualization.jsx     # Interactive maps
│   │   └── WelcomeSection.jsx       # Landing page
│   ├── hooks/
│   │   └── useFirestore.js          # Database operations
│   ├── services/
│   │   ├── alphaEarthService.js     # Geospatial data service
│   │   ├── climateAnalysisService.js # Climate analysis engine
│   │   ├── geospatialDataService.js # Real-time data APIs
│   │   └── llmService.js            # Gemini AI integration
│   ├── firebase/
│   │   └── config.js                # Firebase configuration
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles
├── firebase.json                    # Firebase configuration
├── firestore.rules                  # Database security rules
├── firestore.indexes.json           # Database indexes
├── package.json                     # Dependencies and scripts
├── tailwind.config.js               # Tailwind CSS configuration
├── vite.config.js                   # Vite configuration
└── README.md                        # Project documentation
```

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Firestore Database
3. Enable Firebase Hosting
4. Update `src/firebase/config.js` with your project credentials

### Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **API Endpoints**: Update service files for different data sources
- **UI Components**: Customize components in the `src/components/` directory

## 📊 Data Sources

### Real-time APIs
- **Weather Data**: OpenWeatherMap API
- **Geocoding**: Nominatim (OpenStreetMap)
- **Geographical Features**: Overpass API
- **Elevation Data**: Open-Elevation API

### AI Services
- **Language Model**: Google Gemini 2.5 Flash
- **Intent Detection**: Custom AI prompts
- **Analysis Generation**: Context-aware responses

## 🚀 Deployment

### Firebase Hosting
```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

### Custom Domain
1. Add your domain in Firebase Console
2. Update DNS records as instructed
3. Enable SSL certificate

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow React best practices
- Use TypeScript for new components
- Write meaningful commit messages
- Test on multiple devices and browsers
- Ensure accessibility compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language model capabilities
- **OpenWeatherMap** for comprehensive weather data
- **OpenStreetMap** community for geographical data
- **Firebase** for hosting and database services
- **React** and **Vite** communities for excellent tooling

## 📞 Support

- **Live Demo**: [https://rahbar-dcd4a.web.app](https://rahbar-dcd4a.web.app)
- **Issues**: [GitHub Issues](https://github.com/moawizbinyamin/Rahbar-environmental-and-climate-data-analysist/issues)
- **Documentation**: [Project Wiki](https://github.com/moawizbinyamin/Rahbar-environmental-and-climate-data-analysist/wiki)

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Basic chat interface
- ✅ Real-time weather integration
- ✅ Interactive maps
- ✅ AI-powered analysis

### Phase 2 (Planned)
- 🔄 Historical data analysis
- 🔄 Satellite imagery integration
- 🔄 Advanced visualization tools
- 🔄 Multi-language support

### Phase 3 (Future)
- 📋 Machine learning models
- 📋 Predictive analytics
- 📋 API for third-party integration
- 📋 Mobile applications

---

**Built with ❤️ for a sustainable future**

*Rahbar - Your guide to climate intelligence*