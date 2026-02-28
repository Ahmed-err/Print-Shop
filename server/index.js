const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing Middleware
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const orderRoutes = require('./routes/order');
const adminRoutes = require('./routes/admin');
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Static Uploads Folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Basic Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Pro Print Shop API' });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Database connection placeholder (will be used when MongoDB URI is provided)
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('MongoDB connection error:', err));
} else {
    console.log('No MONGODB_URI provided. Running without database connection.');
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
