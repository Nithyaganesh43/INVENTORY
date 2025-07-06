const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { 
  orderValidation, 
  idValidation 
} = require('../middlewares/validation');
const { userOnly } = require('../middlewares/auth');

// Order management routes (user's own orders only)
router.post('/order', orderValidation, userOnly, userController.placeOrder);
router.get('/orders', userOnly, userController.getOwnOrders);
router.get('/order/:id', idValidation, userOnly, userController.getOrderById);
router.put('/order/:id', [...idValidation, ...orderValidation], userOnly, userController.updateOrder);
router.delete('/order/:id', idValidation, userOnly, userController.cancelOrder);
router.get('/orders/stats', userOnly, userController.getOrderStats);

module.exports = router; 