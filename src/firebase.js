import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDdEMKX7tOiPayyHNPp1W-8G8fRC0nDwto",
  authDomain: "learning-catalyst-lc.firebaseapp.com",
  projectId: "learning-catalyst-lc",
  storageBucket: "learning-catalyst-lc.firebasestorage.app",
  messagingSenderId: "848253529143",
  appId: "1:848253529143:web:8a2e0db14f5d6c4e8b7f2a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Force account picker every time
googleProvider.setCustomParameters({ prompt: 'select_account' });
