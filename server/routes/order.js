const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

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

// @route GET /api/orders/myorders
// @desc Get logged in user orders
// @access Private
router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// @route POST /api/orders/paymob/auth
// @desc Initialize Paymob payment (Mocked for testing until keys are provided)
// @access Private
router.post('/paymob/auth', protect, async (req, res) => {
    try {
        const { amount, cart } = req.body;

        // In a real implementation:
        // 1. axios.post(paymob auth endpoint, API_KEY) -> token
        // 2. axios.post(paymob order registration endpoint) -> order_id
        // 3. axios.post(paymob payment key endpoint) -> payment_key

        // Return a mock iframe URL that the frontend can redirect to for testing
        // You would replace 'checkout_dummy_iframe' with the actual Paymob IFRAME ID if you had keys.
        const mockIframeUrl = `https://accept.paymob.com/api/acceptance/iframes/checkout_dummy_iframe?payment_token=mocked_${Date.now()}`;

        res.json({
            url: mockIframeUrl
        });
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
