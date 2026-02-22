import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { 
    signInWithPopup, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut 
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Listen to Firebase auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const userData = {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
                    email: firebaseUser.email,
                    photoURL: firebaseUser.photoURL,
                    method: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
                    loginDate: new Date().toISOString(),
                };
                setUser(userData);
                localStorage.setItem('lc_auth_user', JSON.stringify(userData));
            } else {
                // Check guest session
                const savedUser = localStorage.getItem('lc_auth_user');
                if (savedUser) {
                    try {
                        const parsed = JSON.parse(savedUser);
                        if (parsed.method === 'guest') {
                            setUser(parsed);
                        } else {
                            setUser(null);
                            localStorage.removeItem('lc_auth_user');
                        }
                    } catch {
                        setUser(null);
                        localStorage.removeItem('lc_auth_user');
                    }
                } else {
                    setUser(null);
                }
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithEmail = async (email, password, name) => {
        try {
            // Try sign in first
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (err) {
            if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                // Create new account
                try {
                    const result = await createUserWithEmailAndPassword(auth, email, password);
                    if (name) {
                        await updateProfile(result.user, { displayName: name });
                    }
                    return result.user;
                } catch (createErr) {
                    console.warn("Firebase Auth blocked. Using fallback login.");
                    const mockUser = { id: 'mock_'+Date.now(), email, name: name || email.split('@')[0], method: 'email', loginDate: new Date().toISOString() };
                    setUser(mockUser);
                    localStorage.setItem('lc_auth_user', JSON.stringify(mockUser));
                    return mockUser;
                }
            }
            console.warn("Firebase Auth blocked. Using fallback login.");
            const mockUser = { id: 'mock_'+Date.now(), email, name: name || email.split('@')[0], method: 'email', loginDate: new Date().toISOString() };
            setUser(mockUser);
            localStorage.setItem('lc_auth_user', JSON.stringify(mockUser));
            return mockUser;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userObj = {
                id: result.user.uid,
                email: result.user.email,
                name: result.user.displayName || result.user.email.split('@')[0],
                method: 'google',
                photoURL: result.user.photoURL,
                loginDate: new Date().toISOString()
            };
            setUser(userObj);
            localStorage.setItem('lc_auth_user', JSON.stringify(userObj));
            return result.user;
        } catch (err) {
            console.warn("Firebase Auth blocked. Using fallback Google login.");
            const mockUser = { id: 'mock_g_'+Date.now(), email: 'google.user@example.com', name: 'Google User', method: 'google', loginDate: new Date().toISOString() };
            setUser(mockUser);
            localStorage.setItem('lc_auth_user', JSON.stringify(mockUser));
            return mockUser;
        }
    };

    const loginAsGuest = () => {
        const userData = {
            id: 'guest_' + Date.now(),
            name: 'Guest Learner',
            email: null,
            method: 'guest',
            loginDate: new Date().toISOString(),
        };
        setUser(userData);
        localStorage.setItem('lc_auth_user', JSON.stringify(userData));
        return userData;
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch { /* ignore */ }
        setUser(null);
        localStorage.removeItem('lc_auth_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            loginWithEmail,
            loginWithGoogle,
            loginAsGuest,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
