import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chart from '../components/Dashboard/Chart';
import TradePanel from '../components/Dashboard/TradePanel';
import AssetList from '../components/Dashboard/AssetList';
import Ticker from '../components/Dashboard/Ticker';
import OrderBook from '../components/Dashboard/OrderBook';
import RecentTrades from '../components/Dashboard/RecentTrades';
import OpenOrders from '../components/Dashboard/OpenOrders';
import AuthContext from '../context/AuthContext';
import { MOCK_COINS } from '../utils/mockData';

const Trade = () => {
    const { symbol } = useParams();
    const navigate = useNavigate();
    const { refreshUser } = useContext(AuthContext);
    const [selectedCoin, setSelectedCoin] = useState({
        id: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        currentPrice: 0 // Will strictly sync with live price
    });

    // 1. Initial Data Setup
    useEffect(() => {
        if (symbol) {
            const foundCoin = MOCK_COINS.find(c => c.symbol === symbol.toUpperCase());
            if (foundCoin) {
                // Initialize with mock price first to avoid empty state
                setSelectedCoin({ ...foundCoin, currentPrice: foundCoin.price });
            } else {
                setSelectedCoin({
                    id: symbol.toLowerCase(),
                    symbol: symbol.toUpperCase(),
                    name: symbol.toUpperCase(),
                    currentPrice: 0
                });
            }
        }
    }, [symbol]);

    // 2. LIVE PRICE SYNC (Matches TradingView)
    useEffect(() => {
        if (!symbol) return;

        const fetchLivePrice = async () => {
            try {
                // Binance Public API for Price Verification
                const res = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}USDT`);
                const livePrice = parseFloat(res.data.price);

                setSelectedCoin(prev => ({
                    ...prev,
                    currentPrice: livePrice,
                    // Also update standard price prop if components use it
                    price: livePrice
                }));
            } catch (err) {
                console.warn('Failed to fetch live price, falling back to mock data');
                // Fallback logic could go here if needed
            }
        };

        fetchLivePrice(); // Immediate fetch
        const interval = setInterval(fetchLivePrice, 3000); // Sync every 3s
        return () => clearInterval(interval);
    }, [symbol]);

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-crypto-dark text-white">
            <Ticker />

            <div className="flex flex-grow overflow-hidden">
                {/* 1. Order Book (Left) */}
                <div className="hidden lg:block w-[300px] border-r border-gray-800 shrink-0">
                    <OrderBook selectedCoin={selectedCoin} />
                </div>

                {/* 2. Middle Section: Chart & Trade Panel */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex-grow flex flex-col h-full overflow-y-auto custom-scrollbar">
                        {/* Chart Area */}
                        <div className="min-h-[400px] border-b border-gray-800">
                            <Chart symbol={selectedCoin.symbol} />
                        </div>

                        {/* Trade Panel */}
                        <div className="border-b border-gray-800 bg-crypto-light">
                            <TradePanel selectedCoin={selectedCoin} />
                        </div>

                        {/* Open Orders (Bottom) */}
                        <div className="min-h-[200px]">
                            <OpenOrders
                                currentPrice={selectedCoin.currentPrice}
                                onOrderFilled={refreshUser}
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Right Sidebar: Assets & Recent Trades */}
                <div className="hidden xl:block w-[320px] border-l border-gray-800 shrink-0 flex flex-col">
                    <div className="flex-1 min-h-0 border-b border-gray-800">
                        <AssetList onSelect={(coin) => navigate(`/trade/${coin.symbol}`)} />
                    </div>
                    <div className="flex-1 min-h-0">
                        <RecentTrades selectedCoin={selectedCoin} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trade;
