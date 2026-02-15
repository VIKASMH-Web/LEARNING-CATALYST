import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB0m6oF-muraWswSHzBquATnlWJmQ6CRlc",
  authDomain: "learning-catalyst-2c6a7.firebaseapp.com",
  projectId: "learning-catalyst-2c6a7",
  storageBucket: "learning-catalyst-2c6a7.firebasestorage.app",
  messagingSenderId: "1082775945495",
  appId: "1:1082775945495:web:7fdb7ee562c557b7b4b752"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Force account picker every time
googleProvider.setCustomParameters({ prompt: 'select_account' });
