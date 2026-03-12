import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PageWrapper from './components/PageWrapper';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Checkout from './pages/checkout';
import Cart from './pages/Cart';
import AdminDashboard from './pages/admin';
import Dashboard from './pages/dashboard';

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                <Route path="/catalog" element={<PageWrapper><Catalog /></PageWrapper>} />
                <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
                <Route path="/checkout" element={
                    <ProtectedRoute>
                        <PageWrapper><Checkout /></PageWrapper>
                    </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <PageWrapper><Dashboard /></PageWrapper>
                    </ProtectedRoute>
                } />
                <Route path="/builder" element={
                    <ProtectedRoute>
                        <PageWrapper><Builder /></PageWrapper>
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <PageWrapper><AdminDashboard /></PageWrapper>
                    </ProtectedRoute>
                } />
            </Routes>
        </AnimatePresence>
    );
}

import { SettingsProvider } from './context/SettingsContext';

function App() {
    return (
        <AuthProvider>
            <SettingsProvider>
                <CartProvider>
                    <Router>
                        <div className="min-h-screen bg-brand-light flex flex-col">
                            <Navbar />
                            <main className="flex-grow flex flex-col items-center">
                                <AnimatedRoutes />
                            </main>
                            <Footer />
                        </div>
                    </Router>
                </CartProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}

export default App;
