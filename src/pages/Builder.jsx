import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, File, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function Builder() {
    const { t } = useTranslation();
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [submittingReview, setSubmittingReview] = useState(false);

    const [config, setConfig] = useState({
        product: '',
        size: '',
        paper: '',
        finish: '',
        quantity: 1
    });

    const { settings } = useContext(SettingsContext);
    const bSettings = settings?.builder || {};

    const products = bSettings.products?.length > 0 ? bSettings.products : [
        { id: 'business-cards', name: t('builderOptions.products.business-cards'), basePrice: 15 },
        { id: 'posters', name: t('builderOptions.products.posters'), basePrice: 25 },
        { id: 'flyers', name: t('builderOptions.products.flyers'), basePrice: 20 },
    ];

    const defaultPaper = [
        { id: 'standard', name: t('builderOptions.paper.standard'), multiplier: 1.0 },
        { id: 'premium', name: t('builderOptions.paper.premium'), multiplier: 1.5 }
    ];
    const paperOptions = (bSettings.paperOptions?.length > 0 ? bSettings.paperOptions : defaultPaper).filter(
        (opt) => opt.enabled !== false
    );

    const defaultFinish = [
        { id: 'matte', name: t('builderOptions.finish.matte'), multiplier: 1.0 },
        { id: 'glossy', name: t('builderOptions.finish.glossy'), multiplier: 1.2 }
    ];
    const finishOptions = (bSettings.finishOptions?.length > 0 ? bSettings.finishOptions : defaultFinish).filter(
        (opt) => opt.enabled !== false
    );

    const defaultSizes = [
        { id: 'a4', name: 'A4 - 21x29.7 cm' },
        { id: 'a3', name: 'A3 - 29.7x42 cm' },
        { id: 'a5', name: 'A5 - 14.8x21 cm' }
    ];
    const sizeOptions = (bSettings.sizeOptions?.length > 0 ? bSettings.sizeOptions : defaultSizes).filter(
        (opt) => opt.enabled !== false
    );

    const quantities = bSettings.quantities?.length > 0 ? bSettings.quantities : [1, 10, 50, 100, 250, 500];

    const updateConfig = (key, value) => {
        setConfig({ ...config, [key]: value });
    };

    // Fetch reviews whenever the product changes
    React.useEffect(() => {
        if (config.product) {
            axios.get(`http://localhost:5000/api/reviews/${config.product}`)
                .then(res => setReviews(res.data))
                .catch(err => console.error('Could not fetch reviews', err));
        } else {
            setReviews([]);
        }
    }, [config.product]);

    const submitReview = async (e) => {
        e.preventDefault();
        if (!user) {
            alert(t('builder.loginToReview'));
            return;
        }
        setSubmittingReview(true);
        try {
            const res = await axios.post('http://localhost:5000/api/reviews', {
                product: config.product,
                rating: newReview.rating,
                comment: newReview.comment
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setReviews([res.data, ...reviews]);
            setNewReview({ rating: 5, comment: '' });
        } catch (err) {
            alert(err.response?.data?.message || t('builder.alertSubmitReviewFailed'));
        } finally {
            setSubmittingReview(false);
        }
    };

    const calculateTotal = () => {
        const base = products.find(p => p.id === config.product)?.basePrice || 0;
        const multiplier = config.quantity / 100;
        const paperPremium = paperOptions.find(p => p.id === config.paper)?.multiplier || 1;
        const finishPremium = finishOptions.find(f => f.id === config.finish)?.multiplier || 1;

        return (base * multiplier * paperPremium * finishPremium).toFixed(2);
    };

    return (
        <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-brand-dark">{t('builder.title')}</h1>
                    <p className="text-gray-600">{t('builder.subtitle')}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Form Area */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        {/* Step 1: Product Selection */}
                        <div className={`mb-10 ${step !== 1 && 'opacity-50'}`}>
                            <div className="flex items-center mb-4">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white mr-3 ${step >= 1 ? 'bg-brand-red' : 'bg-gray-300'}`}>1</div>
                                <h2 className="text-2xl font-bold">{t('builder.step1')}</h2>
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
                                <h2 className="text-2xl font-bold">{t('builder.step2')}</h2>
                            </div>

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pl-11 rtl:pl-0 rtl:pr-11">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('builder.sizeLabel')}</label>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            {sizeOptions.map((opt) => {
                                                const val = opt.id;
                                                return (
                                                    <button
                                                        key={val}
                                                        onClick={() => updateConfig('size', val)}
                                                        className={`p-4 border rounded-lg text-center ${config.size === val ? 'border-brand-red bg-red-50 text-brand-red' : 'border-gray-200 hover:bg-gray-50'}`}
                                                    >
                                                        {opt.name}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('builder.paperQuality')}</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {paperOptions.map((opt) => {
                                                const val = opt.id;
                                                return (
                                                    <button
                                                        key={val}
                                                        onClick={() => updateConfig('paper', val)}
                                                        className={`p-4 border rounded-lg text-center ${config.paper === val ? 'border-brand-red bg-red-50 text-brand-red' : 'border-gray-200 hover:bg-gray-50'}`}
                                                    >
                                                        {opt.name}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('builder.finish')}</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {finishOptions.map((opt) => {
                                                const val = opt.id;
                                                return (
                                                    <button
                                                        key={val}
                                                        onClick={() => updateConfig('finish', val)}
                                                        className={`p-4 border rounded-lg text-center ${config.finish === val ? 'border-brand-red bg-red-50 text-brand-red' : 'border-gray-200 hover:bg-gray-50'}`}
                                                    >
                                                        {opt.name}
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
                                        {t('builder.continueUpload')} <ChevronRight className="ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 h-5 w-5" />
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Step 3: Upload */}
                        <div className={`mb-10 ${step !== 3 && 'opacity-50'}`}>
                            <div className="flex items-center mb-4">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white mr-3 ${step >= 3 ? 'bg-brand-red' : 'bg-gray-300'}`}>3</div>
                                <h2 className="text-2xl font-bold">{t('builder.step3')}</h2>
                            </div>

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pl-11 rtl:pl-0 rtl:pr-11">
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
                                                            alert(t('builder.alertUploadFailed'));
                                                        }
                                                    } catch (err) {
                                                        console.error(err);
                                                        alert(t('builder.alertUploadFailed'));
                                                    }
                                                }
                                            }}
                                            accept=".pdf,.ai,.psd,.jpg,.jpeg,.png"
                                        />

                                        {config.artwork ? (
                                            <div>
                                                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                                                <p className="text-lg font-medium text-gray-700">{t('builder.uploadSuccess')}</p>
                                                <p className="text-sm text-gray-400 mt-2 truncate max-w-xs mx-auto">{config.artwork}</p>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4 group-hover:text-brand-red transition-colors" />
                                                <p className="text-lg font-medium text-gray-700">{t('builder.dropDesign')}</p>
                                                <p className="text-sm text-gray-500 mb-4">{t('builder.acceptedFiles')}</p>
                                                <button className="bg-white border border-gray-300 px-6 py-2 rounded-full font-medium group-hover:border-brand-red pointer-events-none">{t('builder.browseFiles')}</button>
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
                            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4">{t('builder.orderSummary')}</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">{t('builder.product')}</span>
                                    <span className="font-medium capitalize">{products.find(p => p.id === config.product)?.name || config.product.replace('-', ' ') || '-'}</span>
                                </div>
                                {config.size && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">{t('builder.sizeLabel')}</span>
                                        <span className="font-medium capitalize">
                                            {sizeOptions.find((s) => s.id === config.size)?.name || config.size}
                                        </span>
                                    </div>
                                )}
                                {config.paper && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">{t('builder.paper')}</span>
                                        <span className="font-medium capitalize">{paperOptions.find(p => p.id === config.paper)?.name || config.paper}</span>
                                    </div>
                                )}
                                {config.finish && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">{t('builder.finishLabel')}</span>
                                        <span className="font-medium capitalize">{finishOptions.find(f => f.id === config.finish)?.name || config.finish}</span>
                                    </div>
                                )}
                                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">{t('builder.quantity')}</span>
                                        <select
                                            value={quantities.includes(config.quantity) ? config.quantity : ''}
                                            onChange={e => {
                                                const val = parseInt(e.target.value || '0', 10);
                                                if (val > 0) updateConfig('quantity', val);
                                            }}
                                            className="bg-gray-800 border-none text-white rounded p-1 text-sm outline-none"
                                        >
                                            <option value="">{t('builder.customQuantityPlaceholder')}</option>
                                            {quantities.map(q => (
                                                <option key={q} value={q}>{q}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs text-gray-400">{t('builder.customQuantityLabel')}</span>
                                        <input
                                            type="number"
                                            min={1}
                                            value={config.quantity}
                                            onChange={e => {
                                                const val = parseInt(e.target.value || '1', 10);
                                                updateConfig('quantity', isNaN(val) || val < 1 ? 1 : val);
                                            }}
                                            className="w-24 bg-gray-800 border border-gray-600 text-white rounded px-2 py-1 text-sm outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-6">
                                <span className="text-lg">{t('builder.total')}</span>
                                <span className="text-3xl font-bold text-brand-red">${calculateTotal()}</span>
                            </div>

                            <button
                                onClick={() => {
                                    if (!config.artwork) {
                                        alert(t('builder.alertNoArtwork'));
                                        return;
                                    }
                                    addToCart({
                                        ...config,
                                        price: calculateTotal()
                                    });
                                    navigate('/cart');
                                }}
                                disabled={!config.product || !config.paper || !config.finish || !config.artwork}
                                className="w-full bg-brand-red text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('builder.addToCart')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                {config.product && (
                    <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                            <h2 className="text-2xl font-bold flex items-center">
                                {t('builder.customerReviews')}
                                <span className="ml-3 rtl:mr-3 rtl:ml-0 text-sm font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{reviews.length} {t('builder.totalReviews')}</span>
                            </h2>
                            {reviews.length > 0 && (
                                <div className="flex items-center text-yellow-400">
                                    <Star className="h-5 w-5 fill-current" />
                                    <span className="ml-1 font-bold text-gray-900">
                                        {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Write Review Form */}
                            <div className="lg:col-span-1 border-r rtl:border-l rtl:border-r-0 border-gray-100 pr-0 lg:pr-8 rtl:lg:pl-8 rtl:lg:pr-0">
                                <h3 className="text-lg font-bold mb-4">{t('builder.leaveReview')}</h3>
                                {!user ? (
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
                                        <p className="text-gray-600 mb-4">{t('builder.loginToReview')}</p>
                                        <button onClick={() => navigate('/login')} className="text-brand-red font-bold hover:underline">{t('builder.loginNow')}</button>
                                    </div>
                                ) : (
                                    <form onSubmit={submitReview} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('builder.rating')}</label>
                                            <div className="flex space-x-2 rtl:space-x-reverse">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                                        className={`p-1 focus:outline-none transition-colors ${newReview.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    >
                                                        <Star className={`h-8 w-8 ${newReview.rating >= star ? 'fill-current' : ''}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('builder.feedback')}</label>
                                            <textarea
                                                required
                                                rows="4"
                                                value={newReview.comment}
                                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-brand-red focus:ring-brand-red resize-none p-3 border"
                                                placeholder={t('builder.feedbackPlaceholder')}
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={submittingReview}
                                            className="w-full bg-brand-dark text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50"
                                        >
                                            {submittingReview ? t('builder.submitting') : t('builder.postReview')}
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Reviews List */}
                            <div className="lg:col-span-2 space-y-6">
                                {reviews.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        <Star className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                                        <p>{t('builder.noReviews')}</p>
                                    </div>
                                ) : (
                                    reviews.map((review) => (
                                        <div key={review._id} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 bg-brand-dark rounded-full flex items-center justify-center text-white font-bold">
                                                        {review.user?.name?.charAt(0) || 'A'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{review.user?.name}</p>
                                                        <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
