import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function Cart() {
    const { cart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100">
                    <ShoppingBag className="mx-auto h-20 w-20 text-gray-300 mb-6" />
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't started a print project yet.</p>
                    <Link to="/builder" className="bg-brand-red text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors inline-flex items-center">
                        Start Building <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-brand-dark mb-8">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {cart.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={item.id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-center"
                            >
                                <div className="h-24 w-24 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-200">
                                    <ShoppingBag className="h-10 w-10 text-gray-400" />
                                </div>
                                <div className="flex-1 w-full flex flex-col sm:flex-row justify-between items-center sm:items-start">
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900 capitalize mb-2">{item.product.replace('-', ' ')}</h3>
                                        <div className="text-sm text-gray-500 grid flex-col gap-1">
                                            <span><strong>Paper:</strong> <span className="capitalize">{item.paper}</span></span>
                                            <span><strong>Finish:</strong> <span className="capitalize">{item.finish}</span></span>
                                            <span><strong>Qty:</strong> {item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 sm:mt-0 flex flex-col items-end gap-4 w-full sm:w-auto">
                                        <span className="text-2xl font-bold text-brand-dark">${parseFloat(item.price).toFixed(2)}</span>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="w-full lg:w-80">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">Order Summary</h3>

                            <div className="space-y-4 mb-6 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cart.length} items)</span>
                                    <span className="font-medium text-gray-900">${getCartTotal()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-3xl font-bold text-brand-red">${getCartTotal()}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-brand-dark text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 mb-4"
                            >
                                Secure Checkout
                            </button>

                            <button
                                onClick={clearCart}
                                className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
