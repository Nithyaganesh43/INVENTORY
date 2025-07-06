const mongoose = require('mongoose');

// Enums
const ORDER_STATUSES = ['fresh', 'pending', 'completed', 'rejected'];

// User Schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  username: { 
    type: String, 
    unique: true, 
    required: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    required: true,
    default: 'user'
  },
  branch: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Branch',
    required: function() { return this.role === 'user'; }
  }
}, {
  timestamps: true
});

// Branch Schema
const branchSchema = new mongoose.Schema({
  name: { 
    type: String, 
    unique: true, 
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Category Schema
const categorySchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true,
    trim: true
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  value: { 
    type: Number, 
    required: true,
    min: 0
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: true
  }
}, {
  timestamps: true
});

// Order Schema
const orderSchema = new mongoose.Schema({
  status: { 
    type: String, 
    enum: ORDER_STATUSES, 
    default: 'fresh' 
  },
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true
  },
  quantity: { 
    type: Number, 
    required: true,
    min: 1
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  reason: { 
    type: String, 
    required: true,
    trim: true
  },
  time: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Create models
const User = mongoose.model('User', userSchema);
const Branch = mongoose.model('Branch', branchSchema);
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { 
  User, 
  Branch, 
  Category, 
  Product, 
  Order,
  ORDER_STATUSES 
}; 