const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/deposit', protect, require('../controllers/authController').deposit);
router.post('/withdraw', protect, require('../controllers/authController').withdraw);
router.post('/watchlist', protect, require('../controllers/authController').toggleWatchlist);

module.exports = router;
