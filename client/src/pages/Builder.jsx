import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Builder() {
    const [step, setStep] = useState(1);
    const [config, setConfig] = useState({
        product: '',
        size: '',
        paper: '',
        finish: '',
        quantity: 100
    });

    const products = [
        { id: 'business-cards', name: 'Business Cards', basePrice: 15 },
        { id: 'posters', name: 'Posters', basePrice: 25 },
        { id: 'flyers', name: 'Flyers', basePrice: 20 },
    ];

    const updateConfig = (key, value) => {
        setConfig({ ...config, [key]: value });
    };

    const calculateTotal = () => {
        const base = products.find(p => p.id === config.product)?.basePrice || 0;
        const multiplier = config.quantity / 100;
        const paperPremium = config.paper === 'premium' ? 1.5 : 1;
        const finishPremium = config.finish === 'glossy' ? 1.2 : 1;

        return (base * multiplier * paperPremium * finishPremium).toFixed(2);
    };

    return (
        <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-brand-dark">Configure Your Print</h1>
                    <p className="text-gray-600">Customize your order to exact specifications.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Form Area */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        {/* Step 1: Product Selection */}
                        <div className={`mb-10 ${step !== 1 && 'opacity-50'}`}>
                            <div className="flex items-center mb-4">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white mr-3 ${step >= 1 ? 'bg-brand-red' : 'bg-gray-300'}`}>1</div>
                                <h2 className="text-2xl font-bold">Select Product</h2>
                            </div>

                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {products.map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => { updateConfig('product', p.id); setStep(2); }}
                                            className={`p-6 border-2 rounded-xl text-left transition-all ${config.product === p.id ? 'border-brand-red bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <h3 className="font-bold text-lg">{p.name}</h3>
                                            <p className="text-gray-500 text-sm">From ${p.basePrice}</p>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Step 2: Customization */}
                        <div className={`mb-10 ${step !== 2 && 'opacity-50'}`}>
                            <div className="flex items-center mb-4">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white mr-3 ${step >= 2 ? 'bg-brand-red' : 'bg-gray-300'}`}>2</div>
                                <h2 className="text-2xl font-bold">Details</h2>
                            </div>

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pl-11">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Paper Quality</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['Standard (14pt)', 'Premium (16pt)'].map((type, idx) => {
                                                const val = idx === 0 ? 'standard' : 'premium';
                                                return (
                                                    <button
                                                        key={val}
                                                        onClick={() => updateConfig('paper', val)}
                                                        className={`p-4 border rounded-lg text-center ${config.paper === val ? 'border-brand-red bg-red-50 text-brand-red' : 'border-gray-200 hover:bg-gray-50'}`}
                                                    >
                                                        {type}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Finish</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['Matte', 'Glossy'].map((type, idx) => {
                                                const val = idx === 0 ? 'matte' : 'glossy';
                                                return (
                                                    <button
                                                        key={val}
                                                        onClick={() => updateConfig('finish', val)}
                                                        className={`p-4 border rounded-lg text-center ${config.finish === val ? 'border-brand-red bg-red-50 text-brand-red' : 'border-gray-200 hover:bg-gray-50'}`}
                                                    >
                                                        {type}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStep(3)}
                                        disabled={!config.paper || !config.finish}
                                        className="w-full bg-brand-dark text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        Continue to Upload <ChevronRight className="ml-2 h-5 w-5" />
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Step 3: Upload */}
                        <div className={`mb-10 ${step !== 3 && 'opacity-50'}`}>
                            <div className="flex items-center mb-4">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white mr-3 ${step >= 3 ? 'bg-brand-red' : 'bg-gray-300'}`}>3</div>
                                <h2 className="text-2xl font-bold">Upload Artwork</h2>
                            </div>

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pl-11">
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-brand-red hover:bg-red-50 transition-colors cursor-pointer group relative">

                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const formData = new FormData();
                                                    formData.append('design', file);

                                                    try {
                                                        const token = JSON.parse(localStorage.getItem('user'))?.token;
                                                        const res = await fetch('http://localhost:5000/api/upload', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Authorization': `Bearer ${token}`
                                                            },
                                                            body: formData
                                                        });

                                                        if (res.ok) {
                                                            const filePath = await res.text();
                                                            updateConfig('artwork', filePath);
                                                        } else {
                                                            alert('Upload failed. Please try again.');
                                                        }
                                                    } catch (err) {
                                                        console.error(err);
                                                        alert('Upload failed.');
                                                    }
                                                }
                                            }}
                                            accept=".pdf,.ai,.psd,.jpg,.jpeg,.png"
                                        />

                                        {config.artwork ? (
                                            <div>
                                                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                                                <p className="text-lg font-medium text-gray-700">File Uploaded Successfully</p>
                                                <p className="text-sm text-gray-400 mt-2 truncate max-w-xs mx-auto">{config.artwork}</p>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4 group-hover:text-brand-red transition-colors" />
                                                <p className="text-lg font-medium text-gray-700">Drop your design here</p>
                                                <p className="text-sm text-gray-500 mb-4">PDF, AI, PSD, or High-Res JPG/PNG</p>
                                                <button className="bg-white border border-gray-300 px-6 py-2 rounded-full font-medium group-hover:border-brand-red pointer-events-none">Browse Files</button>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                    </div>

                    {/* Sticky Summary */}
                    <div className="w-full lg:w-80">
                        <div className="bg-brand-dark text-white rounded-2xl shadow-xl p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Product</span>
                                    <span className="font-medium capitalize">{config.product.replace('-', ' ') || '-'}</span>
                                </div>
                                {config.paper && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Paper</span>
                                        <span className="font-medium capitalize">{config.paper}</span>
                                    </div>
                                )}
                                {config.finish && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Finish</span>
                                        <span className="font-medium capitalize">{config.finish}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                                    <span className="text-gray-400">Quantity</span>
                                    <select
                                        value={config.quantity}
                                        onChange={e => updateConfig('quantity', parseInt(e.target.value))}
                                        className="bg-gray-800 border-none text-white rounded p-1 text-sm outline-none"
                                    >
                                        {[100, 250, 500, 1000, 2500].map(q => (
                                            <option key={q} value={q}>{q}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-6">
                                <span className="text-lg">Total</span>
                                <span className="text-3xl font-bold text-brand-red">${calculateTotal()}</span>
                            </div>

                            <button
                                onClick={() => {
                                    if (!config.artwork) {
                                        alert("Please upload your artwork before continuing.");
                                        return;
                                    }
                                    window.location.href = `/checkout?product=${config.product}&total=${calculateTotal()}`;
                                }}
                                disabled={!config.product || !config.paper || !config.finish || !config.artwork}
                                className="w-full bg-brand-red text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
