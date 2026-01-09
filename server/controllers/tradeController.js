const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Order = require('../models/Order');

// @desc    Execute a trade (Market) or Place Order (Limit)
// @route   POST /api/trade/execute
// @access  Private
const executeTrade = async (req, res) => {
    const { type, coinId, symbol, amount, price, orderType = 'MARKET' } = req.body;
    const userId = req.user.id;

    if (!amount || !price || amount <= 0 || price <= 0) {
        return res.status(400).json({ message: 'Invalid trade parameters' });
    }

    const totalCost = amount * price;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // 1. Balance Check & Locking
    if (type === 'BUY') {
        if (user.demoBalance < totalCost) {
            return res.status(400).json({ message: 'Insufficient USDT balance' });
        }
    } else if (type === 'SELL') {
        const asset = user.portfolio.find(p => p.coinId === coinId);
        if (!asset || asset.amount < amount) {
            return res.status(400).json({ message: `Insufficient ${symbol} balance` });
        }
    }

    // 2. Handle LIMIT Order -> Save and Return (Simulator logic: don't lock funds yet for simplicity, or lock them?)
    // Real exchanges lock funds. For this simulator, let's keep it simple: we just create the order.
    // Ideally we should lock funds. Let's do a simple lock by deducting immediately for standard behavior.

    if (orderType === 'LIMIT') {
        // Lock funds/assets
        if (type === 'BUY') {
            user.demoBalance -= totalCost;
        } else {
            const assetIndex = user.portfolio.findIndex(p => p.coinId === coinId);
            user.portfolio[assetIndex].amount -= amount;
            if (user.portfolio[assetIndex].amount <= 0) user.portfolio.splice(assetIndex, 1);
        }
        await user.save();

        const order = await Order.create({
            user: userId,
            coinId,
            symbol,
            type,
            orderType,
            price,
            amount,
            status: 'OPEN'
        });

        return res.status(200).json({
            message: 'Limit order placed successfully',
            order
        });
    }

    // 3. Handle MARKET Order -> Execute Immediately
    if (type === 'BUY') {
        user.demoBalance -= totalCost;

        const existingAssetIndex = user.portfolio.findIndex(p => p.coinId === coinId);
        if (existingAssetIndex !== -1) {
            const asset = user.portfolio[existingAssetIndex];
            // Weighted average price
            const currentTotalValue = asset.amount * asset.averagePrice;
            const newTotalValue = currentTotalValue + totalCost;
            const newAmount = asset.amount + amount;

            asset.amount = newAmount;
            asset.averagePrice = newTotalValue / newAmount;
        } else {
            user.portfolio.push({
                coinId,
                symbol,
                amount,
                averagePrice: price,
            });
        }
    } else if (type === 'SELL') {
        const existingAssetIndex = user.portfolio.findIndex(p => p.coinId === coinId);
        // We already checked balance above
        user.demoBalance += totalCost;
        user.portfolio[existingAssetIndex].amount -= amount;

        if (user.portfolio[existingAssetIndex].amount <= 0.00000001) {
            user.portfolio.splice(existingAssetIndex, 1);
        }
    }

    await user.save();

    const transaction = await Transaction.create({
        user: userId,
        type,
        coinId,
        symbol,
        amount,
        price,
        total: totalCost,
    });

    res.status(200).json({
        message: `Market ${type} executed`,
        user: {
            demoBalance: user.demoBalance,
            portfolio: user.portfolio,
        },
        transaction,
    });
};

// @desc    Get trade history
// @route   GET /api/trade/history
// @access  Private
const getTradeHistory = async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
};

// @desc    Get open orders
// @route   GET /api/trade/orders
// @access  Private
const getOpenOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.id, status: 'OPEN' }).sort({ createdAt: -1 });
    res.status(200).json(orders);
};

// @desc    Cancel order
// @route   DELETE /api/trade/orders/:id
// @access  Private
const cancelOrder = async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status !== 'OPEN') return res.status(400).json({ message: 'Order cannot be cancelled' });

    order.status = 'CANCELLED';
    await order.save();

    // Refund Logic
    const user = await User.findById(req.user.id);
    const totalValue = order.amount * order.price;

    if (order.type === 'BUY') {
        user.demoBalance += totalValue;
    } else {
        // Refund asset
        const existingAssetIndex = user.portfolio.findIndex(p => p.coinId === order.coinId);
        if (existingAssetIndex !== -1) {
            // Recalculate avg price? No, just add back amount. 
            // Technically avg price depends on acquisition cost. 
            // If selling, we just put amount back. Avg price stays same.
            user.portfolio[existingAssetIndex].amount += order.amount;
        } else {
            // Re-add asset if it was fully removed. 
            // We need original avg price? Complexity here.
            // Simplified: Use current order price as avg price proxy or 0.
            user.portfolio.push({
                coinId: order.coinId,
                symbol: order.symbol,
                amount: order.amount,
                averagePrice: order.price // Approximate
            });
        }
    }
    await user.save();

    res.status(200).json({ message: 'Order cancelled and funds refunded' });
};

// @desc    Fill open order (Simulated execution)
// @route   PUT /api/trade/orders/:id/fill
// @access  Private
const fillOrder = async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status !== 'OPEN') return res.status(400).json({ message: 'Order already processed' });

    const user = await User.findById(req.user.id);
    const totalValue = order.amount * order.price;

    // Execution logic (Funds were already locked during creation)
    if (order.type === 'BUY') {
        // User bought coin. Add coin to portfolio.
        const existingAssetIndex = user.portfolio.findIndex(p => p.coinId === order.coinId);
        if (existingAssetIndex !== -1) {
            const asset = user.portfolio[existingAssetIndex];
            // Recalculate average price
            const currentTotalValue = asset.amount * asset.averagePrice;
            const newTotalValue = currentTotalValue + totalValue;
            const newAmount = asset.amount + order.amount;

            asset.amount = newAmount;
            asset.averagePrice = newTotalValue / newAmount;
        } else {
            user.portfolio.push({
                coinId: order.coinId,
                symbol: order.symbol,
                amount: order.amount,
                averagePrice: order.price,
            });
        }
    } else {
        // User sold coin. Add USDT to balance.
        user.demoBalance += totalValue;
    }

    order.status = 'FILLED';
    await order.save();
    await user.save();

    // Create Transaction Record
    await Transaction.create({
        user: req.user.id,
        type: order.type,
        coinId: order.coinId,
        symbol: order.symbol,
        amount: order.amount,
        price: order.price,
        total: totalValue,
        isLimitFill: true
    });

    res.status(200).json({ message: 'Order filled', order });
};

module.exports = {
    executeTrade,
    getTradeHistory,
    getOpenOrders,
    cancelOrder,
    fillOrder
};
