// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0WAR0vq3mKWn6nocG1H9tWhvn3ykgU3A",
  authDomain: "sajt-beec2.firebaseapp.com",
  projectId: "sajt-beec2",
  storageBucket: "sajt-beec2.firebasestorage.app",
  messagingSenderId: "681652496609",
  appId: "1:681652496609:web:379fc5228a54bbdfd8efa0",
  measurementId: "G-VJMV7H8GDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in production)
let analytics = null;
if (typeof window !== "undefined" && !window.location.hostname.includes('localhost')) {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
