import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        return sessionStorage.getItem('isLoggedIn') === 'true';
    });

    const login = async (password: string) => {
        if (password === "0000") {
            setIsLoggedIn(true);
            sessionStorage.setItem('isLoggedIn', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('isLoggedIn');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
