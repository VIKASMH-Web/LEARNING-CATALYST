import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDdEMKX7tOiPayyHNPp1W-8G8fRC0nDwto",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "learning-catalyst-lc.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "learning-catalyst-lc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "learning-catalyst-lc.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "848253529143",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:848253529143:web:8a2e0db14f5d6c4e8b7f2a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Force account picker every time
googleProvider.setCustomParameters({ prompt: 'select_account' });
