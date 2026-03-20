import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (name, email, phone, password) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                phone,
                password
            });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const forgotPassword = async (email) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/forgotpassword', {
                email
            });
            return { success: true, message: data.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Something went wrong'
            };
        }
    };

    const resetPassword = async (token, password) => {
        try {
            const { data } = await axios.put(`http://localhost:5000/api/auth/resetpassword/${token}`, {
                password
            });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Token expired or invalid'
            };
        }
    };

    const googleLogin = async (idToken) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/google', {
                idToken
            });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Google login failed'
            };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, forgotPassword, resetPassword, googleLogin, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
