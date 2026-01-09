const express = require('express');
const router = express.Router();
const { executeTrade, getTradeHistory, getOpenOrders, cancelOrder, fillOrder } = require('../controllers/tradeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/execute', protect, executeTrade);
router.get('/history', protect, getTradeHistory);
router.get('/orders', protect, getOpenOrders);
router.delete('/orders/:id', protect, cancelOrder);
router.put('/orders/:id/fill', protect, fillOrder);

module.exports = router;
