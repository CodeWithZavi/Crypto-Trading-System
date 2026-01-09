import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

const TradePanel = ({ selectedCoin }) => {
    const { user, refreshUser } = useContext(AuthContext);
    const [price, setPrice] = useState(selectedCoin.currentPrice || selectedCoin.price || 0);
    const [amount, setAmount] = useState('');
    const [orderType, setOrderType] = useState('MARKET');
    const [side, setSide] = useState('BUY');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (orderType === 'MARKET') {
            setPrice(selectedCoin.currentPrice || selectedCoin.price || 0);
        }
    }, [selectedCoin, orderType]);

    const handleTrade = async () => {
        if (!amount || parseFloat(amount) <= 0) return;

        setIsSubmitting(true);
        try {
            const res = await api.post('/trade/execute', {
                type: side,
                coinId: selectedCoin.id,
                symbol: selectedCoin.symbol,
                amount: parseFloat(amount),
                price: parseFloat(price),
                orderType // 'MARKET' or 'LIMIT'
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

    // Calculate Holdings
    const holding = user?.portfolio?.find(p => p.coinId === selectedCoin.id)?.amount || 0;
    const availableUSDT = user?.demoBalance || 0;

    // Total calculation
    const total = (parseFloat(amount || 0) * parseFloat(price || 0)).toFixed(2);

    const handlePercentage = (percent) => {
        if (side === 'BUY') {
            const maxBuy = availableUSDT / price;
            setAmount((maxBuy * percent).toFixed(6));
        } else {
            setAmount((holding * percent).toFixed(6));
        }
    };

    const [marginMode, setMarginMode] = useState('SPOT');

    const modes = [
        { id: 'SPOT', label: 'Spot' },
        { id: 'CROSS', label: 'Cross 3x' },
        { id: 'ISOLATED', label: 'Isolated 10x' }
    ];

    const [showRiskModal, setShowRiskModal] = useState(false);

    const handleModeClick = (modeId) => {
        if (modeId === 'SPOT') {
            setMarginMode('SPOT');
        } else {
            setShowRiskModal(true);
        }
    };


    return (
        <>
            <div className="h-full flex flex-col p-3 text-sm">
                {/* Header Tabs */}
                <div className="flex gap-4 mb-3 border-b border-gray-800 pb-1">
                    {modes.map(mode => (
                        <span
                            key={mode.id}
                            onClick={() => handleModeClick(mode.id)}
                            className={`font-medium px-1 pb-1 cursor-pointer transition-colors border-b-2 ${marginMode === mode.id
                                ? 'text-crypto-accent border-crypto-accent'
                                : 'text-gray-500 border-transparent hover:text-gray-300'
                                }`}
                        >
                            {mode.label}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        {/* Buy/Sell Tabs */}
                        <div className="flex bg-gray-800 rounded p-1 mb-4">
                            <button
                                className={`flex-1 py-1.5 rounded text-sm font-bold transition-all ${side === 'BUY' ? 'bg-crypto-green text-black' : 'text-gray-400 hover:text-white'}`}
                                onClick={() => setSide('BUY')}
                            >
                                Buy
                            </button>
                            <button
                                className={`flex-1 py-1.5 rounded text-sm font-bold transition-all ${side === 'SELL' ? 'bg-crypto-red text-black' : 'text-gray-400 hover:text-white'}`}
                                onClick={() => setSide('SELL')}
                            >
                                Sell
                            </button>
                        </div>

                        <div className="flex gap-2 mb-3 text-xs font-medium">
                            <span
                                className={`cursor-pointer ${orderType === 'LIMIT' ? 'text-crypto-accent' : 'text-gray-500'}`}
                                onClick={() => setOrderType('LIMIT')}
                            >
                                Limit
                            </span>
                            <span
                                className={`cursor-pointer ${orderType === 'MARKET' ? 'text-crypto-accent' : 'text-gray-500'}`}
                                onClick={() => setOrderType('MARKET')}
                            >
                                Market
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div className="relative">
                                <label className="text-xs text-gray-500 mb-1 block">Price (USDT)</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => {
                                        setOrderType('LIMIT');
                                        setPrice(e.target.value);
                                    }}
                                    disabled={orderType === 'MARKET'}
                                    className={`input-field text-right py-2 ${orderType === 'MARKET' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Amount ({selectedCoin.symbol})</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="input-field text-right py-2"
                                    placeholder="0.00"
                                />
                            </div>

                            {/* Percentage Slider / Buttons */}
                            <div className="flex gap-1 justify-between">
                                {[0.25, 0.50, 0.75, 1].map((pct) => (
                                    <button
                                        key={pct}
                                        type="button"
                                        onClick={() => handlePercentage(pct)}
                                        className="bg-gray-800 hover:bg-gray-700 text-xs text-gray-400 py-1 px-2 rounded flex-1 transition-colors"
                                    >
                                        {pct * 100}%
                                    </button>
                                ))}
                            </div>

                            <div className="relative">
                                <label className="text-xs text-gray-500 mb-1 block">Total (USDT)</label>
                                <div className="input-field text-right bg-gray-900 border-gray-800 flex justify-between items-center py-2">
                                    <span className="text-gray-500 text-xs">≈</span>
                                    <span>{total}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                                <span>Avail:</span>
                                <span className="text-white font-mono">
                                    {side === 'BUY' ? `${availableUSDT.toFixed(2)} USDT` : `${holding.toFixed(6)} ${selectedCoin.symbol}`}
                                </span>
                            </div>

                            <Button
                                onClick={handleTrade}
                                variant={side === 'BUY' ? 'success' : 'danger'}
                                size="full"
                                className="mt-2 text-black font-bold"
                                isLoading={isSubmitting}
                            >
                                {side === 'BUY' ? `Buy ${selectedCoin.symbol}` : `Sell ${selectedCoin.symbol}`}
                            </Button>
                        </div>
                    </div>

                    {/* Tip / Info Panel (Desktop only) */}
                    <div className="hidden md:flex flex-col w-1/3 text-xs text-gray-500 space-y-4 pt-10 pl-4 border-l border-gray-800">
                        <div>
                            <p className="mb-1">Maker Fee</p>
                            <p className="text-white">0.1000%</p>
                        </div>
                        <div>
                            <p className="mb-1">Taker Fee</p>
                            <p className="text-white">0.1000%</p>
                        </div>
                        <div>
                            <p className="mb-1">24h High</p>
                            <p className="text-white">{((Number(selectedCoin.currentPrice) || 0) * 1.05).toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="mb-1">24h Low</p>
                            <p className="text-white">{((Number(selectedCoin.currentPrice) || 0) * 0.95).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={showRiskModal}
                onClose={() => setShowRiskModal(false)}
                title="Risk Warning"
            >
                <div className="text-center">
                    <div className="text-yellow-500 mb-4 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                        </svg>
                    </div>
                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                        It was too risky do the demo trading first then deposit real fund to take over.
                    </p>
                    <Button
                        onClick={() => setShowRiskModal(false)}
                        className="w-full"
                    >
                        I Understand
                    </Button>
                </div>
            </Modal>
        </>
    );

};

export default TradePanel;
