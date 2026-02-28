import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../../context/AuthContext';
import { CreditCard, CheckCircle2 } from 'lucide-react';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Default Stripe test key for demo

const CheckoutForm = ({ clientSecret, orderDetails, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        // In a real app we'd confirm the payment intent here
        // const payload = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: { card: elements.getElement(CardElement) }
        // });

        // Simulating a successful network charge for the demo since we don't have a real strict clientSecret setup
        setTimeout(() => {
            setProcessing(false);
            onSuccess();
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-brand-dark" />
                    Payment Details
                </h3>
                <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                        },
                    }} />
                </div>
                {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
            </div>

            <button
                disabled={processing || !stripe}
                className="w-full bg-brand-dark text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center"
            >
                {processing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                    `Pay $${orderDetails.total}`
                )}
            </button>
        </form>
    );
};

export default function Checkout() {
    const [searchParams] = useSearchParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');
    const [success, setSuccess] = useState(false);

    const amount = searchParams.get('total') || '0.00';
    const product = searchParams.get('product') || 'Custom Print';

    useEffect(() => {
        // In a real app, you'd fetch the checkout intent from the server here
        // fetch('/api/orders/create-intent', ...)
        setClientSecret('mock_secret_' + Math.random());
    }, []);

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
                        onClick={() => navigate('/dashboard')}
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
                    <div className="flex-1">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                clientSecret={clientSecret}
                                orderDetails={{ total: amount, product }}
                                onSuccess={() => setSuccess(true)}
                            />
                        </Elements>
                    </div>

                    <div className="w-full md:w-96">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium capitalize">{product.replace('-', ' ')}</span>
                                    <span className="font-bold">${amount}</span>
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
