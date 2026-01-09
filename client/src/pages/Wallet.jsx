import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { toast } from 'react-toastify';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, History } from 'lucide-react';

const Wallet = () => {
    const { user, refreshUser } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            api.get('/trade/history')
                .then(res => setHistory(res.data))
                .catch(err => console.error("Failed to fetch history", err));
        }
    }, [user, user?.demoBalance]); // Refresh history when balance changes usually implies trade

    if (!user) return null;

    const totalPortfolioValue = user.portfolio.reduce((acc, asset) => acc + (asset.amount * asset.averagePrice), 0);
    const totalNetWorth = (user.demoBalance || 0) + totalPortfolioValue;

    const handleTransaction = async (type) => { // type: 'deposit' or 'withdraw'
        if (!amount || parseFloat(amount) <= 0) return;

        setIsLoading(true);
        try {
            const res = await api.post(`/auth/${type}`, { amount: parseFloat(amount) });
            toast.success(res.data.message);
            refreshUser();
            setAmount('');
            setIsDepositModalOpen(false);
            setIsWithdrawModalOpen(false);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Transaction failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <WalletIcon className="text-crypto-accent" /> My Wallet
                </h1>
                <div className="flex gap-4">
                    <Button variant="success" onClick={() => setIsDepositModalOpen(true)}>
                        <ArrowDownLeft size={18} className="mr-2" /> Deposit
                    </Button>
                    <Button variant="danger" onClick={() => setIsWithdrawModalOpen(true)}>
                        <ArrowUpRight size={18} className="mr-2" /> Withdraw
                    </Button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-none">
                    <h3 className="text-gray-400 mb-2 text-sm uppercase tracking-wider">Available Balance (USDT)</h3>
                    <p className="text-3xl font-mono font-bold text-white">${user.demoBalance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </Card>
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-none">
                    <h3 className="text-gray-400 mb-2 text-sm uppercase tracking-wider">Est. Portfolio Value</h3>
                    <p className="text-3xl font-mono font-bold text-gray-300">≈ ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </Card>
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-none">
                    <h3 className="text-gray-400 mb-2 text-sm uppercase tracking-wider">Total Net Worth</h3>
                    <p className="text-3xl font-mono font-bold text-crypto-accent">≈ ${totalNetWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Assets Table */}
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Your Assets</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase">
                                <tr>
                                    <th className="p-3 rounded-l">Asset</th>
                                    <th className="p-3 text-right">Balance</th>
                                    <th className="p-3 text-right rounded-r">Avg. Buy Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {user.portfolio.map((asset, idx) => (
                                    <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="p-4 font-bold flex items-center gap-2">
                                            <img
                                                src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                                                className="w-6 h-6"
                                                alt={asset.symbol}
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/24' }}
                                            />
                                            {asset.symbol}
                                        </td>
                                        <td className="p-4 text-right font-mono">{asset.amount.toFixed(6)}</td>
                                        <td className="p-4 text-right font-mono text-gray-400">${asset.averagePrice.toFixed(2)}</td>
                                    </tr>
                                ))}
                                {user.portfolio.length === 0 && (
                                    <tr><td colSpan="3" className="p-8 text-center text-gray-500">No assets currently held.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Transaction History */}
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <History size={20} /> Trade History
                        </h2>
                    </div>
                    <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase">
                                <tr>
                                    <th className="p-3 rounded-l">Type</th>
                                    <th className="p-3">Pair</th>
                                    <th className="p-3 text-right">Amount</th>
                                    <th className="p-3 text-right">Price</th>
                                    <th className="p-3 text-right rounded-r">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {history.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className={`p-4 font-bold text-xs uppercase ${tx.type === 'BUY' ? 'text-crypto-green' :
                                                tx.type === 'SELL' ? 'text-crypto-red' :
                                                    tx.type === 'DEPOSIT' ? 'text-blue-400' : 'text-orange-400'
                                            }`}>
                                            {tx.type}
                                        </td>
                                        <td className="p-4 font-bold text-sm">
                                            {tx.symbol ? `${tx.symbol}/USDT` : 'USDT'}
                                        </td>
                                        <td className="p-4 text-right font-mono text-sm">{tx.amount.toFixed(tx.amount < 1 ? 6 : 2)}</td>
                                        <td className="p-4 text-right font-mono text-sm">
                                            {tx.price ? `$${tx.price.toLocaleString()}` : '-'}
                                        </td>
                                        <td className="p-4 text-right text-gray-500 text-xs">
                                            {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                    </tr>
                                ))}
                                {history.length === 0 && (
                                    <tr><td colSpan="5" className="p-8 text-center text-gray-500">No trading history available.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Deposit Modal */}
            <Modal isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)} title="Deposit Funds (Simulated)">
                <div className="space-y-4">
                    <p className="text-sm text-gray-400">
                        This is a simulation. Enter the amount of Mock USDT you want to add to your demo account.
                    </p>
                    <Input
                        label="Amount (USDT)"
                        type="number"
                        placeholder="e.g. 10000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button variant="success" size="full" onClick={() => handleTransaction('deposit')} isLoading={isLoading}>
                        Confirm Deposit
                    </Button>
                </div>
            </Modal>

            {/* Withdraw Modal */}
            <Modal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} title="Withdraw Funds">
                <div className="space-y-4">
                    <p className="text-sm text-gray-400">
                        Withdraw from your demo balance.
                    </p>
                    <Input
                        label="Amount (USDT)"
                        type="number"
                        placeholder="e.g. 1000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button variant="danger" size="full" onClick={() => handleTransaction('withdraw')} isLoading={isLoading}>
                        Confirm Withdraw
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default Wallet;
