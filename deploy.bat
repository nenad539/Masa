@echo off
echo 🚀 Starting deployment process...

REM Clean previous build
echo 🧹 Cleaning previous build...
if exist dist rmdir /s /q dist

REM Install dependencies  
echo 📦 Installing dependencies...
npm install

REM Build for production
echo 🔨 Building for production...
npm run build

REM Test the build locally
echo 🧪 Testing build locally...
echo Visit http://localhost:4173 to test the build
echo Press Ctrl+C to stop the preview server

npm run preview
