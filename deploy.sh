#!/bin/bash

# AlphaEarth Climate Console Deployment Script

echo "🌍 AlphaEarth Climate Console Deployment"
echo "========================================"

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not logged in to Firebase. Please run:"
    echo "firebase login"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please copy env.example to .env and configure it."
    exit 1
fi

echo "📦 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

echo "🔧 Building Cloud Functions..."
cd functions
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Functions build failed"
    exit 1
fi

cd ..

echo "🚀 Deploying to Firebase..."
firebase deploy

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your app is now live at: https://$(firebase use --project | grep -o '[^/]*$').web.app"
else
    echo "❌ Deployment failed"
    exit 1
fi
