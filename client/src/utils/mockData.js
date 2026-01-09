export const MOCK_COINS = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 95432.10, change: 2.5, volume: '45B', marketCap: '1.8T' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3456.78, change: -1.2, volume: '20B', marketCap: '400B' },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB', price: 567.89, change: 0.8, volume: '2B', marketCap: '87B' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', price: 145.20, change: 5.4, volume: '2.1B', marketCap: '65B' },
    { id: 'ripple', symbol: 'XRP', name: 'XRP', price: 0.62, change: -1.2, volume: '800M', marketCap: '34B' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.45, change: 0.8, volume: '300M', marketCap: '16B' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.12, change: 12.5, volume: '1.2B', marketCap: '17B' },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', price: 7.20, change: -2.5, volume: '150M', marketCap: '10B' },
    { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu', price: 0.000024, change: 8.4, volume: '500M', marketCap: '14B' },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', price: 18.50, change: 3.2, volume: '400M', marketCap: '11B' },
    { id: 'avalanche', symbol: 'AVAX', name: 'Avalanche', price: 42.10, change: -0.5, volume: '350M', marketCap: '15B' },
    { id: 'polygon', symbol: 'MATIC', name: 'Polygon', price: 0.85, change: 1.1, volume: '200M', marketCap: '8B' },
    { id: 'uniswap', symbol: 'UNI', name: 'Uniswap', price: 11.20, change: 4.5, volume: '180M', marketCap: '6.5B' },
    { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', price: 85.00, change: 0.2, volume: '300M', marketCap: '6.3B' },
    { id: 'near', symbol: 'NEAR', name: 'NEAR Protocol', price: 6.80, change: 9.2, volume: '450M', marketCap: '7B' },
    { id: 'pepe', symbol: 'PEPE', name: 'Pepe', price: 0.000007, change: 25.4, volume: '1.5B', marketCap: '3B' },
    { id: 'render', symbol: 'RNDR', name: 'Render', price: 10.50, change: 15.2, volume: '600M', marketCap: '4B' },
];

export const MOCK_GLOBAL_STATS = {
    marketCap: "2.54T",
    marketCapChange: "+1.2%",
    volume24h: "98.5B",
    btcDominance: "52.3%",
    ethDominance: "16.8%"
};

export const MOCK_NEWS = [
    { id: 1, title: "Bitcoin Breaks All-Time Highs as Institution Adoption Soars", source: "CryptoNews", time: "2h ago", sentiment: "positive" },
    { id: 2, title: "Ethereum 2.0 Upgrade: What You Need to Know", source: "BlockWorks", time: "4h ago", sentiment: "neutral" },
    { id: 3, title: "New Regulations Shake Up DeFi Market", source: "CoinDesk", time: "6h ago", sentiment: "negative" },
    { id: 4, title: "Top 5 Altcoins to Watch This Bull Run", source: "DailyHodl", time: "10h ago", sentiment: "positive" }
];

export const MOCK_GAINERS = [
    { symbol: 'SOL', name: 'Solana', price: 123.45, change: 5.4 },
    { symbol: 'BTC', name: 'Bitcoin', price: 95432.10, change: 2.5 },
    { symbol: 'DOT', name: 'Polkadot', price: 7.89, change: 2.1 }
];

export const MOCK_LOSERS = [
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.12, change: -3.4 },
    { symbol: 'ETH', name: 'Ethereum', price: 3456.78, change: -1.2 },
    { symbol: 'ADA', name: 'Cardano', price: 0.56, change: -0.5 }
];
