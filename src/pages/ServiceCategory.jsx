import React, { useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SettingsContext } from '../context/SettingsContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ServiceCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { settings } = useContext(SettingsContext);
    const { t } = useTranslation();

    const defaultServices = [
        {
            id: 'print-cut',
            title: t('services.categories.printCut.title'),
            description: t('services.categories.printCut.desc'),
            price: t('services.categories.printCut.price'),
            image: 'https://images.pexels.com/photos/7054779/pexels-photo-7054779.jpeg?auto=compress&cs=tinysrgb&w=800',
            productIds: ['business-cards', 'flyers']
        },
        {
            id: 'maps',
            title: t('services.categories.maps.title'),
            description: t('services.categories.maps.desc'),
            price: t('services.categories.maps.price'),
            image: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800',
            productIds: ['posters']
        },
        {
            id: 'copy-center',
            title: t('services.categories.copyCenter.title'),
            description: t('services.categories.copyCenter.desc'),
            price: t('services.categories.copyCenter.price'),
            image: 'https://images.pexels.com/photos/7054785/pexels-photo-7054785.jpeg?auto=compress&cs=tinysrgb&w=800',
            productIds: ['flyers']
        },
        {
            id: 'custom-printing',
            title: t('services.categories.customPrinting.title'),
            description: t('services.categories.customPrinting.desc'),
            price: t('services.categories.customPrinting.price'),
            image: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=800',
            productIds: ['business-cards']
        }
    ];

    const service = useMemo(() => {
        const source = settings?.services?.length ? settings.services : defaultServices;
        return source.find((s) => s.id === id);
    }, [settings, id, defaultServices]);

    const allProducts = useMemo(
        () =>
            settings?.builder?.products?.length
                ? settings.builder.products
                : [
                      { id: 'business-cards', name: t('builderOptions.products.business-cards'), price: 'From $15' },
                      { id: 'posters', name: t('builderOptions.products.posters'), price: 'From $25' },
                      { id: 'flyers', name: t('builderOptions.products.flyers'), price: 'From $20' }
                  ],
        [settings, t]
    );

    const products = useMemo(() => {
        if (!service || !service.productIds || service.productIds.length === 0) {
            return allProducts;
        }
        return allProducts.filter((p) => service.productIds.includes(p.id));
    }, [service, allProducts]);

    if (!service) {
        return (
            <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">
                        {t('services.notFound', 'Service not found.')}
                    </p>
                    <button
                        onClick={() => navigate('/services')}
                        className="px-6 py-3 rounded-full bg-brand-dark text-white font-semibold hover:bg-gray-800 transition-colors"
                    >
                        {t('services.backToAll', 'Back to all services')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red mb-3">
                            {t('home.servicesTag')}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
                            {service.title}
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            {service.description}
                        </p>
                        <p className="text-sm font-semibold text-gray-700 mb-6">
                            {service.price}
                        </p>
                    </motion.div>
                    <motion.div
                        className="relative rounded-3xl overflow-hidden shadow-xl"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/40 via-transparent to-brand-red/40 mix-blend-multiply" />
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-72 md:h-96 object-cover transform scale-[1.02]"
                        />
                    </motion.div>
                </div>

                {/* Products grid */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">
                        {t('catalog.title')}
                    </h2>
                    <p className="text-gray-600">
                        {t(
                            'catalog.subtitle',
                            'Explore our range of products available for this service.'
                        )}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {products.map((product, index) => (
                        <motion.button
                            key={product.id}
                            type="button"
                            onClick={() => navigate(`/builder?product=${product.id}`)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="text-left bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-red/60 transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-red transition-colors">
                                    {product.name}
                                </h3>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                                    {product.price}
                                </span>
                            </div>
                            {product.description && (
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {product.description}
                                </p>
                            )}
                            <p className="text-brand-red font-semibold text-sm">
                                {t('catalog.startDesigning')}
                            </p>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}

