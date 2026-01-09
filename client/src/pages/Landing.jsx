import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Zap, ArrowRight, Play, X } from 'lucide-react';
import heroImage from '../assets/hero.png';

const Landing = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    return (
        <div className="flex flex-col min-h-[calc(100vh-64px)] bg-crypto-dark overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(243,186,47,0.05),transparent_50%)] pointer-events-none" />

            {/* Hero Section */}
            <section className="relative px-6 pt-16 pb-20 md:pt-28 md:pb-32 flex flex-col items-center z-20">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative text-center lg:text-left">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crypto-light/50 backdrop-blur-md border border-white/10 text-crypto-accent text-xs font-bold uppercase tracking-widest">
                            <span className="flex h-2 w-2 rounded-full bg-crypto-accent animate-pulse" />
                            From Chart Analysis to Supercar
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black leading-[1] text-white tracking-tight">
                            Build Your <br />
                            <span className="text-crypto-accent italic">Titan</span> Wealth
                        </h1>

                        <p className="text-lg md:text-2xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            Trade the markets, make your fortune, and drive the future.
                            <span className="text-white font-bold block mt-2">TitanExchange</span> provides the platform; you provide the ambition.
                            Start with <span className="text-crypto-green font-mono font-bold">$100,000</span> risk-free.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-6">
                            <Link to="/signup" className="group px-10 py-5 bg-crypto-accent text-black font-black text-xl rounded-2xl hover:bg-yellow-400 transition-all flex items-center gap-3 shadow-[0_20px_40px_rgba(243,186,47,0.3)] hover:shadow-[0_25px_50px_rgba(243,186,47,0.5)] active:scale-95">
                                Trade Now
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button
                                onClick={() => setIsVideoOpen(true)}
                                className="px-10 py-5 bg-white/5 backdrop-blur-xl text-white font-bold text-xl rounded-2xl hover:bg-white/10 transition-all border border-white/10 active:scale-95 flex items-center gap-2"
                            >
                                <Play size={20} className="fill-white" /> Watch Success Story
                            </button>
                        </div>

                        <div className="flex items-center gap-8 pt-10 justify-center lg:justify-start opacity-70">
                            <div>
                                <p className="text-3xl font-black text-white">99%</p>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Accuracy</p>
                            </div>
                            <div className="h-10 w-[1px] bg-gray-800" />
                            <div>
                                <p className="text-3xl font-black text-white">$100k</p>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Demo Fund</p>
                            </div>
                            <div className="h-10 w-[1px] bg-gray-800" />
                            <div>
                                <p className="text-3xl font-black text-white">24/7</p>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Live Sync</p>
                            </div>
                        </div>
                    </div>

                    {/* Primary Hero Visual */}
                    <div className="relative group perspective-1000 animate-in fade-in slide-in-from-right duration-1000 delay-200">
                        <div className="absolute -inset-10 bg-crypto-accent/20 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl transform hover:rotate-y-2 hover:rotate-x-2 transition-transform duration-700 bg-crypto-light/20 backdrop-blur-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                            <img
                                src={heroImage}
                                alt="TitanExchange Visual"
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-crypto-dark/60 via-transparent to-transparent" />

                            {/* Decorative elements */}
                            <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                                <TrendingUp className="text-crypto-green" size={18} />
                                <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">Live Market Data Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Modal Overlay */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    <div
                        className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500"
                        onClick={() => setIsVideoOpen(false)}
                    />

                    <div className="relative w-full max-w-6xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(243,186,47,0.15)] border border-white/10 animate-in zoom-in-95 duration-500">
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-6 right-6 z-50 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all border border-white/10 hover:scale-110 active:scale-90"
                        >
                            <X size={28} />
                        </button>

                        <video
                            src="/success-story.mp4"
                            className="w-full h-full object-contain"
                            controls
                            autoPlay
                        />
                    </div>
                </div>
            )}

            {/* Sub-Section */}
            <section className="px-6 py-20 bg-gray-900/40 relative z-20 backdrop-blur-sm border-t border-white/5">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Zap size={32} className="text-crypto-accent" />}
                        title="Instant Sync"
                        desc="Experience professional execution speeds with zero slippage trading."
                    />
                    <FeatureCard
                        icon={<Shield size={32} className="text-blue-400" />}
                        title="Secure Practice"
                        desc="Test high-stakes strategies without risking a single dollar of your hard-earned money."
                    />
                    <FeatureCard
                        icon={<TrendingUp size={32} className="text-crypto-green" />}
                        title="Real Trading"
                        desc="Real-time order books, live charts, and professional limit order execution."
                    />
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="group bg-white/5 p-10 rounded-[2rem] border border-white/5 hover:border-crypto-accent/20 hover:bg-white/10 transition-all duration-300">
        <div className="mb-6 bg-gray-900 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default Landing;
