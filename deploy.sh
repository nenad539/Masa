#!/bin/bash

# Deployment script for Vercel
echo "🚀 Starting deployment process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for production
echo "🔨 Building for production..."
npm run build

# Test the build locally
echo "🧪 Testing build locally..."
echo "Visit http://localhost:4173 to test the build"
echo "Press Ctrl+C to stop the preview server"

npm run preview
