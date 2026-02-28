const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const User = require('../models/User');

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders
// @access Private/Admin
router.get('/orders', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// @route PUT /api/admin/orders/:id/deliver
// @desc Update order to delivered
// @access Private/Admin
router.put('/orders/:id/deliver', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating delivery status' });
    }
});

// @route GET /api/admin/users
// @desc Get all users
// @access Private/Admin
router.get('/users', protect, admin, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

module.exports = router;
