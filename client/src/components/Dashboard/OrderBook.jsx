import React, { useState, useEffect } from 'react';
import Card from '../Card';

const OrderRow = ({ price, amount, total, type, maxTotal }) => {
    const percent = maxTotal > 0 ? (total / maxTotal) * 100 : 0;
    return (
        <div className="relative flex justify-between text-xs py-0.5 px-2 hover:bg-gray-700/50 cursor-pointer">
            <div
                className={`absolute top-0 right-0 bottom-0 opacity-10 ${type === 'bid' ? 'bg-crypto-green' : 'bg-crypto-red'}`}
                style={{ width: `${percent}%` }}
            />
            <span className={`z-10 ${type === 'bid' ? 'text-crypto-green' : 'text-crypto-red'}`}>{price?.toFixed(2)}</span>
            <span className="z-10 text-gray-300">{amount?.toFixed(4)}</span>
            <span className="z-10 text-gray-500">{total?.toFixed(2)}</span>
        </div>
    );
};

const OrderBook = ({ selectedCoin }) => {
    const [bids, setBids] = useState([]);
    const [asks, setAsks] = useState([]);

    // Generate mock order book data
    useEffect(() => {
        if (!selectedCoin || !selectedCoin.currentPrice) return;

        const generateOrders = (basePrice, isBid) => {
            const orders = [];
            let currentPrice = basePrice;
            for (let i = 0; i < 15; i++) {
                const amount = Math.random() * 2;
                const total = amount * currentPrice; // Simplified
                orders.push({ price: currentPrice, amount, total });
                currentPrice += isBid ? -(Math.random() * basePrice * 0.001) : (Math.random() * basePrice * 0.001);
            }
            return orders;
        };

        // Initial generation
        setBids(generateOrders(selectedCoin.currentPrice * 0.999, true));
        setAsks(generateOrders(selectedCoin.currentPrice * 1.001, false).reverse()); // Asks go up

        // Simulate updates
        const interval = setInterval(() => {
            if (Math.random() > 0.5) {
                setBids(prev => {
                    if (prev.length === 0) return prev;
                    const newBids = [...prev];
                    if (newBids[0]) newBids[0].amount = Math.random() * 2;
                    return [...newBids];
                })
            } else {
                setAsks(prev => {
                    if (prev.length === 0) return prev;
                    const newAsks = [...prev];
                    if (newAsks[newAsks.length - 1]) newAsks[newAsks.length - 1].amount = Math.random() * 2;
                    return [...newAsks];
                })
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedCoin]);

    if (!selectedCoin) return <div className="text-white text-xs p-2">Loading Order Book...</div>;

    return (
        <Card className="h-full flex flex-col p-2 min-h-[400px] overflow-hidden">
            <div className="shrink-0">
                <h3 className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider">Order Book</h3>
                <div className="flex justify-between text-xs text-gray-500 mb-1 px-2">
                    <span>Price(USDT)</span>
                    <span>Amount</span>
                    <span>Total</span>
                </div>
            </div>

            {/* Content Container - Scrollable if needed, or just top-aligned */}
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-start">

                {/* Asks (Sell Orders) - Red */}
                {/* Removed flex-1 so it doesn't stretch. Content sits naturally. */}
                <div className="flex flex-col-reverse gap-0.5 pb-1">
                    {asks.map((ask, i) => (
                        <OrderRow key={i} {...ask} type="ask" maxTotal={100} />
                    ))}
                </div>

                <div className="py-2 border-y border-gray-800 my-1 text-center font-bold text-lg text-white shrink-0 sticky top-0 bg-crypto-light z-10">
                    ${selectedCoin.currentPrice?.toLocaleString()}
                </div>

                {/* Bids (Buy Orders) - Green */}
                <div className="flex flex-col gap-0.5 pt-1">
                    {bids.map((bid, i) => (
                        <OrderRow key={i} {...bid} type="bid" maxTotal={100} />
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default OrderBook;
