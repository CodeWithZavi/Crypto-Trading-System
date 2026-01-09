import { useState, useEffect } from 'react';

const COINS = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 95000 },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3500 },
    { id: 'solana', symbol: 'SOL', name: 'Solana', price: 145 },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB', price: 600 },
    { id: 'ripple', symbol: 'XRP', name: 'XRP', price: 0.60 },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.45 },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.12 },
];

const AssetList = ({ onSelect }) => {
    // In a real app, fetch live prices here
    return (
        <div className="w-full">
            <div className="px-4 py-2 border-b border-gray-800 text-xs text-gray-500 flex justify-between">
                <span>Market</span>
                <span>Price</span>
            </div>
            <ul>
                {COINS.map(coin => (
                    <li
                        key={coin.id}
                        onClick={() => onSelect && onSelect({ ...coin, currentPrice: coin.price })}
                        className="flex justify-between items-center px-4 py-3 hover:bg-gray-800 cursor-pointer border-b border-gray-800/50 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">{coin.symbol}</span>
                            <span className="text-xs text-gray-500">{coin.name}</span>
                        </div>
                        <div className="text-sm font-mono text-white">
                            ${coin.price.toLocaleString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssetList;
