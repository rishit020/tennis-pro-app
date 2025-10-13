# TennisPro Coaching App

A premium React Native + Expo mobile app for tennis coaching services with video analysis and personalized training.

## Features

- 🎾 **Home Screen** - Beautiful landing page with service overview
- 📹 **Video Upload** - Record or select videos for analysis
- 🏆 **Coaching Form** - Book private coaching sessions
- ℹ️ **About** - Company information and team details
- 📞 **Contact** - Contact form and information

## Design

- Premium Apple liquid-glass inspired UI
- Smooth gradients and subtle shadows
- Modern, minimalistic design
- Responsive mobile-first layout
- Smooth animations and microinteractions

## Tech Stack

- **React Native** with Expo
- **React Navigation** for navigation
- **React Native Paper** for UI components
- **Formik + Yup** for form handling and validation
- **React Native Reanimated** for animations
- **Expo Image Picker** for video selection
- **Expo Camera** for video recording

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on device:**
   - Install Expo Go on your phone
   - Scan the QR code from the terminal
   - Or run `npm run ios` / `npm run android`

## Project Structure

```
src/
├── navigation/
│   └── AppNavigator.js          # Main navigation setup
├── screens/
│   ├── HomeScreen.js            # Landing page
│   ├── UploadVideoScreen.js     # Video upload functionality
│   ├── CoachingFormScreen.js    # Coaching booking form
│   ├── AboutScreen.js           # Company information
│   └── ContactScreen.js         # Contact form
└── theme/
    └── colors.js                # Design system (colors, typography, spacing)
```

## Key Features

### Video Upload
- Record videos directly in the app
- Choose from device gallery
- File validation (size, format)
- Upload progress indicator
- Detailed requirements and benefits

### Coaching Form
- Comprehensive booking form
- Skill level selection
- Form validation with error handling
- Success/error notifications
- Reset functionality

### Premium UI
- Liquid-glass design with gradients
- Smooth animations on button press
- Card-based layouts with shadows
- Consistent typography and spacing
- High-contrast colors for accessibility

## Dependencies

All required dependencies are included in `package.json`:
- Navigation libraries
- Form handling (Formik, Yup)
- Animation libraries
- Camera and image picker
- UI component library

## Getting Started

1. Make sure you have Node.js installed
2. Clone or download this project
3. Run `npm install` to install dependencies
4. Run `npm start` to start the development server
5. Scan the QR code with Expo Go to view the app

## Customization

The app uses a centralized design system in `src/theme/colors.js`:
- Colors and gradients
- Typography scales
- Spacing system
- Shadow definitions

Modify these values to customize the app's appearance.

## Production Ready

This app is built with production in mind:
- Clean, modular code structure
- Comprehensive error handling
- Form validation
- Responsive design
- Performance optimizations
- Professional UI/UX

## Support

For questions or support, contact the development team.
