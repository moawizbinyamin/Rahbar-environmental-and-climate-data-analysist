#!/bin/bash

# AlphaEarth Climate Console - API Keys Setup Script

echo "🌍 AlphaEarth Climate Console - API Keys Setup"
echo "=============================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created!"
else
    echo "⚠️  .env file already exists. Backing up to .env.backup..."
    cp .env .env.backup
fi

echo ""
echo "🔑 API Keys Setup Guide:"
echo "========================"
echo ""
echo "1. 🔥 FIREBASE CONFIGURATION:"
echo "   - Go to: https://console.firebase.google.com/"
echo "   - Create new project: 'alphaearth-climate-console'"
echo "   - Enable: Firestore, Authentication, Functions, Hosting"
echo "   - Get config from Project Settings → General → Your apps"
echo ""
echo "2. 🤖 GEMINI AI API KEY:"
echo "   - Go to: https://aistudio.google.com/"
echo "   - Click 'Get API key' → 'Create API key'"
echo "   - Copy the generated key"
echo ""
echo "3. 🧠 DEEPMIND API KEY:"
echo "   - For development: Use 'mock-key-for-development'"
echo "   - For production: Contact Google Cloud Vertex AI"
echo ""
echo "4. 🌍 ALPHAEARTH API KEY:"
echo "   - For development: Use 'mock-key-for-development'"
echo "   - For production: Contact AlphaEarth for API access"
echo ""

# Open .env file for editing
echo "📝 Opening .env file for editing..."
echo "Please fill in your API keys in the .env file that will open."
echo ""

# Try to open with different editors
if command -v code &> /dev/null; then
    echo "Opening with VS Code..."
    code .env
elif command -v nano &> /dev/null; then
    echo "Opening with nano..."
    nano .env
elif command -v vim &> /dev/null; then
    echo "Opening with vim..."
    vim .env
else
    echo "Please manually edit the .env file with your preferred editor."
fi

echo ""
echo "🔧 After filling in your keys, run:"
echo "   npm install"
echo "   npm run dev"
echo ""
echo "📚 For detailed setup instructions, see: SETUP_GUIDE.md"
echo ""
echo "🎯 Quick Test Commands:"
echo "   - Test Firebase: firebase projects:list"
echo "   - Test Gemini: Check browser console for API errors"
echo "   - Test App: npm run dev"
echo ""
echo "✅ Setup complete! Your AlphaEarth Climate Console is ready! 🌍🤖"
