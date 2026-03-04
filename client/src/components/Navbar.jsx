import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Printer, ShoppingCart, User, Menu, LogOut, Settings, X, ChevronRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { getCartCount } = useContext(CartContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    // Track scroll for styling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100 py-0' : 'bg-transparent py-2'
            }`}>
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
                                <Link to="/cart" className="text-gray-600 hover:text-brand-red transition-colors p-2 relative" title="View Cart">
                                    <ShoppingCart className="h-5 w-5" />
                                    {getCartCount() > 0 && (
                                        <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                            {getCartCount()}
                                        </span>
                                    )}
                                </Link>
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
                    <div className="md:hidden flex items-center space-x-4">
                        <Link to="/cart" className="text-brand-dark hover:text-brand-red transition-colors p-2 relative" title="View Cart">
                            <ShoppingCart className="h-6 w-6" />
                            {getCartCount() > 0 && (
                                <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                        <button
                            className="text-brand-dark hover:text-brand-red transition-colors p-2"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-50 flex flex-col md:hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <span className="font-bold text-xl tracking-tight text-brand-dark">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 bg-white rounded-full text-gray-500 hover:text-brand-red hover:bg-red-50 transition-all border border-gray-100 shadow-sm"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col space-y-2">
                                <Link to="/catalog" className="flex items-center justify-between p-4 rounded-xl hover:bg-brand-red/5 text-brand-dark font-medium transition-colors group">
                                    Catalog
                                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-brand-red transition-colors" />
                                </Link>
                                <Link to="/services" className="flex items-center justify-between p-4 rounded-xl hover:bg-brand-red/5 text-brand-dark font-medium transition-colors group">
                                    Services
                                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-brand-red transition-colors" />
                                </Link>

                                {user ? (
                                    <div className="pt-6 mt-6 border-t border-gray-100">
                                        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Account</p>
                                        <Link to="/dashboard" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                                            <User className="h-5 w-5 text-gray-400" />
                                            <span>Dashboard</span>
                                        </Link>
                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                                                <Settings className="h-5 w-5 text-gray-400" />
                                                <span>Admin Panel</span>
                                            </Link>
                                        )}
                                        <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-red-50 text-red-600 transition-colors mt-2">
                                            <LogOut className="h-5 w-5" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col space-y-3 px-2">
                                        <Link to="/login" className="w-full py-3 text-center rounded-xl border-2 border-brand-dark text-brand-dark font-bold hover:bg-brand-dark hover:text-white transition-colors">
                                            Sign In
                                        </Link>
                                        <Link to="/register" className="w-full py-3 text-center rounded-xl bg-brand-red text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-colors">
                                            Create Account
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {user && (
                                <div className="p-4 border-t border-gray-100 bg-gray-50 pb-8">
                                    <Link to="/builder" className="w-full flex items-center justify-center space-x-2 bg-brand-dark text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors">
                                        <span>Start Project</span>
                                        <Printer className="h-5 w-5" />
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
