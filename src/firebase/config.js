// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB0WAR0vq3mKWn6nocG1H9tWhvn3ykgU3A",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sajt-beec2.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sajt-beec2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sajt-beec2.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "681652496609",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:681652496609:web:379fc5228a54bbdfd8efa0",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-VJMV7H8GDC"
};

// Initialize Firebase only on client side
let app = null;
let db = null;
let analytics = null;

if (typeof window !== "undefined") {
  // Client-side only initialization
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
  // Initialize Analytics only in production and client-side
  if (!window.location.hostname.includes('localhost')) {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
    }
  }
}

export { db, analytics };
export default app;
