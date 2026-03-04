import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-red">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-2 group inline-block">
                            <span className="font-bold text-3xl tracking-tight text-white">
                                Harfoush<span className="text-brand-red">Print</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Delivering excellence in every dimension. We blend cutting-edge printing technology with unparalleled customer service to bring your ideas to life.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red hover:-translate-y-1 transition-all duration-300">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red hover:-translate-y-1 transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red hover:-translate-y-1 transition-all duration-300">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red hover:-translate-y-1 transition-all duration-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-6 text-lg text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/catalog" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Product Catalog</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Our Services</Link></li>
                            <li><Link to="/builder" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Start Project</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">About Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold mb-6 text-lg text-white">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-gray-400">
                                <MapPin className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                                <span>123 Printing Avenue, Design District, Cairo, Egypt</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <Phone className="w-5 h-5 text-brand-red flex-shrink-0" />
                                <span>+20 100 123 4567</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <Mail className="w-5 h-5 text-brand-red flex-shrink-0" />
                                <span>hello@harfoushprint.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold mb-6 text-lg text-white">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to receive updates, exclusive offers, and print inspiration.
                        </p>
                        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
                                />
                            </div>
                            <button className="w-full bg-brand-red hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} HarfoushPrint. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
