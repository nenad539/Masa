# 💕 Romantic Long-Distance Website

A beautiful, interactive website created with love for your long-distance relationship. Features a mobile-first design with elegant animations and romantic elements.

## ✨ Features

### 🌟 Interactive Elements
- **Animated Loading Screen** - Cycles through love messages with heartbeat animation
- **Love Button** - Reveals new reasons every 3 hours with cooldown timer
- **Media Gallery** - Slideshow of photos and videos with like functionality
- **Romantic Animations** - Floating hearts, smooth transitions, and confetti celebrations

### 🎨 Design
- **Mobile-First** - Optimized for phone usage with responsive design
- **Romantic Color Palette** - Soft pinks, peaches, and rose tones
- **Elegant Typography** - Parisienne cursive for headings, Montserrat for body text
- **Smooth Animations** - CSS transitions and keyframe animations

### 💝 Personalization
- **100 Love Reasons** - Customizable reasons that reveal over time
- **Personal Media** - Your photos and videos with captions
- **Custom Messages** - Personalized loading messages and content

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Visit `http://localhost:5173`
   - Best viewed on mobile devices

## 📱 Mobile Optimization

This website is designed primarily for mobile devices:
- Touch-friendly interface
- Responsive design for all screen sizes
- Smooth animations optimized for mobile performance
- Mobile-first CSS approach

## 🛠️ Customization

### Adding Your 100 Love Reasons
1. Open `/src/data/loveReasons.js`
2. Replace the example reasons with your personal messages
3. Each reason needs a `title` and `reason` field

### Adding Photos and Videos
1. Copy your media files to:
   - Photos: `/public/media/photos/`
   - Videos: `/public/media/videos/`
2. Update the `mediaItems` array in `/src/components/MediaGallery.jsx`
3. Add your file names and captions

### Personalizing Messages
- Update her name in `/src/App.jsx` (change `herName` variable)
- Customize loading messages in `/src/components/LoadingScreen.jsx`
- Modify final love message in `/src/App.jsx`

## 🎯 How It Works

### Love Button Cooldown
- Click reveals one new reason
- 3-hour cooldown prevents spam
- Progress tracked in localStorage
- Confetti celebration when all reasons are discovered

### Media Gallery
- Auto-advancing slideshow (8 seconds)
- Like/unlike functionality with heart animation
- Fullscreen viewing capability
- Smooth transitions between media

### Data Persistence
- Cooldown timers saved in browser
- Liked media preferences stored
- Reason progress maintained across sessions

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **Firebase Hosting**: Use Firebase CLI
- **GitHub Pages**: Enable in repository settings

## 📁 Project Structure

```
src/
├── components/
│   ├── LoadingScreen.jsx    # Animated loading with messages
│   ├── LoveButton.jsx       # Interactive love button with cooldown
│   ├── LoveReason.jsx       # Display component for reasons
│   └── MediaGallery.jsx     # Photo/video slideshow
├── data/
│   └── loveReasons.js       # Your 100 love reasons
├── styles/
│   └── App.css             # Main stylesheet with animations
└── App.jsx                 # Main application component

public/
└── media/
    ├── photos/             # Your photo files
    ├── videos/             # Your video files
    └── README.md          # Media instructions
```

## 💻 Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom animations and responsive design
- **Local Storage** - Data persistence
- **Google Fonts** - Parisienne and Montserrat fonts

## 🎨 Color Palette

- **Primary Pink**: `#FFD1DC` - Main interface elements
- **Secondary Peach**: `#FFDFD3` - Gradients and accents
- **Accent Rose**: `#FEC8D8` - Interactive elements
- **Text Dark**: `#4A4A4A` - Primary text color
- **Text Light**: `#FFF9FB` - Light text and backgrounds

## 📋 TODO / Customization Checklist

- [ ] Add your 100 love reasons in `/src/data/loveReasons.js`
- [ ] Upload your photos to `/public/media/photos/`
- [ ] Upload your videos to `/public/media/videos/`
- [ ] Update media array in `MediaGallery.jsx` with your file names
- [ ] Change her name in `App.jsx`
- [ ] Customize loading messages if desired
- [ ] Test on mobile device
- [ ] Deploy to hosting platform

## 💕 Made with Love

This website was created to bridge the distance between hearts. Every animation, every color, and every interaction was designed to express love across the miles.

---

*Remember: Love knows no distance. This website is just a small token of the infinite love that connects two hearts, no matter how far apart they may be.* 💕+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
