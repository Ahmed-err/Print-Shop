import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Checkout from './pages/checkout';
import AdminDashboard from './pages/admin';
import Dashboard from './pages/dashboard';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-brand-light flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/checkout" element={
                                <ProtectedRoute>
                                    <Checkout />
                                </ProtectedRoute>
                            } />
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/builder" element={
                                <ProtectedRoute>
                                    <Builder />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin" element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </main>

                    {/* Simple Footer for layout completion */}
                    <footer className="bg-brand-dark text-white py-12">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8 text-sm">
                            <div>
                                <span className="font-bold text-2xl tracking-tight text-white mb-4 block">
                                    Pro<span className="text-brand-red">Print</span>
                                </span>
                                <p className="text-gray-400">Delivering excellence in every dimension.</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4 uppercase text-gray-400">Company</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li><a href="#" className="hover:text-brand-red transition-colors">About</a></li>
                                    <li><a href="#" className="hover:text-brand-red transition-colors">Careers</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4 uppercase text-gray-400">Services</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li><a href="#" className="hover:text-brand-red transition-colors">Business Cards</a></li>
                                    <li><a href="#" className="hover:text-brand-red transition-colors">Posters</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4 uppercase text-gray-400">Support</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li><a href="#" className="hover:text-brand-red transition-colors">Contact</a></li>
                                    <li><a href="#" className="hover:text-brand-red transition-colors">FAQ</a></li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
