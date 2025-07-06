const { Product, Category } = require('../models');

/**
 * Create product category
 * @route POST /product/category
 * @access Admin only
 */
exports.createCategory = async (req, res) => {
  try {
    const { type, name } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ type, name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this type and name already exists'
      });
    }

    const category = new Category({ type, name });
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
      message: 'Server error while creating category'
    });
  }
};

/**
 * Get all categories
 * @route GET /product/categories
 * @access Public
 */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ type: 1, name: 1 });
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
};

/**
 * Update category
 * @route PUT /product/category/:id
 * @access Admin only
 */
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name } = req.body;

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if new type/name combination already exists
    if (type !== category.type || name !== category.name) {
      const existingCategory = await Category.findOne({ type, name });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category with this type and name already exists'
        });
      }
    }

    category.type = type;
    category.name = name;
    await category.save();

    res.json({
      success: true,
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating category'
    });
  }
};

/**
 * Delete category
 * @route DELETE /product/category/:id
 * @access Admin only
 */
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if category has products
    const productsInCategory = await Product.find({ category: id });
    if (productsInCategory.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with existing products'
      });
    }

    await Category.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting category'
    });
  }
};

/**
 * Create product
 * @route POST /product
 * @access Admin only
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, value, category } = req.body;

    // Check if product name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this name already exists'
      });
    }

    // Check if category exists
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({
        success: false,
        message: 'Category not found'
      });
    }

    const product = new Product({
      name,
      value,
      category
    });

    await product.save();

    // Populate category
    await product.populate('category', 'type name');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating product'
    });
  }
};

/**
 * Get all products
 * @route GET /product
 * @access Public
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'type name')
      .sort({ name: 1 });

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    });
  }
};

/**
 * Get product by ID
 * @route GET /product/:id
 * @access Public
 */
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate('category', 'type name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product'
    });
  }
};

/**
 * Update product
 * @route PUT /product/:id
 * @access Admin only
 */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, value, category } = req.body;

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if new name already exists
    if (name !== product.name) {
      const existingProduct = await Product.findOne({ name });
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: 'Product with this name already exists'
        });
      }
    }

    // Check if category exists (if category is being updated)
    if (category) {
      const categoryDoc = await Category.findById(category);
      if (!categoryDoc) {
        return res.status(400).json({
          success: false,
          message: 'Category not found'
        });
      }
    }

    // Update product fields
    if (name) product.name = name;
    if (value !== undefined) product.value = value;
    if (category) product.category = category;

    await product.save();

    // Populate category
    await product.populate('category', 'type name');

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating product'
    });
  }
};

/**
 * Delete product
 * @route DELETE /product/:id
 * @access Admin only
 */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if product has orders
    const productOrders = await require('../models').Order.find({ product: id });
    if (productOrders.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete product with existing orders'
      });
    }

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product'
    });
  }
}; 