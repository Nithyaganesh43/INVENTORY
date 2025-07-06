const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { 
  branchValidation, 
  userValidation, 
  orderStatusValidation, 
  idValidation,
  passwordChangeValidation
} = require('../middlewares/validation');
const { adminOnly } = require('../middlewares/auth');

// Branch management routes
router.post('/branch', branchValidation, adminOnly, adminController.createBranch);
router.get('/branches', adminOnly, adminController.getBranches);
router.put('/branch/:id', [...idValidation, ...branchValidation], adminOnly, adminController.updateBranch);
router.delete('/branch/:id', idValidation, adminOnly, adminController.deleteBranch);

// User management routes
router.post('/user', userValidation, adminOnly, adminController.createUser);
router.get('/users', adminOnly, adminController.getUsers);
router.put('/user/:id', [...idValidation, ...userValidation], adminOnly, adminController.updateUser);
router.delete('/user/:id', idValidation, adminOnly, adminController.deleteUser);

// Order management routes
router.get('/orders', adminOnly, adminController.getOrders);
router.patch('/order/:id', [...idValidation, ...orderStatusValidation], adminOnly, adminController.updateOrderStatus);
router.get('/orders/stats', adminOnly, adminController.getOrderStats);

// Admin profile routes
router.patch('/change-password', passwordChangeValidation, adminOnly, adminController.changePassword);

module.exports = router; 