const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    demoBalance: {
        type: Number,
        default: 100000, // $100,000 demo funds
    },
    portfolio: [
        {
            coinId: String,
            symbol: String,
            amount: Number,
            averagePrice: Number,
        }
    ],
    watchlist: [String], // Array of coin IDs
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
