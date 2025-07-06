const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const { User, Branch, Category, Product } = require('./models');

// Sample data
const branches = [
  { name: 'Main Branch - Downtown' },
  { name: 'North Branch - Suburbia' },
  { name: 'South Branch - Industrial' },
  { name: 'East Branch - Residential' },
  { name: 'West Branch - Commercial' }
];

const categories = [
  { name: 'Electronics' },
  { name: 'Office Supplies' },
  { name: 'Furniture' },
  { name: 'Clothing' },
  { name: 'Books' },
  { name: 'Sports Equipment' },
  { name: 'Kitchen Appliances' },
  { name: 'Tools' },
  { name: 'Medical Supplies' },
  { name: 'Automotive Parts' }
];

const products = [
  // Electronics
  { name: 'Laptop', value: 1200, category: 'Electronics' },
  { name: 'Smartphone', value: 800, category: 'Electronics' },
  { name: 'Tablet', value: 500, category: 'Electronics' },
  { name: 'Headphones', value: 150, category: 'Electronics' },
  { name: 'Wireless Mouse', value: 25, category: 'Electronics' },
  
  // Office Supplies
  { name: 'Printer Paper', value: 15, category: 'Office Supplies' },
  { name: 'Stapler', value: 12, category: 'Office Supplies' },
  { name: 'Whiteboard', value: 80, category: 'Office Supplies' },
  { name: 'Desk Lamp', value: 45, category: 'Office Supplies' },
  { name: 'File Cabinet', value: 120, category: 'Office Supplies' },
  
  // Furniture
  { name: 'Office Chair', value: 200, category: 'Furniture' },
  { name: 'Desk', value: 300, category: 'Furniture' },
  { name: 'Bookshelf', value: 150, category: 'Furniture' },
  { name: 'Conference Table', value: 800, category: 'Furniture' },
  { name: 'Filing Cabinet', value: 180, category: 'Furniture' },
  
  // Clothing
  { name: 'Safety Vest', value: 35, category: 'Clothing' },
  { name: 'Work Boots', value: 120, category: 'Clothing' },
  { name: 'Hard Hat', value: 25, category: 'Clothing' },
  { name: 'Safety Gloves', value: 15, category: 'Clothing' },
  { name: 'Uniform Shirt', value: 30, category: 'Clothing' },
  
  // Books
  { name: 'Technical Manual', value: 45, category: 'Books' },
  { name: 'Training Guide', value: 25, category: 'Books' },
  { name: 'Reference Book', value: 60, category: 'Books' },
  { name: 'Safety Handbook', value: 20, category: 'Books' },
  { name: 'Procedure Manual', value: 35, category: 'Books' },
  
  // Sports Equipment
  { name: 'Tennis Racket', value: 80, category: 'Sports Equipment' },
  { name: 'Basketball', value: 25, category: 'Sports Equipment' },
  { name: 'Yoga Mat', value: 30, category: 'Sports Equipment' },
  { name: 'Dumbbells', value: 50, category: 'Sports Equipment' },
  { name: 'Treadmill', value: 500, category: 'Sports Equipment' },
  
  // Kitchen Appliances
  { name: 'Coffee Maker', value: 75, category: 'Kitchen Appliances' },
  { name: 'Microwave', value: 120, category: 'Kitchen Appliances' },
  { name: 'Refrigerator', value: 800, category: 'Kitchen Appliances' },
  { name: 'Blender', value: 45, category: 'Kitchen Appliances' },
  { name: 'Toaster', value: 35, category: 'Kitchen Appliances' },
  
  // Tools
  { name: 'Hammer', value: 20, category: 'Tools' },
  { name: 'Screwdriver Set', value: 30, category: 'Tools' },
  { name: 'Drill', value: 150, category: 'Tools' },
  { name: 'Wrench Set', value: 45, category: 'Tools' },
  { name: 'Measuring Tape', value: 15, category: 'Tools' },
  
  // Medical Supplies
  { name: 'First Aid Kit', value: 40, category: 'Medical Supplies' },
  { name: 'Thermometer', value: 25, category: 'Medical Supplies' },
  { name: 'Bandages', value: 10, category: 'Medical Supplies' },
  { name: 'Pain Relievers', value: 15, category: 'Medical Supplies' },
  { name: 'Antiseptic', value: 12, category: 'Medical Supplies' },
  
  // Automotive Parts
  { name: 'Motor Oil', value: 35, category: 'Automotive Parts' },
  { name: 'Brake Pads', value: 80, category: 'Automotive Parts' },
  { name: 'Air Filter', value: 25, category: 'Automotive Parts' },
  { name: 'Battery', value: 120, category: 'Automotive Parts' },
  { name: 'Tire', value: 150, category: 'Automotive Parts' }
];

