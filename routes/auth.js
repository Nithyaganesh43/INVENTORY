const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginValidation } = require('../middlewares/validation');
const { authenticated } = require('../middlewares/auth');

// Public routes
router.post('/login', loginValidation, authController.login);

// Protected routes
router.get('/profile', authenticated, authController.getProfile);

module.exports = router; 