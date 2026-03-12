import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const fetchSettings = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('http://localhost:5000/api/settings');
            setSettings(res.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching settings:', err);
            setError('Failed to load website settings.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const updateSettings = async (newSettings) => {
        if (!user || user.role !== 'admin') return;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const res = await axios.put('http://localhost:5000/api/settings', newSettings, config);
            setSettings(res.data);
            return { success: true };
        } catch (err) {
            console.error('Error updating settings:', err);
            return { success: false, message: err.response?.data?.message || 'Update failed' };
        }
    };

    return (
        <SettingsContext.Provider value={{ settings, isLoading, error, updateSettings, refreshSettings: fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
