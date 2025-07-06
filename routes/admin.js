const express = require('express');
const { 
  createBranch, 
  createUser, 
  createCategory, 
  createProduct, 
  getAllOrders, 
  updateOrderStatus,
  getBranches,
  getCategories,
  getProducts
} = require('../controllers/adminController');
const { authenticated, adminOnly } = require('../middlewares/auth');

const router = express.Router();

// Apply admin authentication to all routes
router.use(authenticated, adminOnly);

// Branch management
router.post('/branches', createBranch);
router.get('/branches', getBranches);

// User management
router.post('/users', createUser);

// Category management
router.post('/categories', createCategory);
router.get('/categories', getCategories);

// Product management
router.post('/products', createProduct);
router.get('/products', getProducts);

// Order management
router.get('/orders', getAllOrders);
router.patch('/orders/:orderId/status', updateOrderStatus);

module.exports = router; 