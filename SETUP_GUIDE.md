# AlphaEarth Climate Console - API Keys Setup Guide

This guide will walk you through obtaining all the necessary API keys for your conversational geo AI system.

## 🔑 Required API Keys

### 1. Firebase Configuration Keys
### 2. Google Gemini AI API Key
### 3. Google DeepMind API Key
### 4. AlphaEarth API Key

---

## 1. 🔥 Firebase Configuration

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `alphaearth-climate-console`
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Required Services
1. **Firestore Database**:
   - Go to "Firestore Database" in left sidebar
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location close to your users

2. **Authentication**:
   - Go to "Authentication" → "Sign-in method"
   - Enable "Email/Password" provider
   - Optionally enable "Google" provider

3. **Functions**:
   - Go to "Functions" in left sidebar
   - Click "Get started" if prompted

4. **Hosting**:
   - Go to "Hosting" in left sidebar
   - Click "Get started"

### Step 3: Get Firebase Config
1. Go to Project Settings (gear icon) → "General" tab
2. Scroll down to "Your apps" section
3. Click "Web" icon (`</>`)
4. Register app with nickname: `alphaearth-web`
5. Copy the Firebase configuration object

**Example Firebase Config:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "alphaearth-climate-console.firebaseapp.com",
  projectId: "alphaearth-climate-console",
  storageBucket: "alphaearth-climate-console.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

---

## 2. 🤖 Google Gemini AI API Key

### Step 1: Access Google AI Studio
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account

### Step 2: Create API Key
1. Click "Get API key" in the left sidebar
2. Click "Create API key in new project" or select existing project
3. Copy the generated API key

**Note**: Keep this key secure and never commit it to version control.

### Step 3: Test API Access
You can test the API key using this curl command:
```bash
curl -H 'Content-Type: application/json' \
     -d '{"contents":[{"parts":[{"text":"Hello, how are you?"}]}]}' \
     -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY'
```

---

## 3. 🧠 Google DeepMind API Key

### Step 1: Access DeepMind API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "DeepMind API" (if available)

### Step 2: Alternative - Use Vertex AI
Since DeepMind API might not be publicly available, you can use Vertex AI:

1. Go to [Vertex AI Console](https://console.cloud.google.com/vertex-ai)
2. Enable Vertex AI API
3. Go to "Model Garden" → "Generative AI"
4. Create API credentials

### Step 3: For Development - Use Mock Service
For development purposes, the system includes mock DeepMind responses. You can:
1. Set `VITE_DEEPMIND_API_KEY=mock-key-for-development`
2. The system will use fallback analysis methods

---

## 4. 🌍 AlphaEarth API Key

### Step 1: Contact AlphaEarth
1. Visit [AlphaEarth website](https://alphaearth.com/) (if available)
2. Look for "API Access" or "Developer" section
3. Contact their support for API access

### Step 2: Alternative - Use Mock Data
For development, the system includes comprehensive mock data:
1. Set `VITE_ALPHAEARTH_API_KEY=mock-key-for-development`
2. The system will generate realistic environmental data

### Step 3: Real API Integration (When Available)
When you get real AlphaEarth API access:
1. Update the API endpoints in `src/services/alphaEarthService.js`
2. Replace mock data generation with real API calls
3. Update the `fetchRealTimeData` method

---

## 🔧 Environment Configuration

### Step 1: Create Environment File
1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

### Step 2: Fill in Your Keys
Edit `.env` file with your actual keys:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=alphaearth-climate-console.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=alphaearth-climate-console
VITE_FIREBASE_STORAGE_BUCKET=alphaearth-climate-console.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Gemini AI Configuration
VITE_GEMINI_API_KEY=AIzaSyD...

# AlphaEarth API Configuration
VITE_ALPHAEARTH_API_URL=https://api.alphaearth.com/v1
VITE_ALPHAEARTH_API_KEY=your-alphaearth-api-key

# Google DeepMind Configuration
VITE_DEEPMIND_API_KEY=mock-key-for-development
```

### Step 3: Update Firebase Config
Update `src/firebase/config.js` with your Firebase configuration.

---

## 🚀 Firebase Functions Configuration

### Step 1: Set Function Environment Variables
```bash
firebase functions:config:set gemini.api_key="YOUR_GEMINI_API_KEY"
firebase functions:config:set deepmind.api_key="YOUR_DEEPMIND_API_KEY"
firebase functions:config:set alphaearth.api_key="YOUR_ALPHAEARTH_API_KEY"
```

### Step 2: Deploy Functions
```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

---

## 🧪 Testing Your Setup

### Step 1: Local Development
```bash
npm install
npm run dev
```

### Step 2: Test API Connections
1. Open the app in browser
2. Try asking: "Show me flood risk for Lahore"
3. Check browser console for any API errors
4. Verify data is being generated and displayed

### Step 3: Deploy to Firebase
```bash
npm run build
firebase deploy
```

---

## 🔒 Security Best Practices

### 1. Never Commit API Keys
- Add `.env` to `.gitignore`
- Use environment variables in production
- Rotate keys regularly

### 2. Restrict API Key Usage
- Set up API key restrictions in Google Cloud Console
- Limit to specific domains/IPs
- Monitor usage regularly

### 3. Use Firebase Security Rules
- Configure Firestore rules for authenticated users only
- Set up proper authentication flows
- Implement rate limiting

---

## 🆘 Troubleshooting

### Common Issues:

1. **Firebase Config Error**:
   - Verify all Firebase config values are correct
   - Check if services are enabled in Firebase Console

2. **Gemini API Error**:
   - Verify API key is correct
   - Check if billing is enabled (required for Gemini)
   - Ensure API quotas are not exceeded

3. **DeepMind API Error**:
   - Use mock service for development
   - Check if Vertex AI is properly configured

4. **AlphaEarth API Error**:
   - Use mock data for development
   - Verify API endpoint URLs

### Getting Help:
- Check Firebase Console for error logs
- Review browser developer console
- Check Firebase Functions logs: `firebase functions:log`

---

## 📞 Support Contacts

- **Firebase**: [Firebase Support](https://firebase.google.com/support)
- **Google AI**: [Google AI Support](https://ai.google.dev/support)
- **Vertex AI**: [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)

---

## 🎯 Next Steps

1. ✅ Get all API keys
2. ✅ Configure environment variables
3. ✅ Test locally
4. ✅ Deploy to Firebase
5. ✅ Start using your AlphaEarth Climate Console!

Your conversational geo AI for climate and disaster management is ready to help analyze flood risks, urban expansion, and green space development! 🌍🤖
