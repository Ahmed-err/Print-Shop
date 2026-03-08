import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const services = [
    {
        id: 'business-cards',
        title: 'Business Cards',
        description: 'Make a lasting impression with our premium business cards. Available in multiple finishes including matte, gloss, and soft touch.',
        price: 'From $15.00',
        image: 'https://images.unsplash.com/photo-1718670013921-2f144aba173a?q=80&w=760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        popular: true
    },
    {
        id: 'posters',
        title: 'Marketing Posters',
        description: 'High-quality large format printing for events, promotions, and retail displays. UV resistant inks available.',
        price: 'From $25.00',
        image: 'https://images.unsplash.com/photo-1617355405361-29f0f0a3d737?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds',
        popular: true
    },
    {
        id: 'flyers',
        title: 'Flyers & Leaflets',
        description: 'Cost-effective mass marketing materials. Choose from various paper weights and folding options.',
        price: 'From $20.00',
        image: 'https://images.unsplash.com/photo-1591351659190-6258bbec984d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        popular: false
    },
    {
        id: 'packaging',
        title: 'Custom Packaging',
        description: 'Branded boxes, mailers, and packaging sleeves to elevate your product unboxing experience.',
        price: 'Custom Quote',
        image: 'https://images.unsplash.com/photo-1715788089786-4c343fd6d93f?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        popular: false
    }
];

export default function Services() {
    return (
        <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Our Print Services</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore our wide range of premium printing options tailored for professionals and businesses.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row group"
                        >
                            <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors z-10" />
                                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                {service.popular && (
                                    <div className="absolute top-4 left-4 z-20 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
                                        <Star className="h-3 w-3 mr-1 fill-current" /> Popular
                                    </div>
                                )}
                            </div>

                            <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-2 group-hover:text-brand-red transition-colors">{service.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-lg font-semibold text-gray-900">{service.price}</span>
                                    <Link
                                        to="/builder"
                                        className="inline-flex items-center justify-center bg-brand-light text-brand-dark border border-gray-200 hover:border-brand-red hover:text-brand-red px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Customize <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 bg-brand-dark rounded-3xl p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl" />
                    <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Don't see what you need?</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">We handle custom bespoke projects all the time. Contact our team to discuss your specific requirements and get a precise quote.</p>
                    <button className="bg-brand-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-lg relative z-10">
                        Request Custom Quote
                    </button>
                </div>
            </div>
        </div>
    );
}
