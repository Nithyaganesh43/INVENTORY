const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const { User, Branch, Category, Product, Order } = require('../models');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  }
};

// Setup test data
const setupTestData = async () => {
  try {
    console.log('🚀 Setting up test data for Postman...');

    // Create test branch
    const testBranch = new Branch({ name: 'Test Branch' });
    await testBranch.save();
    console.log('✅ Created test branch:', testBranch.name);

    // Create test category
    const testCategory = new Category({ 
      type: 'Electronics', 
      name: 'Laptops' 
    });
    await testCategory.save();
    console.log('✅ Created test category:', testCategory.type, '-', testCategory.name);

    // Create test product
    const testProduct = new Product({
      name: 'Dell XPS 13 Laptop',
      value: 1200,
      category: testCategory._id
    });
    await testProduct.save();
    console.log('✅ Created test product:', testProduct.name);

    // Create test user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const testUser = new User({
      name: 'Test User',
      username: 'test.user',
      password: hashedPassword,
      role: 'user',
      branch: testBranch._id
    });
    await testUser.save();
    console.log('✅ Created test user:', testUser.username);

    // Create test order
    const testOrder = new Order({
      status: 'fresh',
      product: testProduct._id,
      quantity: 2,
      user: testUser._id,
      reason: 'Office supplies needed'
    });
    await testOrder.save();
    console.log('✅ Created test order');

    console.log('\n📋 Test Data Summary:');
    console.log('Branch ID:', testBranch._id);
    console.log('Category ID:', testCategory._id);
    console.log('Product ID:', testProduct._id);
    console.log('User ID:', testUser._id);
    console.log('Order ID:', testOrder._id);
    console.log('\n🔑 Test Credentials:');
    console.log('Admin: admin/admin123');
    console.log('User: test.user/password123');

    console.log('\n✅ Test data setup completed successfully!');
    console.log('🎯 You can now use these IDs in your Postman environment variables.');

  } catch (error) {
    console.error('❌ Error setting up test data:', error);
  }
};

// Main execution
const main = async () => {
  const connected = await connectDB();
  if (connected) {
    await setupTestData();
    mongoose.connection.close();
  }
};

main(); 