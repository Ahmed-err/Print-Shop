const express = require('express');
const axios = require('axios');
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
// @desc Initialize Paymob payment
// @access Private
router.post('/paymob/auth', protect, async (req, res) => {
    try {
        const { amount, cart, paymentMethodType, mobileNumber } = req.body;

        // 1. Get Auth Token
        const authRes = await axios.post('https://accept.paymob.com/api/auth/tokens', {
            api_key: process.env.PAYMOB_API_KEY
        });
        const pToken = authRes.data.token;

        // 2. Register Order
        const orderRes = await axios.post('https://accept.paymob.com/api/ecommerce/orders', {
            auth_token: pToken,
            delivery_needed: false,
            amount_cents: Math.round(amount * 100).toString(),
            currency: "EGP",
            items: [],
        });
        const pOrderId = orderRes.data.id;

        // 3. Request Payment Key
        let integrationId;
        if (paymentMethodType === 'card') integrationId = process.env.PAYMOB_INTEGRATION_ID_CARD;
        else if (paymentMethodType === 'wallet') integrationId = process.env.PAYMOB_INTEGRATION_ID_WALLET;
        else if (paymentMethodType === 'instapay') integrationId = process.env.PAYMOB_INTEGRATION_ID_INSTAPAY;

        if (!integrationId) {
            return res.status(400).json({ message: `Integration ID for ${paymentMethodType} is not configured.` });
        }

        const keyRes = await axios.post('https://accept.paymob.com/api/acceptance/payment_keys', {
            auth_token: pToken,
            amount_cents: Math.round(amount * 100).toString(),
            expiration: 3600,
            order_id: pOrderId,
            billing_data: {
                apartment: "1", email: req.user.email || "dummy@dummy.com", floor: "1",
                first_name: req.user.name || "Customer", street: "Test", building: "1",
                phone_number: mobileNumber || "+201011122233", shipping_method: "PKG",
                postal_code: "12345", city: "Egypt", country: "EGY", last_name: "Customer", state: "Cairo"
            },
            currency: "EGP",
            integration_id: integrationId
        });

        const paymentKey = keyRes.data.token;

        // 4. Return URL Frame or Redirect URL
        if (paymentMethodType === 'card') {
            res.json({ url: `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_CARD_IFRAME_ID}?payment_token=${paymentKey}` });
        } else {
            // For Wallet / InstaPay
            const payRes = await axios.post('https://accept.paymob.com/api/acceptance/payments/pay', {
                source: {
                    identifier: mobileNumber || "wallet",
                    subtype: paymentMethodType === 'wallet' ? 'WALLET' : 'MAGVA'
                },
                payment_token: paymentKey
            });

            if (payRes.data.redirect_url) {
                res.json({ url: payRes.data.redirect_url });
            } else {
                res.status(400).json({ message: 'Paymob Error: missing redirect URL', data: payRes.data });
            }
        }
    } catch (error) {
        console.error("Paymob Error:", error.response?.data || error.message);
        res.status(500).json({ message: 'Paymob integration error', error: error.response?.data || error.message });
    }
});

// @route POST /api/orders/paymob/webhook
// @desc Handle Paymob transaction callback
// @access Public
router.post('/paymob/webhook', async (req, res) => {
    try {
        const { obj } = req.body;
        if (obj && obj.success === true) {
            // Validate HMAC payload here in a real production env.
            // Marking order as paid using the merchant_order_id if provided.
            console.log("Paymob Payment Success Callback for Order:", obj.order?.id);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error("Webhook error:", error);
        res.sendStatus(500);
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
