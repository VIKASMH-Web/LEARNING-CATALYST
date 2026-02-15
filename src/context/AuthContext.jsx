import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('lc_auth_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch { /* ignore */ }
        }
        setIsLoading(false);
    }, []);

    const loginWithEmail = (email, password, name) => {
        const userData = {
            id: 'user_' + Date.now(),
            name: name || email.split('@')[0],
            email,
            method: 'email',
            loginDate: new Date().toISOString(),
        };
        setUser(userData);
        localStorage.setItem('lc_auth_user', JSON.stringify(userData));
        return userData;
    };

    const loginWithGoogle = () => {
        // Simulated Google login
        const userData = {
            id: 'google_' + Date.now(),
            name: 'Google User',
            email: 'user@gmail.com',
            method: 'google',
            loginDate: new Date().toISOString(),
        };
        setUser(userData);
        localStorage.setItem('lc_auth_user', JSON.stringify(userData));
        return userData;
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

    const logout = () => {
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
