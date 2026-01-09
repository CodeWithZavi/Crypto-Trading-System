const User = require('../models/User');
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            demoBalance: user.demoBalance,
            portfolio: user.portfolio,
            token: generateToken(user.id),
            lastLogin: user.lastLogin
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        user.lastLogin = new Date();
        await user.save();

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            demoBalance: user.demoBalance,
            portfolio: user.portfolio,
            token: generateToken(user.id),
            lastLogin: user.lastLogin
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

// @desc    Simulate Deposit
// @route   POST /api/auth/deposit
// @access  Private
const deposit = async (req, res) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    const user = await User.findById(req.user.id);
    user.demoBalance += parseFloat(amount);
    await user.save();

    // Record Transaction
    await Transaction.create({
        user: req.user.id,
        type: 'DEPOSIT',
        amount: parseFloat(amount),
        total: parseFloat(amount),
    });

    res.status(200).json({ message: 'Deposit successful', demoBalance: user.demoBalance });
};

// @desc    Simulate Withdraw
// @route   POST /api/auth/withdraw
// @access  Private
const withdraw = async (req, res) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    const user = await User.findById(req.user.id);
    if (user.demoBalance < amount) return res.status(400).json({ message: 'Insufficient funds' });

    user.demoBalance -= parseFloat(amount);
    await user.save();

    // Record Transaction
    await Transaction.create({
        user: req.user.id,
        type: 'WITHDRAW',
        amount: parseFloat(amount),
        total: parseFloat(amount),
    });

    res.status(200).json({ message: 'Withdrawal successful', demoBalance: user.demoBalance });
};

// @desc    Toggle Coin in Watchlist
// @route   POST /api/auth/watchlist
// @access  Private
const toggleWatchlist = async (req, res) => {
    const { coinId } = req.body;
    if (!coinId) return res.status(400).json({ message: 'Coin ID required' });

    const user = await User.findById(req.user.id);

    if (user.watchlist.includes(coinId)) {
        user.watchlist = user.watchlist.filter(id => id !== coinId);
        await user.save();
        res.status(200).json({ message: 'Removed from watchlist', watchlist: user.watchlist });
    } else {
        user.watchlist.push(coinId);
        await user.save();
        res.status(200).json({ message: 'Added to watchlist', watchlist: user.watchlist });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    deposit,
    withdraw,
    toggleWatchlist
};
