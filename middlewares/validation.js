const { body, param, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

/**
 * Login validation
 */
exports.loginValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  exports.handleValidationErrors
];

/**
 * Branch validation
 */
exports.branchValidation = [
  body('name').notEmpty().trim().withMessage('Branch name is required'),
  exports.handleValidationErrors
];

/**
 * User validation
 */
exports.userValidation = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('username').notEmpty().trim().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('branch').isMongoId().withMessage('Valid branch ID is required'),
  exports.handleValidationErrors
];

/**
 * Category validation
 */
exports.categoryValidation = [
  body('type').notEmpty().trim().withMessage('Category type is required'),
  body('name').notEmpty().trim().withMessage('Category name is required'),
  exports.handleValidationErrors
];

/**
 * Product validation
 */
exports.productValidation = [
  body('name').notEmpty().trim().withMessage('Product name is required'),
  body('value').isFloat({ min: 0 }).withMessage('Product value must be a positive number'),
  body('category').isMongoId().withMessage('Valid category ID is required'),
  exports.handleValidationErrors
];

/**
 * Order validation
 */
exports.orderValidation = [
  body('product').isMongoId().withMessage('Valid product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('reason').notEmpty().trim().withMessage('Reason is required'),
  exports.handleValidationErrors
];

/**
 * Order status validation
 */
exports.orderStatusValidation = [
  body('status').isIn(['fresh', 'pending', 'completed', 'rejected']).withMessage('Invalid order status'),
  exports.handleValidationErrors
];

/**
 * MongoDB ID validation
 */
exports.idValidation = [
  param('id').isMongoId().withMessage('Valid ID is required'),
  exports.handleValidationErrors
]; 