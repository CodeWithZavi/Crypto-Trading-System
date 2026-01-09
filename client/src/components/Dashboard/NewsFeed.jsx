import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import Card from '../Card';

/*
  Using static "Real" news links to CoinTelegraph for simulation purposes.
  In a real production app, this would fetch from an RSS-to-JSON service or NewsAPI.
*/
const REAL_NEWS = [
    {
        id: 1,
        title: "Bitcoin hits new ATH as institutional demand spikes",
        source: "CoinTelegraph",
        time: "1h ago",
        sentiment: "positive",
        url: "https://cointelegraph.com/tags/bitcoin"
    },
    {
        id: 2,
        title: "SEC approves new Ethereum ETF applications",
        source: "CoinTelegraph",
        time: "3h ago",
        sentiment: "positive",
        url: "https://cointelegraph.com/tags/ethereum"
    },
    {
        id: 3,
        title: "Crypto regulation talks heat up in EU parliament",
        source: "CoinTelegraph",
        time: "5h ago",
        sentiment: "neutral",
        url: "https://cointelegraph.com/tags/regulation"
    },
    {
        id: 4,
        title: "Market analysis: Altcoin season might be delayed",
        source: "CoinTelegraph",
        time: "8h ago",
        sentiment: "negative",
        url: "https://cointelegraph.com/category/market-analysis"
    },
    {
        id: 5,
        title: "Binance announces new Launchpool project",
        source: "Binance Blog",
        time: "10h ago",
        sentiment: "positive",
        url: "https://www.binance.com/en/blog"
    }
];

const NewsFeed = () => {
    return (
        <Card className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-2">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                    <Newspaper size={20} className="text-crypto-accent" /> Latest News
                </h3>
                <a
                    href="https://cointelegraph.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-crypto-accent cursor-pointer hover:underline flex items-center gap-1"
                >
                    View All <ExternalLink size={10} />
                </a>
            </div>

            <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {REAL_NEWS.map((news) => (
                    <a
                        key={news.id}
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-2 rounded hover:bg-gray-800/40 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs text-crypto-accent font-medium bg-crypto-accent/10 px-2 py-0.5 rounded">
                                {news.source}
                            </span>
                            <span className="text-xs text-gray-500">{news.time}</span>
                        </div>
                        <h4 className="text-sm text-gray-200 group-hover:text-crypto-accent transition-colors leading-snug mb-2 font-medium">
                            {news.title}
                        </h4>
                        <div className="flex items-center gap-2">
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${news.sentiment === 'positive' ? 'text-green-400 bg-green-400/10' :
                                    news.sentiment === 'negative' ? 'text-red-400 bg-red-400/10' :
                                        'text-gray-400 bg-gray-400/10'
                                }`}>
                                {news.sentiment}
                            </span>
                            <span className="text-[10px] text-gray-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                                Read More <ExternalLink size={8} />
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </Card>
    );
};

export default NewsFeed;
