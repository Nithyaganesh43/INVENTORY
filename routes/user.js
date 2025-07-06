const express = require('express');
const { getProducts, placeOrder, getMyOrders } = require('../controllers/userController');
const { authenticated, userOnly } = require('../middlewares/auth');

const router = express.Router();

// Apply user authentication to all routes
router.use(authenticated, userOnly);

// Product routes
router.get('/products', getProducts);

// Order routes
router.post('/orders', placeOrder);
router.get('/orders', getMyOrders);

module.exports = router; 