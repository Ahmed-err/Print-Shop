import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ImageIcon, Layers, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function Home() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-brand-light min-h-[90vh] flex items-center">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-2xl"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full text-sm font-semibold text-brand-red mb-6 shadow-sm border border-red-100">
                            <Zap className="h-4 w-4" />
                            <span>Next-Day Delivery Available</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-brand-dark leading-tight mb-6">
                            Print perfection, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-500">
                                delivered faster.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Premium quality printing for professionals. Upload your designs, configure your materials, and get stunning results delivered to your door.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <Link to="/builder" className="bg-brand-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-200 hover:-translate-y-1 flex items-center group">
                                Configure Print
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/services" className="bg-white text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 border border-gray-200 transition-all shadow-sm">
                                Explore Services
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="hidden md:block relative"
                    >
                        {/* Visual representation of high-quality print */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-red/20 aspect-[4/5] bg-gradient-to-tr from-brand-dark to-gray-800 p-8 flex flex-col justify-between group">
                            <div className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/previews/071/978/949/non_2x/large-format-printer-processing-vivid-color-roll-photo.jpg')] bg-cover bg-center opacity-100 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                            <div className="relative z-10 text-brand-light">
                                <Layers className="h-12 w-12 mb-4 text-brand-red" />
                                <h3 className="text-2xl font-bold mb-2">Premium Matting</h3>
                                <p className="text-gray-300">300gsm Ultra White</p>
                            </div>
                            <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                                <div className="flex items-center space-x-3 text-white">
                                    <ImageIcon className="h-6 w-6" />
                                    <span className="font-medium">CMYK Color Accurate</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Services Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-brand-dark mb-4">Popular Services</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to make a lasting impression.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Business Cards', desc: 'Premium thick cards with multiple finishes.', img: 'https://i.pinimg.com/736x/d1/75/8d/d1758d1d96db4e9a71d7bb56472629ee.jpg' },
                            { title: 'Marketing Posters', desc: 'Vibrant large-format printing.', img: 'https://i.pinimg.com/736x/6e/d6/41/6ed64117c3f6bf766fdf4ac2bd4706e0.jpg' },
                            { title: 'Custom Packaging', desc: 'Branded boxes and mailing materials.', img: 'https://i.pinimg.com/1200x/96/05/04/960504aa2e47d7321962c780f8cbfc35.jpg' }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -8 }}
                                className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-brand-dark mb-2">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.desc}</p>
                                    <span className="text-brand-red font-semibold flex items-center group-hover:text-red-700">
                                        Order Now <ArrowRight className="ml-1 h-4 w-4" />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
