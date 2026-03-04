import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ImageIcon, Layers, Zap, Upload, Sliders, ShieldCheck, Truck } from 'lucide-react';
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
                            <Link to="/builder" className="bg-brand-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] transition-all shadow-lg flex items-center group">
                                Configure Print
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/services" className="bg-white text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-dark hover:text-white border border-gray-200 transition-all shadow-sm">
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

            {/* How It Works Section */}
            <section className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl font-bold text-brand-dark mb-4"
                        >
                            How It Works
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-600 max-w-2xl mx-auto"
                        >
                            Four simple steps to bring your creative vision to life with uncompromising quality.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop Only) */}
                        <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-gray-200 via-brand-red/30 to-gray-200 z-0"></div>

                        {[
                            {
                                icon: <Upload className="h-8 w-8 text-brand-red" />,
                                title: "1. Upload Design",
                                desc: "Provide your print-ready artwork or use our professional templates."
                            },
                            {
                                icon: <Sliders className="h-8 w-8 text-brand-dark" />,
                                title: "2. Configure Options",
                                desc: "Select your preferred paper weight, finish, and quantity."
                            },
                            {
                                icon: <ShieldCheck className="h-8 w-8 text-brand-red" />,
                                title: "3. Secure Payment",
                                desc: "Checkout securely via credit card, mobile wallet, or InstaPay."
                            },
                            {
                                icon: <Truck className="h-8 w-8 text-brand-dark" />,
                                title: "4. Fast Delivery",
                                desc: "We print immediately and ship directly to your door."
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-full bg-white shadow-xl shadow-brand-dark/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 border border-gray-100 group-hover:border-brand-red/30 relative">
                                    <div className="absolute inset-0 rounded-full bg-brand-red/5 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                                    <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-red transition-colors">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed px-2">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
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
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-dark/10 transition-all duration-300 border border-gray-100 bg-white"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-6 relative bg-white">
                                    <h3 className="text-xl font-bold text-brand-dark mb-2">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.desc}</p>
                                    <span className="text-brand-red font-semibold flex items-center group-hover:text-red-700">
                                        Order Now <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
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
