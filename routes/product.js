const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { 
  categoryValidation, 
  productValidation, 
  idValidation 
} = require('../middlewares/validation');
const { adminOnly } = require('../middlewares/auth');

// Category management routes (admin only)
router.post('/category', categoryValidation, adminOnly, productController.createCategory);
router.get('/categories', productController.getCategories); // Public
router.put('/category/:id', [...idValidation, ...categoryValidation], adminOnly, productController.updateCategory);
router.delete('/category/:id', idValidation, adminOnly, productController.deleteCategory);

// Product management routes
router.post('/', productValidation, adminOnly, productController.createProduct);
router.get('/list', productController.getProducts); // Public
router.get('/:id', idValidation, productController.getProductById); // Public
router.put('/:id', [...idValidation, ...productValidation], adminOnly, productController.updateProduct);
router.delete('/:id', idValidation, adminOnly, productController.deleteProduct);

module.exports = router; 