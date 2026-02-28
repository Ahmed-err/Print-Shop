import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, Package, DollarSign, Activity, Settings, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        pendingOrders: 0,
        completedOrders: 0
    });
    const [loading, setLoading] = useState(true);

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    useEffect(() => {
        // Mock data fetching for admin orders
        setTimeout(() => {
            const mockOrders = [
                {
                    _id: 'ord-admin-001',
                    user: { name: 'John Doe', email: 'john@example.com' },
                    createdAt: new Date().toISOString(),
                    totalPrice: 150.00,
                    isPaid: true,
                    status: 'Pending',
                    orderItems: [{ product: 'Business Cards', quantity: 500 }]
                },
                {
                    _id: 'ord-admin-002',
                    user: { name: 'Jane Smith', email: 'jane@example.com' },
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    totalPrice: 45.00,
                    isPaid: true,
                    status: 'Completed',
                    orderItems: [{ product: 'Posters', quantity: 10 }]
                }
            ];

            setOrders(mockOrders);
            setStats({
                totalRevenue: 195.00,
                pendingOrders: 1,
                completedOrders: 1
            });
            setLoading(false);
        }, 800);
    }, []);

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage shop orders, users, and settings.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                            <Settings className="w-4 h-4 mr-2" /> Settings
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
                        <div className="p-3 rounded-lg bg-green-100 mr-4">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
                        <div className="p-3 rounded-lg bg-blue-100 mr-4">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
                        <div className="p-3 rounded-lg bg-purple-100 mr-4">
                            <CheckCircle className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Completed</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
                        <div className="p-3 rounded-lg bg-orange-100 mr-4">
                            <Activity className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active Users</p>
                            <p className="text-2xl font-bold text-gray-900">124</p>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                            Recent Orders
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {order._id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{order.user.name}</div>
                                            <div className="text-sm text-gray-500">{order.user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.orderItems[0].quantity}x {order.orderItems[0].product}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ${order.totalPrice.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {order.status === 'Pending' && (
                                                <button
                                                    onClick={() => updateOrderStatus(order._id, 'Completed')}
                                                    className="bg-brand-dark text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors"
                                                >
                                                    Mark Complete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
