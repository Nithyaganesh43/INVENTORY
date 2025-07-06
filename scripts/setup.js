const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
require('dotenv').config();

const setup = async () => {
  console.log('🚀 Inventory System Setup');
  console.log('========================\n');

  try {
    // Check if .env file exists
    if (!process.env.MONGODB_URI) {
      console.error('❌ Error: MONGODB_URI not found in environment variables');
      console.log('📝 Please create a .env file with the following variables:');
      console.log('   MONGODB_URI=your_mongodb_connection_string');
      console.log('   JWT_SECRET=your_jwt_secret_key');
      console.log('   PORT=3000 (optional)');
      console.log('   NODE_ENV=development (optional)\n');
      process.exit(1);
    }

    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully\n');

    // Check if admin already exists
    console.log('🔍 Checking for existing admin user...');
    const existingAdmin = await User.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      console.log('   Username: admin');
      console.log('   Password: admin (if not changed)\n');
    } else {
      // Create admin user
      console.log('👤 Creating default admin user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin', salt);

      const adminUser = new User({
        name: 'System Administrator',
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      });

      await adminUser.save();
      console.log('✅ Default admin user created successfully\n');
    }

    // Display setup information
    console.log('📋 Setup Information:');
    console.log('=====================');
    console.log('🔑 Default Admin Credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin');
    console.log('');
    console.log('⚠️  IMPORTANT: Change the default password after first login!');
    console.log('');
    console.log('🌐 API Endpoints:');
    console.log('   Base URL: http://localhost:3000');
    console.log('   Health Check: http://localhost:3000/health');
    console.log('   Admin Login: POST http://localhost:3000/auth/login');
    console.log('');
    console.log('📚 Documentation:');
    console.log('   API Documentation: API_DOCUMENTATION.md');
    console.log('   Postman Collection: postman/Admin_API_Collection.json');
    console.log('');
    console.log('🚀 Next Steps:');
    console.log('   1. Start the server: npm start');
    console.log('   2. Login with admin credentials');
    console.log('   3. Change the default password');
    console.log('   4. Create branches, users, categories, and products');
    console.log('   5. Start managing inventory orders!');
    console.log('');
    console.log('✅ Setup completed successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('   1. Check your MongoDB connection string');
    console.log('   2. Ensure MongoDB is running');
    console.log('   3. Verify your .env file is properly configured');
    console.log('   4. Check network connectivity');
    process.exit(1);
  }
};

setup(); 