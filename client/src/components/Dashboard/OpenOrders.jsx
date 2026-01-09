import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const OpenOrders = ({ currentPrice, onOrderFilled }) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/trade/orders');
            setOrders(res.data);
        } catch (err) {
            console.error('Failed to fetch orders', err);
        }
    };

    useEffect(() => {
        fetchOrders(); // Initial fetch
        const interval = setInterval(fetchOrders, 3000); // Poll for new orders frequently
        return () => clearInterval(interval);
    }, []);

    // Check for execution logic
    useEffect(() => {
        if (!currentPrice || orders.length === 0) return;

        orders.forEach(async (order) => {
            let shouldExecute = false;
            // Buy Limit: Execute if price drops below or equal to limit
            if (order.type === 'BUY' && currentPrice <= order.price) shouldExecute = true;
            // Sell Limit: Execute if price rises above or equal to limit
            if (order.type === 'SELL' && currentPrice >= order.price) shouldExecute = true;

            if (shouldExecute) {
                try {
                    await api.put(`/trade/orders/${order._id}/fill`);
                    toast.success(`Limit Order Executed: ${order.type} ${order.symbol} @ ${order.price}`);
                    if (onOrderFilled) onOrderFilled();
                    fetchOrders(); // Refresh list
                } catch (err) {
                    // Ignore error if order already filled concurrently
                    console.log('Order execution attempt', err);
                }
            }
        });
    }, [currentPrice, orders]);

    const handleCancel = async (id) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await api.delete(`/trade/orders/${id}`);
            toast.info('Order cancelled');
            fetchOrders();
            if (onOrderFilled) onOrderFilled(); // Refresh user balance
        } catch (err) {
            toast.error('Failed to cancel order');
        } finally {
            setIsLoading(false);
        }
    };

    if (orders.length === 0) return (
        <div className="w-full bg-crypto-light border-t border-gray-800 p-4 min-h-[100px] flex items-center justify-center text-gray-500 text-xs">
            No Open Orders
        </div>
    );

    return (
        <div className="w-full bg-crypto-light border-t border-gray-800 p-4 h-[200px] overflow-y-auto custom-scrollbar">
            <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Open Orders</h3>
            <table className="w-full text-xs text-left">
                <thead className="text-gray-500 border-b border-gray-800">
                    <tr>
                        <th className="pb-2">Time</th>
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Symbol</th>
                        <th className="pb-2 text-right">Price</th>
                        <th className="pb-2 text-right">Amount</th>
                        <th className="pb-2 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-800/50">
                            <td className="py-3 text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</td>
                            <td className={`py-3 font-bold ${order.type === 'BUY' ? 'text-crypto-green' : 'text-crypto-red'}`}>
                                {order.type}
                            </td>
                            <td className="py-3 text-white font-bold">{order.symbol}</td>
                            <td className="py-3 text-right text-white">{order.price.toFixed(order.price < 1 ? 6 : 2)}</td>
                            <td className="py-3 text-right text-gray-300">{order.amount}</td>
                            <td className="py-3 text-right">
                                <button
                                    onClick={() => handleCancel(order._id)}
                                    className="text-gray-500 hover:text-crypto-red transition-colors"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OpenOrders;
