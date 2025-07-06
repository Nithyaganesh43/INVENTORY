const bcrypt = require('bcryptjs');
const { User, Branch, Category, Product, Order } = require('../models');

/**
 * Create new branch
 * @route POST /admin/branches
 * @access Admin only
 */
const createBranch = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Branch name is required'
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
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Branch name already exists'
      });
    }
    
    console.error('Create branch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create branch'
    });
  }
};

/**
 * Get all branches
 * @route GET /admin/branches
 * @access Admin only
 */
const getBranches = async (req, res) => {
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
      message: 'Failed to get branches'
    });
  }
};

/**
 * Create user in a branch
 * @route POST /admin/users
 * @access Admin only
 */
const createUser = async (req, res) => {
  try {
    const { name, username, password, branchId } = req.body;

    if (!name || !username || !password || !branchId) {
      return res.status(400).json({
        success: false,
        message: 'Name, username, password, and branch are required'
      });
    }

    // Check if branch exists
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(400).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      password: hashedPassword,
      role: 'user',
      branch: branchId
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        branch: branch.name
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }
    
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
};

/**
 * Get all users
 * @route GET /admin/users
 * @access Admin only
 */
const getUsers = async (req, res) => {
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
      message: 'Failed to get users'
    });
  }
};

/**
 * Create new category
 * @route POST /admin/categories
 * @access Admin only
 */
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    const category = new Category({ name });
    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category
    });

  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create category'
    });
  }
};

/**
 * Get all categories
 * @route GET /admin/categories
 * @access Admin only
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get categories'
    });
  }
};

/**
 * Create new product
 * @route POST /admin/products
 * @access Admin only
 */
const createProduct = async (req, res) => {
  try {
    const { name, value, categoryId } = req.body;

    if (!name || !value || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Name, value, and category are required'
      });
    }

    if (value < 0) {
      return res.status(400).json({
        success: false,
        message: 'Value must be non-negative'
      });
    }

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category not found'
      });
    }

    const product = new Product({
      name,
      value,
      category: categoryId
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product'
    });
  }
};

/**
 * Get all products
 * @route GET /admin/products
 * @access Admin only
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .sort({ name: 1 });

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get products'
    });
  }
};

/**
 * Get all orders with detailed information
 * @route GET /admin/orders
 * @access Admin only
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name username')
      .populate('product', 'name value')
      .populate('user.branch', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get orders'
    });
  }
};

/**
 * Update order status
 * @route PATCH /admin/orders/:orderId/status
 * @access Admin only
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status || !['fresh', 'pending', 'finished'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required (fresh, pending, finished)'
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });

  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
};

module.exports = {
  createBranch,
  getBranches,
  createUser,
  getUsers,
  createCategory,
  getCategories,
  createProduct,
  getProducts,
  getAllOrders,
  updateOrderStatus
}; 