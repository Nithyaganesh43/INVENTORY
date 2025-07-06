const bcrypt = require('bcryptjs');
const { User, Branch, Order, ORDER_STATUSES } = require('../models');

/**
 * Create new branch
 * @route POST /admin/branch
 * @access Admin only
 */
exports.createBranch = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if branch already exists
    const existingBranch = await Branch.findOne({ name });
    if (existingBranch) {
      return res.status(400).json({
        success: false,
        message: 'Branch with this name already exists'
      });
    }

    const branch = new Branch({ name });
    await branch.save();

    res.status(201).json({
      success: true,
      message: 'Branch created successfully',
      branch
    });
  } catch (error) {
    console.error('Create branch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating branch'
    });
  }
};

/**
 * Get all branches
 * @route GET /admin/branches
 * @access Admin only
 */
exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.find().sort({ name: 1 });
    
    res.json({
      success: true,
      branches
    });
  } catch (error) {
    console.error('Get branches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching branches'
    });
  }
};

/**
 * Update branch
 * @route PUT /admin/branch/:id
 * @access Admin only
 */
exports.updateBranch = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // Check if branch exists
    const branch = await Branch.findById(id);
    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Check if new name already exists
    if (name !== branch.name) {
      const existingBranch = await Branch.findOne({ name });
      if (existingBranch) {
        return res.status(400).json({
          success: false,
          message: 'Branch with this name already exists'
        });
      }
    }

    branch.name = name;
    await branch.save();

    res.json({
      success: true,
      message: 'Branch updated successfully',
      branch
    });
  } catch (error) {
    console.error('Update branch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating branch'
    });
  }
};

/**
 * Delete branch
 * @route DELETE /admin/branch/:id
 * @access Admin only
 */
exports.deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if branch exists
    const branch = await Branch.findById(id);
    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Check if branch has users
    const usersInBranch = await User.find({ branch: id });
    if (usersInBranch.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete branch with existing users'
      });
    }

    await Branch.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Branch deleted successfully'
    });
  } catch (error) {
    console.error('Delete branch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting branch'
    });
  }
};

/**
 * Create user in a branch
 * @route POST /admin/user
 * @access Admin only
 */
exports.createUser = async (req, res) => {
  try {
    const { name, username, password, branch } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }

    // Check if branch exists
    const branchDoc = await Branch.findById(branch);
    if (!branchDoc) {
      return res.status(400).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      username,
      password: hashedPassword,
      role: 'user',
      branch
    });

    await user.save();

    // Return user without password
    const userResponse = {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      branch: user.branch
    };

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating user'
    });
  }
};

/**
 * Get all users
 * @route GET /admin/users
 * @access Admin only
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('branch', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
};

/**
 * Update user
 * @route PUT /admin/user/:id
 * @access Admin only
 */
exports.updateUser = async (req, res) => {
  try {
    const { name, username, password, branch } = req.body;
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if new username already exists
    if (username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username already exists'
        });
      }
    }

    // Check if branch exists
    if (branch) {
      const branchDoc = await Branch.findById(branch);
      if (!branchDoc) {
        return res.status(400).json({
          success: false,
          message: 'Branch not found'
        });
      }
    }

    // Update user fields
    user.name = name || user.name;
    user.username = username || user.username;
    user.branch = branch || user.branch;

    // Hash password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    // Return user without password
    const userResponse = {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      branch: user.branch
    };

    res.json({
      success: true,
      message: 'User updated successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user'
    });
  }
};

/**
 * Delete user
 * @route DELETE /admin/user/:id
 * @access Admin only
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has orders
    const userOrders = await Order.find({ user: id });
    if (userOrders.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete user with existing orders'
      });
    }

    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user'
    });
  }
};

/**
 * Get all orders with detailed information
 * @route GET /admin/orders
 * @access Admin only
 */
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name username')
      .populate('product', 'name value')
      .populate({
        path: 'user',
        populate: {
          path: 'branch',
          select: 'name'
        }
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

/**
 * Update order status
 * @route PATCH /admin/order/:id
 * @access Admin only
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Check if order exists
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update status
    order.status = status;
    await order.save();

    // Populate order details
    await order.populate('user', 'name username');
    await order.populate('product', 'name value');
    await order.populate({
      path: 'user',
      populate: {
        path: 'branch',
        select: 'name'
      }
    });

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    });
  }
};

/**
 * Get order statistics
 * @route GET /admin/orders/stats
 * @access Admin only
 */
exports.getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalOrders = await Order.countDocuments();
    const statusCounts = {};
    
    stats.forEach(stat => {
      statusCounts[stat._id] = stat.count;
    });

    // Ensure all statuses are present
    ORDER_STATUSES.forEach(status => {
      if (!statusCounts[status]) {
        statusCounts[status] = 0;
      }
    });

    res.json({
      success: true,
      stats: {
        total: totalOrders,
        byStatus: statusCounts
      }
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order statistics'
    });
  }
};

/**
 * Change admin password
 * @route PATCH /admin/change-password
 * @access Admin only
 */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.user.id;

    // Get admin user
    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    admin.password = hashedNewPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while changing password'
    });
  }
}; 