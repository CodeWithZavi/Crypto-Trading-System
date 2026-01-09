import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp, Activity, BarChart3, Globe } from 'lucide-react';
import { MOCK_GAINERS, MOCK_LOSERS, MOCK_GLOBAL_STATS } from '../../utils/mockData';
import Card from '../Card';
import AnimatedCounter from '../AnimatedCounter';
import { motion } from 'framer-motion';

const MarketStatCard = ({ title, value, change, icon: Icon }) => (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card className="flex items-center justify-between p-4 bg-crypto-light/80 hover:bg-crypto-light transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-crypto-accent">
            <div>
                <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-semibold">{title}</p>
                <div className="text-xl font-bold text-white flex items-center">
                    {/* Heuristic to determine if value is currency or count */}
                    {value.includes('$')
                        ? <AnimatedCounter value={value} prefix="$" />
                        : <AnimatedCounter value={value} />
                    }
                </div>
                {change && (
                    <div className={`text-xs mt-1 flex items-center font-bold ${change.includes('+') ? 'text-crypto-green' : 'text-crypto-red'}`}>
                        {change.includes('+') ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
                        {change}
                    </div>
                )}
            </div>
            <div className="p-3 bg-gray-800/50 rounded-full text-crypto-accent shadow-inner">
                <Icon size={24} />
            </div>
        </Card>
    </motion.div>
);

const CoinMiniCard = ({ coin, type }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0 hover:bg-gray-800/30 px-2 rounded transition-colors cursor-pointer group"
    >
        <div className="flex items-center gap-3">
            <span className={`font-mono text-xs font-bold w-5 h-5 flex items-center justify-center rounded ${type === 'gainer' ? 'bg-crypto-green/20 text-crypto-green' : 'bg-crypto-red/20 text-crypto-red'}`}>
                1
            </span>
            <div className="flex flex-col">
                <span className="font-bold text-sm group-hover:text-crypto-accent transition-colors">{coin.symbol}</span>
                <span className="text-xs text-gray-500">{coin.name}</span>
            </div>
        </div>
        <div className="text-right">
            <div className="text-sm font-medium">
                <AnimatedCounter value={coin.price} prefix="$" decimals={2} />
            </div>
            <div className={`text-xs font-bold ${coin.change >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                {coin.change > 0 ? '+' : ''}{coin.change}%
            </div>
        </div>
    </motion.div>
);

const MarketOverview = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MarketStatCard
                title="Global Market Cap"
                value={MOCK_GLOBAL_STATS.marketCap}
                change={MOCK_GLOBAL_STATS.marketCapChange}
                icon={Globe}
            />
            <MarketStatCard
                title="24h Volume"
                value={MOCK_GLOBAL_STATS.volume24h}
                icon={BarChart3}
            />

            <Card className="md:col-span-1 p-0 overflow-hidden flex flex-col h-full border-t-4 border-t-crypto-green">
                <div className="p-4 border-b border-gray-800 bg-gray-800/20 flex justify-between items-center">
                    <h3 className="font-bold text-crypto-green flex items-center gap-2">
                        <TrendingUp size={16} /> Top Gainers
                    </h3>
                    <span className="text-[10px] text-gray-500 cursor-pointer hover:text-white">More &gt;</span>
                </div>
                <div className="p-2">
                    {MOCK_GAINERS.map((coin, idx) => (
                        <CoinMiniCard key={idx} coin={coin} type="gainer" />
                    ))}
                </div>
            </Card>

            <Card className="md:col-span-1 p-0 overflow-hidden flex flex-col h-full border-t-4 border-t-crypto-red">
                <div className="p-4 border-b border-gray-800 bg-gray-800/20 flex justify-between items-center">
                    <h3 className="font-bold text-crypto-red flex items-center gap-2">
                        <Activity size={16} /> Top Losers
                    </h3>
                    <span className="text-[10px] text-gray-500 cursor-pointer hover:text-white">More &gt;</span>
                </div>
                <div className="p-2">
                    {MOCK_LOSERS.map((coin, idx) => (
                        <CoinMiniCard key={idx} coin={coin} type="loser" />
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default MarketOverview;
