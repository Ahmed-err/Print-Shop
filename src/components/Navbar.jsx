import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Printer, ShoppingCart, User, Menu, LogOut, Settings, X, ChevronRight, Globe } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { getCartCount } = useContext(CartContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isAr = i18n.language === 'ar';

    // Close mobile menu on route change
    useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

    // Track scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => { logout(); navigate('/'); };

    const toggleLang = () => {
        const next = isAr ? 'en' : 'ar';
        i18n.changeLanguage(next);
        localStorage.setItem('lang', next);
        document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = next;
    };

    const LangButton = () => (
        <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all duration-200 shadow-sm"
            title="تبديل اللغة / Switch language"
        >
            <Globe className="h-4 w-4 shrink-0" />
            {isAr ? 'EN' : 'عربي'}
        </button>
    );

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100 py-0' : 'bg-transparent py-2'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="/logo.png" alt="HarfoushPrint Logo" className="h-10 w-10 object-contain rounded-full border-2 border-brand-red shadow-sm group-hover:scale-105 transition-transform" />
                        <span className="font-bold text-2xl tracking-tight text-brand-dark">
                            Harfoush<span className="text-brand-red">Print</span>
                        </span>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/catalog" className="text-gray-600 hover:text-brand-red font-medium transition-colors">{t('nav.catalog')}</Link>
                        <div className="relative group">
                            <button className="inline-flex items-center gap-1 text-gray-600 hover:text-brand-red font-medium transition-colors">
                                {t('nav.services')}
                                <ChevronRight className={`h-4 w-4 transition-transform ${isAr ? '-rotate-90' : 'rotate-90'}`} />
                            </button>
                            <div className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute ${isAr ? 'right-0' : 'left-0'} mt-3 w-64 bg-white shadow-xl rounded-2xl border border-gray-100 py-3 z-40`}>
                                <Link
                                    to="/services"
                                    className="block px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-[0.16em] hover:bg-gray-50"
                                >
                                    {t('home.servicesTag')}
                                </Link>
                                <Link
                                    to="/services/print-cut"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-brand-red"
                                >
                                    Print &amp; Cut
                                </Link>
                                <Link
                                    to="/services/maps"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-brand-red"
                                >
                                    Maps
                                </Link>
                                <Link
                                    to="/services/copy-center"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-brand-red"
                                >
                                    Copy Center
                                </Link>
                                <Link
                                    to="/services/custom-printing"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-brand-red"
                                >
                                    Custom Printing
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Desktop right section */}
                    <div className="hidden md:flex items-center gap-3">
                        <LangButton />
                        {user ? (
                            <>
                                <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-gray-600 hover:text-brand-red transition-colors p-2" title={t('nav.admin')}>
                                        <Settings className="h-5 w-5" />
                                    </Link>
                                )}
                                <Link to="/dashboard" className="text-gray-600 hover:text-brand-red transition-colors p-2" title={t('nav.dashboard')}>
                                    <User className="h-5 w-5" />
                                </Link>
                                <Link to="/cart" className="text-gray-600 hover:text-brand-red transition-colors p-2 relative" title={t('nav.cart')}>
                                    <ShoppingCart className="h-5 w-5" />
                                    {getCartCount() > 0 && (
                                        <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                            {getCartCount()}
                                        </span>
                                    )}
                                </Link>
                                <button onClick={handleLogout} className="text-gray-600 hover:text-brand-red transition-colors p-2">
                                    <LogOut className="h-5 w-5" />
                                </button>
                                <Link to="/builder" className="bg-brand-dark text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                                    {t('nav.startProject')}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-brand-red font-medium transition-colors">{t('nav.signIn')}</Link>
                                <Link to="/register" className="bg-brand-red text-white px-5 py-2.5 rounded-full font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                                    {t('auth.signUp')}
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile right */}
                    <div className="md:hidden flex items-center gap-3">
                        <LangButton />
                        <Link to="/cart" className="text-brand-dark hover:text-brand-red transition-colors p-2 relative">
                            <ShoppingCart className="h-6 w-6" />
                            {getCartCount() > 0 && (
                                <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                        <button className="text-brand-dark hover:text-brand-red transition-colors p-2" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: isAr ? '-100%' : '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: isAr ? '-100%' : '100%' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                            className={`fixed top-0 ${isAr ? 'left-0' : 'right-0'} h-full w-[80%] max-w-sm bg-white shadow-2xl z-50 flex flex-col md:hidden`}
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <span className="font-bold text-xl tracking-tight text-brand-dark">Menu</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white rounded-full text-gray-500 hover:text-brand-red hover:bg-red-50 transition-all border border-gray-100 shadow-sm">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
                                <Link to="/catalog" className="flex items-center justify-between p-4 rounded-xl hover:bg-brand-red/5 text-brand-dark font-medium transition-colors group">
                                    {t('nav.catalog')}
                                    <ChevronRight className={`h-4 w-4 text-gray-300 group-hover:text-brand-red transition-colors ${isAr ? 'rotate-180' : ''}`} />
                                </Link>
                                <Link to="/services" className="flex items-center justify-between p-4 rounded-xl hover:bg-brand-red/5 text-brand-dark font-medium transition-colors group">
                                    {t('nav.services')}
                                    <ChevronRight className={`h-4 w-4 text-gray-300 group-hover:text-brand-red transition-colors ${isAr ? 'rotate-180' : ''}`} />
                                </Link>

                                {user ? (
                                    <div className="pt-6 mt-6 border-t border-gray-100">
                                        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Account</p>
                                        <Link to="/dashboard" className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                                            <User className="h-5 w-5 text-gray-400" />
                                            <span>{t('nav.dashboard')}</span>
                                        </Link>
                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                                                <Settings className="h-5 w-5 text-gray-400" />
                                                <span>{t('nav.admin')}</span>
                                            </Link>
                                        )}
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-red-50 text-red-600 transition-colors mt-2">
                                            <LogOut className="h-5 w-5" />
                                            <span>{t('nav.signOut')}</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col gap-3 px-2">
                                        <Link to="/login" className="w-full py-3 text-center rounded-xl border-2 border-brand-dark text-brand-dark font-bold hover:bg-brand-dark hover:text-white transition-colors">
                                            {t('nav.signIn')}
                                        </Link>
                                        <Link to="/register" className="w-full py-3 text-center rounded-xl bg-brand-red text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-colors">
                                            {t('nav.createAccount')}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {user && (
                                <div className="p-4 border-t border-gray-100 bg-gray-50 pb-8">
                                    <Link to="/builder" className="w-full flex items-center justify-center gap-2 bg-brand-dark text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors">
                                        <span>{t('nav.startProject')}</span>
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
