import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { MOCK_COINS } from '../../utils/mockData';
import Card from '../Card';
import Button from '../Button';

const CryptoGrid = () => {
    const navigate = useNavigate();

    return (
        <Card className="w-full overflow-hidden p-0">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase font-medium">
                        <tr>
                            <th className="p-4 w-12 text-center"><Star size={14} /></th>
                            <th className="p-4">Name</th>
                            <th className="p-4 text-right">Price</th>
                            <th className="p-4 text-right">24h Change</th>
                            <th className="p-4 text-right hidden md:table-cell">24h Volume</th>
                            <th className="p-4 text-right hidden lg:table-cell">Market Cap</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {MOCK_COINS.map((coin) => (
                            <tr
                                key={coin.id}
                                className="hover:bg-gray-800/30 transition-colors group cursor-pointer"
                                onClick={() => navigate('/trade')} // In real app, /trade/${coin.id}
                            >
                                <td className="p-4 text-center">
                                    <Star size={16} className="text-gray-600 hover:text-crypto-accent transition-colors" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                                            alt={coin.symbol}
                                            className="w-8 h-8 rounded-full"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/32' }}
                                        />
                                        <div>
                                            <div className="font-bold text-white text-sm">{coin.symbol}</div>
                                            <div className="text-xs text-gray-500">{coin.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-right font-medium text-white">
                                    ${coin.price < 1 ? coin.price.toFixed(8).replace(/\.?0+$/, "") : coin.price.toLocaleString()}
                                </td>
                                <td className={`p-4 text-right font-medium ${coin.change >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                                    {coin.change > 0 ? '+' : ''}{coin.change}%
                                </td>
                                <td className="p-4 text-right text-gray-300 hidden md:table-cell">
                                    ${coin.volume}
                                </td>
                                <td className="p-4 text-right text-gray-300 hidden lg:table-cell">
                                    ${coin.marketCap}
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-crypto-green hover:bg-crypto-green/10 mr-2"
                                            onClick={() => navigate('/trade')}
                                        >
                                            Buy
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default CryptoGrid;
