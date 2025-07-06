const express = require('express');
const { getAllProducts, getProductById, getAllCategories } = require('../controllers/productController');

const router = express.Router();

// Public product routes
router.get('/', getAllProducts);
router.get('/categories', getAllCategories);
router.get('/:id', getProductById);

module.exports = router; 