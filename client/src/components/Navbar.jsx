import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Printer, ShoppingCart, User, Menu, LogOut, Settings } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <img src="/logo.png" alt="HarfoushPrint Logo" className="h-10 w-10 object-contain rounded-full border-2 border-brand-red shadow-sm group-hover:scale-105 transition-transform" />
                        <span className="font-bold text-2xl tracking-tight text-brand-dark">
                            Harfoush<span className="text-brand-red">Print</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/catalog" className="text-gray-600 hover:text-brand-red font-medium transition-colors">Catalog</Link>
                        <Link to="/portfolio" className="text-gray-600 hover:text-brand-red font-medium transition-colors">Portfolio</Link>
                        <Link to="/about" className="text-gray-600 hover:text-brand-red font-medium transition-colors">About</Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-gray-600 hover:text-brand-red transition-colors p-2" title="Admin Panel">
                                        <Settings className="h-5 w-5" />
                                    </Link>
                                )}
                                <Link to="/dashboard" className="text-gray-600 hover:text-brand-red transition-colors p-2" title="Dashboard">
                                    <User className="h-5 w-5" />
                                </Link>
                                <button className="text-gray-600 hover:text-brand-red transition-colors p-2 relative">
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">0</span>
                                </button>
                                <button onClick={handleLogout} className="text-gray-600 hover:text-brand-red transition-colors p-2" title="Logout">
                                    <LogOut className="h-5 w-5" />
                                </button>
                                <Link to="/builder" className="bg-brand-dark text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                                    Start Project
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-brand-red font-medium transition-colors">
                                    Sign In
                                </Link>
                                <Link to="/register" className="bg-brand-red text-white px-5 py-2.5 rounded-full font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-600 hover:text-brand-dark">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
