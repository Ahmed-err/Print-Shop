const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const Settings = require('../models/Settings');

const router = express.Router();

// Seed data function to create initial settings if none exist
const seedInitialSettings = async () => {
    try {
        const count = await Settings.countDocuments();
        if (count === 0) {
            const initialSettings = {
                heroImages: [
                    'https://images.pexels.com/photos/1250346/pexels-photo-1250346.jpeg?auto=compress&cs=tinysrgb&w=800',
                    'https://images.pexels.com/photos/7054780/pexels-photo-7054780.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6214472/pexels-photo-6214472.jpeg?auto=compress&cs=tinysrgb&w=600',
                    'https://images.pexels.com/photos/6214474/pexels-photo-6214474.jpeg?auto=compress&cs=tinysrgb&w=800'
                ],
                services: [
                    {
                        id: 'print-cut',
                        title: 'Print & Cut',
                        description: 'High-precision printing and cutting for cards, stickers, labels, packaging mockups and more.',
                        price: 'From $15.00',
                        image: 'https://images.pexels.com/photos/7054779/pexels-photo-7054779.jpeg?auto=compress&cs=tinysrgb&w=800',
                        productIds: ['business-cards', 'flyers']
                    },
                    {
                        id: 'maps',
                        title: 'Maps & Large Format',
                        description: 'Wide-format printing for maps, plans, architectural drawings and technical documents.',
                        price: 'From $20.00',
                        image: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800',
                        productIds: ['posters']
                    },
                    {
                        id: 'copy-center',
                        title: 'Copy Center',
                        description: 'Fast scanning and copying for documents, booklets, reports and study materials.',
                        price: 'From $5.00',
                        image: 'https://images.pexels.com/photos/7054785/pexels-photo-7054785.jpeg?auto=compress&cs=tinysrgb&w=800',
                        productIds: ['flyers']
                    },
                    {
                        id: 'custom-printing',
                        title: 'Custom Printing',
                        description: 'Personalized printing for t‑shirts, mugs, gifts and branded merchandise.',
                        price: 'Custom Quote',
                        image: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=800',
                        productIds: ['business-cards']
                    }
                ],
                catalog: [
                    {
                        id: 'c1',
                        name: 'Premium Business Cards',
                        price: 'From $15',
                        image: 'https://images.unsplash.com/photo-1718670013921-2f144aba173a?q=80&w=760&auto=format&fit=crop'
                    },
                    {
                        id: 'c2',
                        name: 'Event Flyers',
                        price: 'From $25',
                        image: 'https://images.unsplash.com/photo-1617355405361-29f0f0a3d737?q=80&w=387&auto=format&fit=crop'
                    },
                    {
                        id: 'c3',
                        name: 'Custom Posters',
                        price: 'From $20',
                        image: 'https://images.unsplash.com/photo-1591351659190-6258bbec984d?q=80&w=387&auto=format&fit=crop'
                    },
                    {
                        id: 'c4',
                        name: 'Vinyl Banners',
                        price: 'From $45',
                        image: 'https://images.unsplash.com/photo-1715788089786-4c343fd6d93f?q=80&w=580&auto=format&fit=crop'
                    }
                ],
                builder: {
                    products: [
                        { id: 'business-cards', name: 'Business Cards', basePrice: 15 },
                        { id: 'posters', name: 'Posters', basePrice: 25 },
                        { id: 'flyers', name: 'Flyers', basePrice: 20 },
                    ],
                    paperOptions: [
                        { id: 'standard', name: 'Standard (14pt)', multiplier: 1.0 },
                        { id: 'premium', name: 'Premium (16pt)', multiplier: 1.5 }
                    ],
                    finishOptions: [
                        { id: 'matte', name: 'Matte', multiplier: 1.0 },
                        { id: 'glossy', name: 'Glossy', multiplier: 1.2 }
                    ],
                    quantities: [100, 250, 500, 1000, 2500]
                }
            };
            await Settings.create(initialSettings);
            console.log('Seeded initial settings data.');
        }
    } catch (error) {
        console.error('Failed to seed settings', error);
    }
};

// Seed on module load
seedInitialSettings();

// @route GET /api/settings
// @desc Get global application settings
// @access Public
router.get('/', async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching settings' });
    }
});

// @route PUT /api/settings
// @desc Update global application settings
// @access Private/Admin
router.put('/', protect, admin, async (req, res) => {
    try {
        const settingsData = req.body;

        let settings = await Settings.findOne();
        if (!settings) {
            // Create if it magically didn't exist
            settings = await Settings.create(settingsData);
            return res.status(201).json(settings);
        }

        // Update fields
        if (settingsData.heroImages) settings.heroImages = settingsData.heroImages;
        if (settingsData.services) settings.services = settingsData.services;
        if (settingsData.catalog) settings.catalog = settingsData.catalog;
        if (settingsData.builder) settings.builder = settingsData.builder;

        const updatedSettings = await settings.save();
        res.json(updatedSettings);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error updating settings' });
    }
});

module.exports = router;
