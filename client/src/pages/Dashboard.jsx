import React from 'react';
import Ticker from '../components/Dashboard/Ticker';
import MarketOverview from '../components/Dashboard/MarketOverview';
import CryptoGrid from '../components/Dashboard/CryptoGrid';
import NewsFeed from '../components/Dashboard/NewsFeed';

/* 
  This is the new "Home" Dashboard 
*/
const Dashboard = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-crypto-dark flex flex-col">
            <Ticker />

            <div className="flex-grow p-4 md:p-6 max-w-[1600px] mx-auto w-full space-y-6">

                {/* Section 1: Market Overview Stats */}
                <section>
                    <h2 className="text-xl font-bold text-white mb-4">Market Overview</h2>
                    <MarketOverview />
                </section>

                {/* Section 2: Main Grid & News */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left: Crypto Table (3 columns wide) */}
                    <div className="lg:col-span-3">
                        <h2 className="text-xl font-bold text-white mb-4">Market Trends</h2>
                        <CryptoGrid />
                    </div>

                    {/* Right: News Feed (1 column wide) */}
                    <div className="lg:col-span-1 h-full">
                        <h2 className="text-xl font-bold text-white mb-4">Latest Insights</h2>
                        <NewsFeed />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
