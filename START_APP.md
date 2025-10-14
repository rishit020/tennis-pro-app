# Tennis Pro Coaching App - Quick Start Guide

## ✅ Issue Fixed!

**The Problem:** The `src/` directory was missing, causing the app to fail on startup.

**The Solution:** All source files have been properly created in the correct directory structure.

## 📱 How to Run the App

### 1. Start the Expo Development Server

```bash
npx expo start
```

### 2. Open on Your Device

Once the server starts, you'll see a QR code in your terminal.

**On iOS:**
- Open the Camera app
- Point it at the QR code
- Tap the notification to open in Expo Go

**On Android:**
- Open the Expo Go app
- Tap "Scan QR code"
- Point your camera at the QR code

### 3. Alternative: Use Tunnel Mode (if QR doesn't work)

```bash
npx expo start --tunnel
```

This creates a public URL that works even if your phone and computer are on different networks.

## 📁 Project Structure

```
tennis-pro-coaching-app/
├── App.js                          # Root app component
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── babel.config.js                 # Babel config with Reanimated
├── assets/                         # Images and icons
└── src/
    ├── theme/
    │   └── colors.js              # Design system & theme
    ├── navigation/
    │   └── AppNavigator.js        # Tab & Stack navigation
    └── screens/
        ├── HomeScreen.js          # Landing page
        ├── UploadVideoScreen.js   # Video upload
        ├── CoachingFormScreen.js  # Booking form
        ├── AboutScreen.js         # About page
        └── ContactScreen.js       # Contact form
```

## 🎨 Features

- ✅ Modern UI with gradients and animations
- ✅ Tab navigation (Home, Upload, Coaching, About, Contact)
- ✅ Functional video upload with permissions
- ✅ Working contact and booking forms
- ✅ Premium design with teal, indigo, and amber colors
- ✅ All dependencies properly installed

## 🔧 Troubleshooting

### App won't load?

1. Clear cache: `npx expo start -c`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Restart Expo Go app on your phone

### "Module not found" error?

Make sure all dependencies are installed:
```bash
npm install
```

### Permission errors on video upload?

The app will automatically request camera/gallery permissions when you try to upload.

## 📦 Installed Dependencies

- ✅ Expo SDK 54
- ✅ React Navigation (Tabs + Stack)
- ✅ React Native Reanimated (animations)
- ✅ Expo Linear Gradient
- ✅ Expo Image Picker
- ✅ Expo Camera
- ✅ React Native Paper (UI components)
- ✅ All peer dependencies

## 🚀 Ready to Go!

Your app is now fully functional and ready to run on Expo Go. Just run `npx expo start` and scan the QR code!
