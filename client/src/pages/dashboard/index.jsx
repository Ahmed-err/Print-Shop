import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Package, Clock, CheckCircle, FileText } from 'lucide-react';

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Fetching an aggregate of user orders (assuming backend later provides this route)
                // For now, we mock some recent activity to complete the Phase 2 UI.
                const mockOrders = [
                    {
                        _id: 'ord-12345',
                        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                        totalPrice: 45.00,
                        isPaid: true,
                        status: 'Processing',
                        orderItems: [{ product: 'Business Cards', quantity: 100 }]
                    },
                    {
                        _id: 'ord-67890',
                        createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
                        totalPrice: 120.00,
                        isPaid: true,
                        status: 'Delivered',
                        orderItems: [{ product: 'Posters', quantity: 50 }]
                    }
                ];

                setTimeout(() => {
                    setOrders(mockOrders);
                    setLoading(false);
                }, 800);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 bg-brand-dark rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                            <p className="text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                            <Package className="mr-2 h-5 w-5 text-brand-red" />
                            Recent Orders
                        </h2>
                    </div>

                    {orders.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No orders found. Head to the builder to start your first project!
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {order._id.substring(0, 8)}...
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {order.orderItems[0].quantity}x {order.orderItems[0].product}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {order.status === 'Delivered' && <CheckCircle className="w-3 h-3 mr-1 mt-0.5" />}
                                                    {order.status === 'Processing' && <Clock className="w-3 h-3 mr-1 mt-0.5" />}
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                ${order.totalPrice.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-brand-red hover:text-red-900 flex items-center justify-end w-full">
                                                    <FileText className="h-4 w-4 mr-1" />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
