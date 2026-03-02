const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Review = require('../models/Review');

const router = express.Router();

// @route GET /api/reviews/:product
// @desc Get all reviews for a specific product
// @access Public
router.get('/:product', async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.product })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews' });
    }
});

// @route POST /api/reviews
// @desc Create a new review
// @access Private
router.post('/', protect, async (req, res) => {
    try {
        const { product, rating, comment } = req.body;

        // Optional: Check if user already reviewed this product to prevent spam
        const alreadyReviewed = await Review.findOne({
            product: product,
            user: req.user._id
        });

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }

        const review = new Review({
            user: req.user._id,
            product,
            rating: Number(rating),
            comment,
        });

        const createdReview = await review.save();

        // Populate the user name before sending back so it renders immediately
        await createdReview.populate('user', 'name');

        res.status(201).json(createdReview);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review' });
    }
});

module.exports = router;
