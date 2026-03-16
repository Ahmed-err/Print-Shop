const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    id: { type: String, required: true }, // stable identifier, used as slug on frontend
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    // Optional: which builder/catalog products belong to this service
    productIds: [{ type: String }],
});

const catalogSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true }, // E.g. "From $15"
    image: { type: String, required: true },
});

const builderConfigSchema = mongoose.Schema({
    products: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        basePrice: { type: Number, required: true },
    }],
    paperOptions: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        multiplier: { type: Number, required: true }, // e.g. 1.0 for standard, 1.5 for premium
        enabled: { type: Boolean, default: true },
    }],
    finishOptions: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        multiplier: { type: Number, required: true },
        enabled: { type: Boolean, default: true },
    }],
    sizeOptions: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        enabled: { type: Boolean, default: true },
    }],
    quantities: [{ type: Number }], // e.g. [100, 250, 500, 1000, 2500]
});

const settingsSchema = mongoose.Schema({
    heroImages: [{ type: String }],
    services: [serviceSchema],
    catalog: [catalogSchema],
    builder: builderConfigSchema,
}, {
    timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
