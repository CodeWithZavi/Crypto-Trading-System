const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Database Connection
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.error('MongoDB Connection Error:', err));
} else {
    console.warn('WARNING: MONGODB_URI not set');
}

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trade', require('./routes/tradeRoutes'));

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        message: 'Crypto Trading System API is running...',
        timestamp: new Date().toISOString()
    });
});

app.get('/api', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API endpoint is working',
        version: '1.0.0'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        path: req.path,
        message: 'The requested endpoint does not exist'
    });
});

// Export for Vercel serverless
module.exports = app;

// Start server only if not in serverless environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