const users = [
  // Branch 1 - Downtown
  { name: 'John Smith', username: 'john.downtown', password: 'password123', branch: 'Main Branch - Downtown' },
  { name: 'Sarah Johnson', username: 'sarah.downtown', password: 'password123', branch: 'Main Branch - Downtown' },
  
  // Branch 2 - Suburbia
  { name: 'Mike Wilson', username: 'mike.north', password: 'password123', branch: 'North Branch - Suburbia' },
  { name: 'Lisa Brown', username: 'lisa.north', password: 'password123', branch: 'North Branch - Suburbia' },
  
  // Branch 3 - Industrial
  { name: 'David Lee', username: 'david.south', password: 'password123', branch: 'South Branch - Industrial' },
  { name: 'Emma Davis', username: 'emma.south', password: 'password123', branch: 'South Branch - Industrial' },
  
  // Branch 4 - Residential
  { name: 'Alex Chen', username: 'alex.east', password: 'password123', branch: 'East Branch - Residential' },
  { name: 'Maria Garcia', username: 'maria.east', password: 'password123', branch: 'East Branch - Residential' },
  
  // Branch 5 - Commercial
  { name: 'Tom Anderson', username: 'tom.west', password: 'password123', branch: 'West Branch - Commercial' },
  { name: 'Rachel Green', username: 'rachel.west', password: 'password123', branch: 'West Branch - Commercial' }
];

// Admin user
const adminUser = {
  name: 'System Administrator',
  username: 'admin',
  password: 'admin123',
  role: 'admin'
};

async function initializeDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Branch.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create branches
    console.log('🏢 Creating branches...');
    const createdBranches = await Branch.insertMany(branches);
    console.log(`✅ Created ${createdBranches.length} branches`);

    // Create categories
    console.log('📂 Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create products
    console.log('📦 Creating products...');
    const productsWithCategories = products.map(product => {
      const category = createdCategories.find(cat => cat.name === product.category);
      return {
        name: product.name,
        value: product.value,
        category: category._id
      };
    });
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Create admin user
    console.log('👑 Creating admin user...');
    const hashedAdminPassword = await bcrypt.hash(adminUser.password, 10);
    const admin = await User.create({
      name: adminUser.name,
      username: adminUser.username,
      password: hashedAdminPassword,
      role: adminUser.role
    });
    console.log(`✅ Created admin user: ${admin.username}`);

    // Create regular users
    console.log('👥 Creating users...');
    const usersWithBranches = users.map(user => {
      const branch = createdBranches.find(b => b.name === user.branch);
      return {
        name: user.name,
        username: user.username,
        password: user.password,
        branch: branch._id,
        role: 'user'
      };
    });

    // Hash passwords for all users
    const hashedUsers = await Promise.all(
      usersWithBranches.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Summary
    console.log('\n🎉 Database initialization completed successfully!');
    console.log('📊 Summary:');
    console.log(`   • ${createdBranches.length} branches`);
    console.log(`   • ${createdCategories.length} categories`);
    console.log(`   • ${createdProducts.length} products`);
    console.log(`   • ${createdUsers.length + 1} users (including admin)`);
    console.log('\n🔑 Default Admin Credentials:');
    console.log(`   Username: ${adminUser.username}`);
    console.log(`   Password: ${adminUser.password}`);
    console.log('\n👤 Regular User Credentials:');
    console.log('   Username: [username] (e.g., john.downtown)');
    console.log('   Password: password123');

  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the initialization
initializeDatabase(); 