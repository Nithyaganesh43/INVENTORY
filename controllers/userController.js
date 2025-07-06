const { Product, Order } = require('../models');

/**
 * Get all products for user to order
 * @route GET /user/products
 * @access User only
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
 * Place new order
 * @route POST /user/order
 * @access User only
 */
const placeOrder = async (req, res) => {
  try {
    const { productId, quantity, reason } = req.body;
    const userId = req.user.userId;

    if (!productId || !quantity || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Product, quantity, and reason are required'
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product not found'
      });
    }

    const order = new Order({
      product: productId,
      quantity,
      user: userId,
      reason,
      status: 'fresh'
    });

    await order.save();

    // Populate order details
    await order.populate('product', 'name value');
    await order.populate('product.category', 'name');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });

  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order'
    });
  }
};

/**
 * Get user's own orders
 * @route GET /user/orders
 * @access User only
 */
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ user: userId })
      .populate('product', 'name value')
      .populate('product.category', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get orders'
    });
  }
};

/**
 * Get specific order by ID (user's own order only)
 * @route GET /user/order/:id
 * @access User only
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: id, user: userId })
      .populate('product', 'name value')
      .populate('product.category', 'type name');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
};

/**
 * Update user's own order (only if status is 'fresh')
 * @route PUT /user/order/:id
 * @access User only
 */
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { product, quantity, reason } = req.body;

    // Find order and check ownership
    const order = await Order.findOne({ _id: id, user: userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order can be edited (only fresh orders)
    if (order.status !== 'fresh') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be edited. Only fresh orders can be modified.'
      });
    }

    // Check if product exists (if product is being updated)
    if (product) {
      const productDoc = await Product.findById(product);
      if (!productDoc) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      order.product = product;
    }

    // Update order fields
    if (quantity) order.quantity = quantity;
    if (reason) order.reason = reason;

    await order.save();

    // Populate order details
    await order.populate('product', 'name value');
    await order.populate('product.category', 'type name');

    res.json({
      success: true,
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating order'
    });
  }
};

/**
 * Cancel user's own order (only if status is 'fresh')
 * @route DELETE /user/order/:id
 * @access User only
 */
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find order and check ownership
    const order = await Order.findOne({ _id: id, user: userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order can be cancelled (only fresh orders)
    if (order.status !== 'fresh') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled. Only fresh orders can be cancelled.'
      });
    }

    await Order.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling order'
    });
  }
};

/**
 * Get user's order statistics
 * @route GET /user/orders/stats
 * @access User only
 */
exports.getOrderStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await Order.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalOrders = await Order.countDocuments({ user: userId });
    const statusCounts = {};
    
    stats.forEach(stat => {
      statusCounts[stat._id] = stat.count;
    });

    // Ensure all statuses are present
    ['fresh', 'pending', 'completed', 'rejected'].forEach(status => {
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
    console.error('Get user order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order statistics'
    });
  }
};

module.exports = {
  getProducts,
  placeOrder,
  getMyOrders
}; 