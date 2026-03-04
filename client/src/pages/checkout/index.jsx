import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { CreditCard, CheckCircle2, Banknote } from 'lucide-react';
import axios from 'axios';

const CheckoutForm = ({ orderDetails, onSuccess }) => {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const token = user?.token;

    const handleSubmit = async (event, method) => {
        event.preventDefault();
        setProcessing(true);
        setError(null);

        try {
            // Simulating a successful network charge and placing order
            if (method === 'cod') {
                // Cash on delivery directly places the order
                await axios.post('http://localhost:5000/api/orders', {
                    orderItems: orderDetails.cart.map(item => ({
                        product: item.product,
                        paperType: item.paper,
                        finish: item.finish,
                        quantity: item.quantity,
                        price: parseFloat(item.price),
                        designFileUrl: item.artwork
                    })),
                    shippingAddress: {
                        address: "123 Default Street",
                        city: "Print City",
                        postalCode: "12345",
                        country: "EG"
                    },
                    paymentMethod: "Cash on Delivery",
                    itemsPrice: orderDetails.total,
                    taxPrice: 0.00,
                    shippingPrice: 0.00,
                    totalPrice: orderDetails.total
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setProcessing(false);
                onSuccess();
            } else if (method === 'paymob') {
                // For Paymob, we trigger the backend sequence to get an iframe URL
                const response = await axios.post('http://localhost:5000/api/orders/paymob/auth', {
                    amount: orderDetails.total,
                    cart: orderDetails.cart
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Redirect user to the Paymob iframe URL returned by our backend
                if (response.data && response.data.url) {
                    window.location.href = response.data.url;
                } else {
                    throw new Error("Invalid Paymob response");
                }
            }
        } catch (err) {
            console.error(err);
            setError("Failed to create order. Please try again.");
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, orderDetails.method)} className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    Payment Instructions
                </h3>
                <div className="p-4 border border-gray-300 rounded-md bg-gray-50 text-gray-600">
                    {orderDetails.method === 'cod'
                        ? "You will pay for your order in cash upon delivery."
                        : "You will be redirected to the secure Paymob gateway to complete your credit card payment."}
                </div>
                {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
            </div>
            <button
                disabled={processing}
                className={`w-full text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center ${orderDetails.method === 'cod' ? 'bg-green-600 hover:bg-green-700' : 'bg-brand-dark hover:bg-gray-800'
                    }`}
            >
                {processing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                    orderDetails.method === 'cod' ? `Place Order ($${orderDetails.total})` : `Pay with Paymob ($${orderDetails.total})`
                )}
            </button>
        </form>
    );
};

export default function Checkout() {
    const { cart, getCartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const amount = getCartTotal();

    useEffect(() => {
        if (cart.length === 0 && !success) {
            navigate('/cart');
        }
    }, [cart, success, navigate]);

    if (success) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-gray-50 flex flex-col justify-center items-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you for your purchase. We've received your artwork and will start processing your order immediately.
                    </p>
                    <button
                        onClick={() => {
                            clearCart();
                            navigate('/dashboard');
                        }}
                        className="w-full bg-brand-red text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                    >
                        View Order Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-brand-dark">Secure Checkout</h1>
                    <p className="text-gray-600">Complete your payment to finalize your order.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                                Select Payment Method
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* COD Option */}
                                <div
                                    className={`relative border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-brand-dark bg-brand-dark/5 ring-2 ring-brand-dark' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setPaymentMethod('cod')}
                                >
                                    <div className="flex flex-col h-full">
                                        <Banknote className={`w-8 h-8 mb-3 ${paymentMethod === 'cod' ? 'text-brand-dark' : 'text-gray-400'}`} />
                                        <span className={`font-bold ${paymentMethod === 'cod' ? 'text-brand-dark' : 'text-gray-700'}`}>Cash on Delivery</span>
                                        <span className="text-sm text-gray-500 mt-1">Pay with cash when your order arrives.</span>
                                    </div>
                                    {paymentMethod === 'cod' && (
                                        <div className="absolute top-4 right-4 text-brand-dark">
                                            <CheckCircle2 className="w-5 h-5 fill-current" />
                                        </div>
                                    )}
                                </div>

                                {/* Paymob Option */}
                                <div
                                    className={`relative border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'paymob' ? 'border-brand-dark bg-brand-dark/5 ring-2 ring-brand-dark' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setPaymentMethod('paymob')}
                                >
                                    <div className="flex flex-col h-full">
                                        <CreditCard className={`w-8 h-8 mb-3 ${paymentMethod === 'paymob' ? 'text-brand-dark' : 'text-gray-400'}`} />
                                        <span className={`font-bold ${paymentMethod === 'paymob' ? 'text-brand-dark' : 'text-gray-700'}`}>Credit/Debit Card</span>
                                        <span className="text-sm text-gray-500 mt-1">Secure payment via Paymob network.</span>
                                    </div>
                                    {paymentMethod === 'paymob' && (
                                        <div className="absolute top-4 right-4 text-brand-dark">
                                            <CheckCircle2 className="w-5 h-5 fill-current" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <CheckoutForm
                            orderDetails={{ total: amount, cart, method: paymentMethod }}
                            onSuccess={() => setSuccess(true)}
                        />
                    </div>

                    <div className="w-full md:w-96">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>{cart.length} item(s)</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>Tax (Included)</span>
                                    <span>$0.00</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-6">
                                <span className="text-lg font-bold">Total Due</span>
                                <span className="text-2xl font-bold text-brand-red">${amount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
