const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Branch } = require('../models');

/**
 * Login user/admin
 * @route POST /auth/login
 * @access Public
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username }).populate('branch', 'name');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role,
        branch: user.branch?._id
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data (excluding password)
    const userResponse = {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      branch: user.branch
    };

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

/**
 * Get current user profile
 * @route GET /auth/profile
 * @access Private
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('branch', 'name');

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
}; 