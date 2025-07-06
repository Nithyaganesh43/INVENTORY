const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Authentication middleware
const authenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token. User not found.' 
      });
    }

    req.user = decoded;
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

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin only.' 
    });
  }
  next();
};

// User-only middleware
const userOnly = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. User only.' 
    });
  }
  next();
};

module.exports = {
  authenticated,
  adminOnly,
  userOnly
}; 