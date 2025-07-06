const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Authentication middleware
 * @param {Array} roles - Array of allowed roles
 * @returns {Function} Express middleware function
 */
exports.auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          success: false, 
          message: 'Access denied. No token provided.' 
        });
      }

      const token = authHeader.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid token. User not found.' 
        });
      }

      // Check role permissions
      if (roles.length > 0 && !roles.includes(user.role)) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Insufficient permissions.' 
        });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid token.' 
        });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false, 
          message: 'Token expired.' 
        });
      }
      return res.status(500).json({ 
        success: false, 
        message: 'Server error during authentication.' 
      });
    }
  };
};

/**
 * Admin-only middleware
 */
exports.adminOnly = exports.auth(['admin']);

/**
 * User-only middleware
 */
exports.userOnly = exports.auth(['user']);

/**
 * Any authenticated user middleware
 */
exports.authenticated = exports.auth(['admin', 'user']); 