const { app, connectDB } = require('./app');

const PORT = process.env.PORT || 3000;

// Start server only after database connection
const startServer = async () => {
  try {
    // Connect to database first
    const dbConnected = await connectDB();
    
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Server will not start.');
      process.exit(1);
    }

    // Start server after successful database connection
    app.listen(PORT, () => {
      console.log(`🚀 Inventory System API server is running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🗄️  Database: Connected to MongoDB Atlas`);
    });

  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

// Start the server
startServer(); 