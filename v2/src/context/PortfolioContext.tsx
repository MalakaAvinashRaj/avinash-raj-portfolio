import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { portfolioData as initialData } from '../data/portfolio';

type PortfolioData = typeof initialData;

interface PortfolioContextType {
    data: PortfolioData;
    updateField: (path: string, value: any) => Promise<void>;
    importData: (newData: PortfolioData) => Promise<void>;
    loading: boolean;
    saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Helper to update nested object by path
const setDeep = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const deepest = keys.reduce((o, key) => (o[key] = o[key] || {}), obj);
    deepest[lastKey] = value;
    return obj;
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<PortfolioData>(initialData);
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

    const DOC_ID = 'main_portfolio';
    const COLLECTION = 'settings';

    useEffect(() => {
        // Prevent hanging on placeholder config
        const isPlaceholder = db.app.options.apiKey === "YOUR_API_KEY";

        if (isPlaceholder) {
            console.warn("Firebase is using placeholder credentials. Falling back to local portfolio data.");
            setLoading(false);
            return;
        }

        // Try to fetch from Firebase
        const docRef = doc(db, COLLECTION, DOC_ID);

        // Safety timeout for loading state
        const timeout = setTimeout(() => {
            if (loading) {
                console.warn("Firebase fetch timed out. Using local portfolio data.");
                setLoading(false);
            }
        }, 5000);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            clearTimeout(timeout);
            if (docSnap.exists()) {
                setData(docSnap.data() as PortfolioData);
            } else {
                // If it doesn't exist, initialize it with initialData
                setDoc(docRef, initialData);
            }
            setLoading(false);
        }, (error) => {
            clearTimeout(timeout);
            console.error("Error fetching portfolio data:", error);
            setLoading(false);
        });

        return () => {
            clearTimeout(timeout);
            unsubscribe();
        };
    }, []);

    const updateField = async (path: string, value: any) => {
        try {
            setSaveStatus('saving');
            const newData = JSON.parse(JSON.stringify(data));
            setDeep(newData, path, value);

            // Always save to LocalStorage as a robust local fallback
            localStorage.setItem('portfolio_data_backup', JSON.stringify(newData));

            const isPlaceholder = db.app.options.apiKey === "YOUR_API_KEY";
            if (!isPlaceholder) {
                try {
                    const docRef = doc(db, COLLECTION, DOC_ID);
                    await setDoc(docRef, newData);
                } catch (fbErr) {
                    console.error("Firebase save failed, but data saved locally:", fbErr);
                }
            }

            setData(newData);
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (err) {
            console.error("Error saving data:", err);
            setSaveStatus('error');
        }
    };

    const importData = async (newData: PortfolioData) => {
        try {
            setSaveStatus('saving');

            // Always save to LocalStorage as a robust local fallback
            localStorage.setItem('portfolio_data_backup', JSON.stringify(newData));

            const isPlaceholder = db.app.options.apiKey === "YOUR_API_KEY";
            if (!isPlaceholder) {
                try {
                    const docRef = doc(db, COLLECTION, DOC_ID);
                    await setDoc(docRef, newData);
                } catch (fbErr) {
                    console.error("Firebase import failed, but data saved locally:", fbErr);
                }
            }

            setData(newData);
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (err) {
            console.error("Error importing data:", err);
            setSaveStatus('error');
        }
    };

    // Load from LocalStorage on mount if available
    useEffect(() => {
        const localData = localStorage.getItem('portfolio_data_backup');
        if (localData) {
            try {
                setData(JSON.parse(localData));
            } catch (e) {
                console.error("Failed to parse local portfolio data");
            }
        }
    }, []);

    return (
        <PortfolioContext.Provider value={{ data, updateField, importData, loading, saveStatus }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};
