import React, { useState, useEffect } from 'react';
import Card from '../Card';

const RecentTrades = ({ selectedCoin }) => {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        const basePrice = selectedCoin?.currentPrice || 95000;

        // Ensure we always start with data
        const initialTrades = Array(15).fill(null).map((_, i) => ({
            id: Date.now() - i * 1000,
            price: basePrice * (1 + (Math.random() - 0.5) * 0.002),
            amount: Math.random() * 0.5 + 0.01,
            time: new Date(Date.now() - i * 1000).toLocaleTimeString(),
            type: Math.random() > 0.5 ? 'buy' : 'sell'
        }));
        setTrades(initialTrades);

        const interval = setInterval(() => {
            const newTrade = {
                id: Date.now(),
                price: basePrice * (1 + (Math.random() - 0.5) * 0.001),
                amount: Math.random() * 0.5 + 0.01,
                time: new Date().toLocaleTimeString(),
                type: Math.random() > 0.5 ? 'buy' : 'sell'
            };
            setTrades(prev => [newTrade, ...prev].slice(0, 30));
        }, 1500);

        return () => clearInterval(interval);
    }, [selectedCoin]);

    return (
        <Card className="flex flex-col h-full overflow-hidden bg-gray-900 border-gray-800 rounded-none border-b-0 border-l-0 border-r-0">
            <div className="p-3 border-b border-gray-800 shrink-0">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Recent Trades</h3>
            </div>

            <div className="flex justify-between text-xs text-gray-500 px-3 py-2 shrink-0 bg-gray-900">
                <span>Price(USDT)</span>
                <span>Amount</span>
                <span>Time</span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 bg-gray-900">
                {/* Fallback for empty state */}
                {trades.length === 0 && (
                    <div className="p-4 text-center text-xs text-gray-500">Loading trades...</div>
                )}

                {trades.map((trade) => {
                    const percent = Math.min((trade.amount / 1.0) * 100, 100);
                    return (
                        <div key={trade.id} className="relative flex justify-between text-xs py-1 px-3 hover:bg-gray-800 cursor-pointer">
                            {/* Background Depth Bar */}
                            <div
                                className={`absolute top-0 right-0 bottom-0 opacity-10 ${trade.type === 'buy' ? 'bg-crypto-green' : 'bg-crypto-red'}`}
                                style={{ width: `${percent}%` }}
                            />

                            <span className={`z-10 relative ${trade.type === 'buy' ? 'text-crypto-green' : 'text-crypto-red'}`}>
                                {trade.price.toFixed(2)}
                            </span>
                            <span className="z-10 relative text-gray-300 font-mono">{trade.amount.toFixed(4)}</span>
                            <span className="z-10 relative text-gray-500">{trade.time.split(' ')[0]}</span>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default RecentTrades;
