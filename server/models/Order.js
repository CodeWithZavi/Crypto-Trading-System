const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    coinId: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['BUY', 'SELL'],
        required: true,
    },
    orderType: {
        type: String,
        enum: ['MARKET', 'LIMIT'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    filled: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['OPEN', 'FILLED', 'CANCELLED'],
        default: 'OPEN',
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
