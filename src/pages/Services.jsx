import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Services() {
    const { settings } = useContext(SettingsContext);
    const { t } = useTranslation();

    const defaultServices = [
        {
            id: 'print-cut',
            title: t('services.categories.printCut.title'),
            description: t('services.categories.printCut.desc'),
            price: t('services.categories.printCut.price'),
            image: 'https://images.pexels.com/photos/7054779/pexels-photo-7054779.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
            id: 'maps',
            title: t('services.categories.maps.title'),
            description: t('services.categories.maps.desc'),
            price: t('services.categories.maps.price'),
            image: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
            id: 'copy-center',
            title: t('services.categories.copyCenter.title'),
            description: t('services.categories.copyCenter.desc'),
            price: t('services.categories.copyCenter.price'),
            image: 'https://images.pexels.com/photos/7054785/pexels-photo-7054785.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
            id: 'custom-printing',
            title: t('services.categories.customPrinting.title'),
            description: t('services.categories.customPrinting.desc'),
            price: t('services.categories.customPrinting.price'),
            image: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
    ];

    const services = settings?.services?.length > 0 ? settings.services : defaultServices;

    return (
        <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
                        {t('services.title')}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('services.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 hover:border-brand-red/60 transition-all duration-300 cursor-pointer"
                        >
                            <Link to={`/services/${service.id}`} className="flex flex-col h-full">
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-90" />
                                    <div className="absolute bottom-3 left-4 right-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-200 mb-1">
                                            {t('servicesTag', 'Category')}
                                        </p>
                                        <h3 className="text-lg font-bold text-white">
                                            {service.title}
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                                        {service.description}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-sm font-semibold text-brand-dark bg-gray-100 px-3 py-1 rounded-full">
                                            {service.price}
                                        </span>
                                        <span className="text-sm font-semibold text-brand-red">
                                            {t('catalog.startDesigning')}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
