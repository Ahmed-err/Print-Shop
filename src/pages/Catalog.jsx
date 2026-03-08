import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Printer, Image as ImageIcon, Map, FileText, ChevronRight } from 'lucide-react';

const products = [
    {
        id: 'business-cards',
        name: 'Business Cards',
        description: 'Make a lasting first impression with premium quality business cards.',
        icon: FileText,
        price: 'From $15',
        features: ['14pt & 16pt cardstock', 'Matte or Glossy finish', 'Standard and Custom sizes']
    },
    {
        id: 'posters',
        name: 'Posters',
        description: 'Stand out from the crowd with vibrant, high-resolution posters.',
        icon: ImageIcon,
        price: 'From $25',
        features: ['High-gloss UV coating', 'Durable paper options', 'Multiple large formats']
    },
    {
        id: 'flyers',
        name: 'Flyers',
        description: 'Spread the word quickly with eye-catching and affordable flyers.',
        icon: Map,
        price: 'From $20',
        features: ['Double-sided printing', 'Various folding options', 'Bulk discounts available']
    },
    {
        id: 'banners',
        name: 'Vinyl Banners',
        description: 'Durable and weather-resistant banners for both indoor and outdoor use.',
        icon: Printer,
        price: 'From $45',
        features: ['Heavy-duty vinyl', 'Grommets included', 'Fade-resistant ink']
    }
];

export default function Catalog() {
    return (
        <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold text-brand-dark sm:text-5xl">
                        Our Print Catalog
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Explore our wide range of premium printing services designed to elevate your brand.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group"
                        >
                            <div className="flex items-start justify-between">
                                <div className="bg-red-50 p-4 rounded-xl group-hover:bg-brand-red transition-colors duration-300">
                                    <product.icon className="h-8 w-8 text-brand-red group-hover:text-white transition-colors duration-300" />
                                </div>
                                <span className="bg-gray-100 text-brand-dark px-4 py-1.5 rounded-full text-sm font-bold">
                                    {product.price}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{product.name}</h2>
                            <p className="text-gray-600 mb-6">{product.description}</p>

                            <ul className="space-y-3 mb-8">
                                {product.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-sm text-gray-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red mr-2"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to={`/builder?product=${product.id}`}
                                className="inline-flex items-center text-brand-red font-bold hover:text-red-700 transition-colors"
                            >
                                Start Designing <ChevronRight className="ml-1 h-5 w-5" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
