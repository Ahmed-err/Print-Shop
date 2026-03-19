import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Upload, Sliders, ShieldCheck, Truck, Star, CheckCircle, Award, Clock, Users, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();
    const { settings } = useContext(SettingsContext);

    const defaultServices = [
        { title: t('home.service1Title'), desc: t('home.service1Desc'), img: 'https://images.pexels.com/photos/6214474/pexels-photo-6214474.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: t('home.service2Title'), desc: t('home.service2Desc'), img: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: t('home.service3Title'), desc: t('home.service3Desc'), img: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=800' },
    ];

    const displayServices = settings?.services?.length > 0 ? settings.services.slice(0, 3) : defaultServices;
    const heroRightImage = settings?.heroImages?.[0] || 'https://images.pexels.com/photos/1250346/pexels-photo-1250346.jpeg?auto=compress&cs=tinysrgb&w=800';
    const heroTopBadgeImage = settings?.heroImages?.[1] || 'https://images.pexels.com/photos/7054780/pexels-photo-7054780.jpeg?auto=compress&cs=tinysrgb&w=500';
    const heroBotBadgeImage = settings?.heroImages?.[2] || 'https://images.pexels.com/photos/6214472/pexels-photo-6214472.jpeg?auto=compress&cs=tinysrgb&w=600';

    const STATS = [
        { value: '12K+', label: t('home.statsCustomers'), icon: <Users className="h-6 w-6" /> },
        { value: '99%', label: t('home.statsOnTime'), icon: <Clock className="h-6 w-6" /> },
        { value: '50+', label: t('home.statsProducts'), icon: <Package className="h-6 w-6" /> },
        { value: '5★', label: t('home.statsRating'), icon: <Star className="h-6 w-6" /> },
    ];

    const HOW_IT_WORKS = [
        { icon: <Upload className="h-8 w-8 text-brand-red" />, title: t('home.step1Title'), desc: t('home.step1Desc') },
        { icon: <Sliders className="h-8 w-8 text-brand-dark" />, title: t('home.step2Title'), desc: t('home.step2Desc') },
        { icon: <ShieldCheck className="h-8 w-8 text-brand-red" />, title: t('home.step3Title'), desc: t('home.step3Desc') },
        { icon: <Truck className="h-8 w-8 text-brand-dark" />, title: t('home.step4Title'), desc: t('home.step4Desc') },
    ];



    const FEATURES = [
        { icon: <Award className="h-8 w-8 text-brand-red" />, title: t('home.feat1Title'), desc: t('home.feat1Desc') },
        { icon: <Clock className="h-8 w-8 text-brand-dark" />, title: t('home.feat2Title'), desc: t('home.feat2Desc') },
        { icon: <CheckCircle className="h-8 w-8 text-brand-red" />, title: t('home.feat3Title'), desc: t('home.feat3Desc') },
        { icon: <Truck className="h-8 w-8 text-brand-dark" />, title: t('home.feat4Title'), desc: t('home.feat4Desc') },
    ];

    const TESTIMONIALS = [
        { name: 'Ahmed Khalil', role: 'Marketing Manager', text: 'The quality of the business cards we ordered was exceptional. Sharp colours, thick stock — our clients noticed immediately.', rating: 5 },
        { name: 'Sara Hassan', role: 'Event Coordinator', text: 'Ordered 500 event posters with a tight deadline. They delivered the day before the event with zero issues. Highly recommend.', rating: 5 },
        { name: 'Omar Farouk', role: 'Startup Founder', text: 'Onboarding was a breeze. The file upload, the config, the payment — everything was seamless. Will be using again for sure.', rating: 5 },
    ];

    return (
        <div className="pt-20 overflow-x-hidden">

            {/* ══════════ HERO ══════════ */}
            <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-[#f8f9fc] via-white to-[#fdf2f2] overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-brand-red/6 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-brand-red/40 rounded-full animate-ping pointer-events-none" />
                <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-brand-dark/30 rounded-full animate-pulse pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-16 items-center py-16">
                    {/* left */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-semibold text-brand-red mb-8 shadow-sm border border-red-100"
                        >
                            <Zap className="h-4 w-4 shrink-0" />
                            <span>{t('home.badge')}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black text-brand-dark leading-[1.08] tracking-tight mb-6"
                        >
                            {t('home.heroTitle1')}{' '}
                            <span className="relative">
                                <span className="absolute -inset-1 bg-gradient-to-r from-brand-red/30 to-red-400/30 blur-lg rounded-lg" />
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-500">
                                    {t('home.heroTitle2')}
                                </span>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg"
                        >
                            {t('home.heroSubtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link to="/builder" className="inline-flex items-center gap-2 bg-brand-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 hover:shadow-[0_0_35px_rgba(220,38,38,0.35)] transition-all duration-300 group transform hover:-translate-y-0.5">
                                {t('home.ctaStart')}
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/services" className="inline-flex items-center gap-2 bg-white text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-dark hover:text-white border border-gray-200 transition-all duration-300 shadow-sm">
                                {t('home.ctaExplore')}
                            </Link>
                        </motion.div>
                    </div>

                    {/* right — image collage */}
                    <div className="hidden md:block relative h-[580px]">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-tr from-brand-red/15 to-brand-dark/8 rounded-full blur-3xl pointer-events-none"
                        />

                        {/* Main card */}
                        <motion.div
                            initial={{ opacity: 0, y: 60, rotate: 0 }}
                            animate={{ opacity: 1, y: 0, rotate: 3 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] h-[440px] rounded-2xl shadow-2xl overflow-hidden z-20 border-[3px] border-white group"
                        >
                            <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                style={{ backgroundImage: `url('${heroRightImage}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white z-10 rtl:left-auto rtl:right-6">
                                <p className="text-xs font-semibold text-red-300 uppercase tracking-widest mb-1">{t('home.premiumPrint')}</p>
                                <h3 className="text-xl font-black">300 gsm Ultra White</h3>
                                <p className="text-gray-300 text-sm mt-0.5">CMYK Colour Accurate</p>
                            </div>
                        </motion.div>

                        {/* Floating badge — top left */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
                            transition={{ opacity: { delay: 0.5, duration: 0.7 }, x: { delay: 0.5, duration: 0.7 }, y: { repeat: Infinity, duration: 4, ease: 'easeInOut' } }}
                            className="absolute top-[8%] left-[0%] w-52 rounded-xl shadow-xl overflow-hidden z-30 border-2 border-white -rotate-6 group"
                        >
                            <div className="w-full h-32 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                style={{ backgroundImage: `url('${heroTopBadgeImage}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-black/20 to-transparent p-3 flex flex-col justify-end">
                                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded w-max mb-1 uppercase tracking-wider">{t('home.inStock')}</span>
                                <span className="text-white font-bold text-sm flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400" /> {t('home.fastTurnaround')}</span>
                            </div>
                        </motion.div>

                        {/* Floating badge — bottom right */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0, y: [0, 14, 0] }}
                            transition={{ opacity: { delay: 0.7, duration: 0.7 }, x: { delay: 0.7, duration: 0.7 }, y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 } }}
                            className="absolute bottom-[12%] right-[1%] w-60 rounded-xl shadow-2xl overflow-hidden z-30 border-2 border-white rotate-6 group"
                        >
                            <div className="w-full h-36 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                style={{ backgroundImage: `url('${heroBotBadgeImage}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-black/20 to-transparent p-3 flex flex-col justify-end">
                                <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded w-max mb-1 uppercase tracking-wider">{t('home.bestSeller')}</span>
                                <span className="text-white font-bold text-sm">{t('home.service1Title')}</span>
                            </div>
                        </motion.div>

                        {/* Status pill */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
                            className="absolute top-[22%] right-[4%] z-40"
                        >
                            <div className="bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-xl flex items-center gap-2.5">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                                </span>
                                <span className="text-sm font-bold text-brand-dark">{t('home.systemsOnline')}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ opacity: { delay: 1.5, duration: 0.8 }, y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400"
                >
                    <span className="text-xs font-medium tracking-widest uppercase">{t('home.scroll')}</span>
                    <div className="w-px h-10 bg-gradient-to-b from-gray-400 to-transparent" />
                </motion.div>
            </section>

            {/* ══════════ STATS BAR ══════════ */}
            <section className="bg-brand-dark py-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex flex-col items-center text-center text-white gap-2"
                        >
                            <span className="text-brand-red/80">{s.icon}</span>
                            <span className="text-3xl font-black">{s.value}</span>
                            <span className="text-gray-400 text-sm font-medium">{s.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════ HOW IT WORKS ══════════ */}
            <section className="py-28 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-brand-red font-bold uppercase tracking-widest text-sm mb-3">{t('home.processTag')}</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-brand-dark mb-4">{t('home.processTitle')}</motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-gray-500 max-w-2xl mx-auto">{t('home.processSubtitle')}</motion.p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-11 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />
                        {HOW_IT_WORKS.map((step, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: i * 0.15 }} className="flex flex-col items-center text-center group">
                                <div className="relative w-24 h-24 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center mb-6 group-hover:border-brand-red/40 group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
                                    <div className="absolute inset-0 rounded-full bg-brand-red/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
                                    <div className="relative z-10">{step.icon}</div>
                                </div>
                                <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-red transition-colors">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed px-2">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ POPULAR SERVICES ══════════ */}
            <section className="py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-brand-red font-bold uppercase tracking-widest text-sm mb-3">{t('home.servicesTag')}</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-brand-dark mb-4">{t('home.servicesTitle')}</motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-gray-500 max-w-2xl mx-auto">{t('home.servicesSubtitle')}</motion.p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {displayServices.map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: i * 0.15 }} whileHover={{ y: -8 }} className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-dark/10 border border-gray-100 bg-white transition-all duration-300">
                                <div className="h-60 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('${s.image || s.img}')` }} />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-brand-dark mb-2">{s.title}</h3>
                                    <p className="text-gray-500 mb-4">{s.desc}</p>
                                    <Link to="/catalog" className="text-brand-red font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                        {t('home.orderNow')} <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ WHY CHOOSE US ══════════ */}
            <section className="py-28 bg-brand-dark relative overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-brand-red font-bold uppercase tracking-widest text-sm mb-3">{t('home.whyTag')}</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-white mb-4">{t('home.whyTitle')}</motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-gray-400 text-xl max-w-2xl mx-auto">{t('home.whySubtitle')}</motion.p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FEATURES.map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: i * 0.12 }} whileHover={{ y: -6 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-brand-red/40 transition-all duration-300 group">
                                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-brand-red/20 transition-colors duration-300">{f.icon}</div>
                                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ TESTIMONIALS ══════════ */}
            <section className="py-28 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-brand-red font-bold uppercase tracking-widest text-sm mb-3">{t('home.testimonialTag')}</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-brand-dark mb-4">{t('home.testimonialTitle')}</motion.h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((t2, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: i * 0.12 }} className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:border-brand-red/20 transition-all duration-300">
                                <div className="flex gap-0.5 mb-5">
                                    {[...Array(t2.rating)].map((_, s) => <Star key={s} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-6 italic">"{t2.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white font-bold text-sm">{t2.name.charAt(0)}</div>
                                    <div>
                                        <p className="font-bold text-brand-dark text-sm">{t2.name}</p>
                                        <p className="text-gray-400 text-xs">{t2.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ CTA BANNER ══════════ */}
            <section className="py-24 bg-gradient-to-r from-brand-red via-red-600 to-red-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                        {t('home.ctaBannerTitle1')}<br />
                        <span className="text-yellow-300">{t('home.ctaBannerTitle2')}</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-red-100 text-xl mb-10 max-w-xl mx-auto">
                        {t('home.ctaBannerSub')}
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-4 justify-center">
                        <Link to="/builder" className="inline-flex items-center gap-2 bg-white text-brand-red px-10 py-4 rounded-full font-black text-lg hover:bg-yellow-300 transition-all duration-300 shadow-2xl group">
                            {t('home.ctaConfigure')}
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/catalog" className="inline-flex items-center gap-2 bg-transparent text-white px-10 py-4 rounded-full font-bold text-lg border-2 border-white/40 hover:bg-white hover:text-brand-red transition-all duration-300">
                            {t('home.ctaBrowse')}
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
