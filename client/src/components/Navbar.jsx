import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { LogOut, User, Wallet, BarChart2 } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="bg-crypto-light border-b border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <Link to="/" className="text-2xl font-bold text-crypto-accent flex items-center gap-2">
                <BarChart2 />
                TitanExchange
            </Link>

            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                        <Link to="/markets" className="text-gray-300 hover:text-white transition-colors">Markets</Link>
                        <Link to="/quick-trade" className="text-gray-300 hover:text-white transition-colors">Quick Trade</Link>
                        <Link to="/trade" className="text-gray-300 hover:text-white transition-colors">Trade</Link>
                        <Link to="/wallet" className="text-gray-300 hover:text-white transition-colors">Wallet</Link>

                        <div className="flex items-center gap-4 ml-4 bg-gray-800 px-4 py-2 rounded-full hidden lg:flex">
                            <div className="text-right border-r border-gray-700 pr-4 mr-4 hidden xl:block">
                                <div className="text-[10px] text-gray-500 uppercase tracking-tighter">Last Login</div>
                                <div className="text-xs text-gray-300 font-medium whitespace-nowrap">
                                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'First Login'}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-400">Demo Balance</div>
                                <div className="font-mono font-bold text-crypto-green">
                                    ${user.demoBalance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                            </div>
                            <button
                                onClick={() => { logout(); navigate('/'); }}
                                className="p-2 hover:bg-gray-700 rounded-full transition-colors text-red-400"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                        {/* Mobile Logout (shrunk view) */}
                        <div className="lg:hidden">
                            <button onClick={() => { logout(); navigate('/'); }} className="text-red-400"><LogOut size={20} /></button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-white hover:text-crypto-accent transition-colors">Login</Link>
                        <Link to="/signup" className="bg-crypto-accent text-black px-4 py-2 rounded font-bold hover:bg-yellow-400 transition-colors">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
