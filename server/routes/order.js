const express = require('express');
const Stripe = require('stripe');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mocked');

// @route POST /api/orders
// @desc Create new order
// @access Private
router.post('/', protect, async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        try {
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create order' });
        }
    }
});

// @route POST /api/orders/:id/pay
// @desc Create stripe payment intent
// @access Private
router.post('/:id/create-payment-intent', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(order.totalPrice * 100), // amount in cents
                currency: 'usd',
                metadata: { orderId: order._id.toString() }
            });

            res.json({
                clientSecret: paymentIntent.client_secret,
            });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route PUT /api/orders/:id/pay
// @desc Update order to paid
// @access Private
router.put('/:id/pay', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing payment status update' });
    }
});

module.exports = router;
