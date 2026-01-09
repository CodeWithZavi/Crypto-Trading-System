const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    type: {
        type: String,
        required: true,
        enum: ['BUY', 'SELL', 'DEPOSIT', 'WITHDRAW'],
    },
    coinId: {
        type: String, // e.g., 'bitcoin'
        required: false,
    },
    symbol: {
        type: String, // e.g., 'BTC'
        required: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: false,
    },
    total: {
        type: Number,
        required: true,
    },
    isLimitFill: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
