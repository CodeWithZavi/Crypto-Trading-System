import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, ArrowUp, ArrowDown, ChevronRight, Filter } from 'lucide-react';
import { MOCK_COINS } from '../utils/mockData';
import Card from '../components/Card';
import Input from '../components/Input';
import AnimatedCounter from '../components/AnimatedCounter';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-toastify';

const ALL_COINS = MOCK_COINS;

const Markets = () => {
    const navigate = useNavigate();
    const { user, refreshUser } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('spot');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'marketCap', direction: 'desc' });

    const handleToggleWatchlist = async (e, coinId) => {
        e.stopPropagation();
        if (!user) return toast.error('Please login to use watchlist');
        try {
            await api.post('/auth/watchlist', { coinId });
            refreshUser();
        } catch (error) {
            toast.error('Failed to update watchlist');
        }
    };

    // Filter Logic
    const filteredCoins = ALL_COINS.filter(coin => {
        const matchesSearch = coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 'favorites') {
            return matchesSearch && user?.watchlist?.includes(coin.id);
        }
        return matchesSearch;
    });

    // Sort Logic
    const sortedCoins = [...filteredCoins].sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        const cleanNumber = (val) => {
            if (typeof val === 'string') {
                if (val.includes('B')) return parseFloat(val) * 1000000000;
                if (val.includes('M')) return parseFloat(val) * 1000000;
                if (val.includes('T')) return parseFloat(val) * 1000000000000;
                return parseFloat(val);
            }
            return val;
        };

        if (sortConfig.key === 'marketCap' || sortConfig.key === 'volume') {
            aValue = cleanNumber(aValue);
            bValue = cleanNumber(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });
    };

    return (
        <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-full">
            <h1 className="text-3xl font-bold mb-6">Markets Overview</h1>

            {/* Top Stats Cards */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2 custom-scrollbar">
                <div className="min-w-[250px] bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shrink-0">
                    <h3 className="text-gray-400 text-xs uppercase mb-1">Highlight Coin</h3>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="font-bold text-lg">Bitcoin</span>
                            <span className="text-xs ml-2 bg-gray-700 px-1 rounded">BTC</span>
                        </div>
                        <span className="text-crypto-green font-bold">+2.4%</span>
                    </div>
                </div>
                <div className="min-w-[250px] bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shrink-0">
                    <h3 className="text-gray-400 text-xs uppercase mb-1">Top Vol</h3>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="font-bold text-lg">Ethereum</span>
                            <span className="text-xs ml-2 bg-gray-700 px-1 rounded">ETH</span>
                        </div>
                        <span className="text-white font-mono">$3.2B</span>
                    </div>
                </div>
                <div className="min-w-[250px] bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shrink-0">
                    <h3 className="text-gray-400 text-xs uppercase mb-1">New Listing</h3>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="font-bold text-lg">Pepe</span>
                            <span className="text-xs ml-2 bg-yellow-900/50 text-yellow-500 px-1 rounded">Meme</span>
                        </div>
                        <span className="text-crypto-green font-bold">+25.4%</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex gap-6 border-b border-gray-700 w-full md:w-auto overflow-x-auto custom-scrollbar">
                    {['Spot', 'Favorites', 'Futures', 'New Listing', 'Gainers', 'Losers'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`pb-2 text-sm font-bold whitespace-nowrap ${activeTab === tab.toLowerCase() || (activeTab === 'spot' && tab === 'Spot') ? 'text-crypto-accent border-b-2 border-crypto-accent' : 'text-gray-400 hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="w-full md:w-64">
                    <Input
                        placeholder="Search Coin Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-gray-800 border-gray-700 focus:border-crypto-accent"
                    />
                </div>
            </div>

            {/* Markets Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase font-semibold">
                            <tr>
                                <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                                    Name <Filter size={10} className="inline ml-1" />
                                </th>
                                <th className="p-4 text-right cursor-pointer hover:text-white" onClick={() => handleSort('price')}>
                                    Price <Filter size={10} className="inline ml-1" />
                                </th>
                                <th className="p-4 text-right cursor-pointer hover:text-white" onClick={() => handleSort('change')}>
                                    24h Change <Filter size={10} className="inline ml-1" />
                                </th>
                                <th className="p-4 text-right cursor-pointer hover:text-white" onClick={() => handleSort('volume')}>
                                    24h Volume <Filter size={10} className="inline ml-1" />
                                </th>
                                <th className="p-4 text-right cursor-pointer hover:text-white" onClick={() => handleSort('marketCap')}>
                                    Market Cap <Filter size={10} className="inline ml-1" />
                                </th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {sortedCoins.map((coin) => {
                                const isWatchlisted = user?.watchlist?.includes(coin.id);
                                return (
                                    <tr
                                        key={coin.id}
                                        onClick={() => navigate(`/trade/${coin.symbol}`)}
                                        className="hover:bg-gray-800/30 transition-colors cursor-pointer group"
                                    >
                                        <td className="p-4 font-bold flex items-center gap-3">
                                            <button
                                                onClick={(e) => handleToggleWatchlist(e, coin.id)}
                                                className="focus:outline-none p-1 rounded-full hover:bg-gray-700 transition-colors"
                                            >
                                                <Star
                                                    size={16}
                                                    className={`transition-colors ${isWatchlisted ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600 hover:text-yellow-400'}`}
                                                />
                                            </button>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/24' }}
                                                    className="w-6 h-6"
                                                    alt={coin.symbol}
                                                />
                                                <span className="font-bold text-white group-hover:text-crypto-accent transition-colors">{coin.symbol}</span>
                                                <span className="text-xs text-gray-500 font-normal">{coin.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right font-medium text-white">
                                            ${coin.price < 1 ? coin.price.toFixed(8).replace(/\.?0+$/, "") : coin.price.toLocaleString()}
                                        </td>
                                        <td className={`p-4 text-right font-bold ${coin.change >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                                            {coin.change > 0 ? '+' : ''}{coin.change}%
                                        </td>
                                        <td className="p-4 text-right text-gray-400 font-mono text-sm">
                                            ${coin.volume}
                                        </td>
                                        <td className="p-4 text-right text-gray-400 font-mono text-sm">
                                            ${coin.marketCap}
                                        </td>
                                        <td className="p-4 text-center">
                                            <button className="text-crypto-accent hover:text-white text-xs font-bold transition-colors flex items-center justify-center mx-auto gap-1">
                                                Trade <ChevronRight size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Markets;
