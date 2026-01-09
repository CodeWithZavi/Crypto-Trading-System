import React, { useState, useContext, useEffect } from 'react';
import { MOCK_COINS } from '../utils/mockData';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Card from '../components/Card';

const QuickTrade = () => {
    const { user, refreshUser } = useContext(AuthContext);
    const [selectedCoinId, setSelectedCoinId] = useState(MOCK_COINS[0].id);
    const [amount, setAmount] = useState('');
    const [side, setSide] = useState('BUY');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedCoin = MOCK_COINS.find(c => c.id === selectedCoinId);
    const price = selectedCoin ? selectedCoin.price : 0;

    // Calculate Holdings
    const holding = user?.portfolio?.find(p => p.coinId === selectedCoin?.id)?.amount || 0;
    const availableUSDT = user?.demoBalance || 0;

    const total = (parseFloat(amount || 0) * price).toFixed(2);

    const handleTrade = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await api.post('/trade/execute', {
                type: side,
                coinId: selectedCoin.id,
                symbol: selectedCoin.symbol,
                amount: parseFloat(amount),
                price: parseFloat(price),
                orderType: 'MARKET'
            });

            toast.success(res.data.message);
            refreshUser();
            setAmount('');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Trade failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-2xl mx-auto flex flex-col justify-center min-h-[80vh]">
            <h1 className="text-3xl font-bold mb-8 text-center">Quick Trade</h1>

            <Card className="p-8">
                {/* Buy/Sell Toggles */}
                <div className="flex bg-gray-800 rounded p-1 mb-6">
                    <button
                        className={`flex-1 py-3 rounded text-lg font-bold transition-all ${side === 'BUY' ? 'bg-crypto-green text-black' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setSide('BUY')}
                    >
                        Buy
                    </button>
                    <button
                        className={`flex-1 py-3 rounded text-lg font-bold transition-all ${side === 'SELL' ? 'bg-crypto-red text-black' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setSide('SELL')}
                    >
                        Sell
                    </button>
                </div>

                {/* Coin Selection */}
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2">Select Asset</label>
                    <select
                        value={selectedCoinId}
                        onChange={(e) => setSelectedCoinId(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-crypto-accent outline-none"
                    >
                        {MOCK_COINS.map(coin => (
                            <option key={coin.id} value={coin.id}>
                                {coin.name} ({coin.symbol}) - ${coin.price.toLocaleString()}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Amount Input */}
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2">
                        Amount ({side === 'BUY' ? selectedCoin?.symbol : selectedCoin?.symbol})
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-crypto-accent outline-none text-right pr-20"
                            placeholder="0.00"
                        />
                        <span className="absolute right-4 top-3.5 text-gray-500 font-bold">
                            {selectedCoin?.symbol}
                        </span>
                    </div>

                    {/* Available Balance Display */}
                    <div className="text-right mt-2 text-sm text-gray-400">
                        Available: <span className="text-white font-mono">
                            {side === 'BUY'
                                ? `$${availableUSDT.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                                : `${holding} ${selectedCoin?.symbol}`
                            }
                        </span>
                    </div>
                </div>

                {/* Estimated Total */}
                <div className="bg-gray-800/50 p-4 rounded mb-8 flex justify-between items-center">
                    <span className="text-gray-400">Estimated Total (USDT)</span>
                    <span className="text-xl font-mono font-bold text-white">
                        ${total.toLocaleString()}
                    </span>
                </div>

                {/* Execute Button */}
                <Button
                    onClick={handleTrade}
                    variant={side === 'BUY' ? 'success' : 'danger'}
                    size="full"
                    className="py-4 text-lg font-bold text-black"
                    isLoading={isSubmitting}
                >
                    {side === 'BUY' ? `Buy ${selectedCoin?.symbol}` : `Sell ${selectedCoin?.symbol}`}
                </Button>
            </Card>
        </div>
    );
};

export default QuickTrade;
