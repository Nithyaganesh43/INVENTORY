# Inventory Management System API Documentation

This repository contains comprehensive API documentation for the Inventory Management System, designed to support both admin web interfaces and user mobile applications.

## 📚 Documentation Overview

### 1. [Admin API Documentation](./ADMIN_API_DOCUMENTATION.md)
Complete documentation for administrative functions including:
- **Branch Management**: Create and manage company branches
- **User Management**: Create users and assign them to branches
- **Category Management**: Organize products into categories
- **Product Management**: Add and manage inventory items
- **Order Management**: View all orders and update their status

### 2. [User API Documentation](./USER_API_DOCUMENTATION.md)
Mobile app-focused documentation covering:
- **Authentication**: Login with username/password
- **Product Catalog**: Browse available products
- **Order Placement**: Place new orders with quantity and reason
- **Order History**: Track order status and history

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Admin Web     │    │   User Mobile   │    │   API Server    │
│   Interface     │    │     App         │    │   (Node.js)     │
│                 │    │                 │    │                 │
│ • Manage Users  │    │ • Login         │    │ • Authentication│
│ • Manage Orders │    │ • Browse Products│   │ • Authorization │
│ • Update Status │    │ • Place Orders  │    │ • Data Storage  │
│ • View Reports  │    │ • Track Orders  │    │ • Business Logic│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔐 Authentication Flow

### For Admin Users
1. Login via `/auth/login` with admin credentials
2. Receive JWT token with admin role
3. Use token for all admin API calls

### For Regular Users
1. Login via `/auth/login` with user credentials
2. Receive JWT token with user role
3. Use token for all user API calls

## 📱 Mobile App Integration

The User API is specifically designed for mobile applications with:

- **Simple Authentication**: Username/password login
- **Product Catalog**: Easy-to-consume product listings
- **Order Management**: Streamlined order placement and tracking
- **Real-time Status**: Order status updates

## 🛠️ API Features

### Admin Features
- ✅ Create and manage branches
- ✅ Create users and assign to branches
- ✅ Manage product categories
- ✅ Add and update products
- ✅ View all orders across the system
- ✅ Update order status (fresh → pending → finished)
- ✅ Comprehensive order management

### User Features
- ✅ Secure login with JWT authentication
- ✅ Browse complete product catalog
- ✅ Place orders with quantity and reason
- ✅ View personal order history
- ✅ Track order status in real-time

## 📊 Data Models

### User
```json
{
  "id": "string",
  "name": "string",
  "username": "string",
  "role": "admin|user",
  "branch": "Branch ID (for users)"
}
```

### Product
```json
{
  "id": "string",
  "name": "string",
  "value": "number",
  "category": "Category ID"
}
```

### Order
```json
{
  "id": "string",
  "status": "fresh|pending|finished",
  "product": "Product ID",
  "quantity": "number",
  "user": "User ID",
  "reason": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## 🚀 Quick Start

### 1. Server Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env

# Start the server
npm start
```

### 2. Admin Access
```bash
# Login as admin
curl -X POST https://invetorymanagementsystembyisai.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "adminpass"}'

# Use the returned token for admin operations
```

### 3. User Access
```bash
# Login as user
curl -X POST https://invetorymanagementsystembyisai.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "password": "password123"}'

# Use the returned token for user operations
```

## 🔧 Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Environment Variables
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/inventory
JWT_SECRET=your_jwt_secret_key
```

### Available Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server
npm run test       # Run tests
```

## 📋 API Endpoints Summary

### Authentication
- `POST /auth/login` - Login for both admin and users

### Admin Endpoints
- `POST /admin/branches` - Create branch
- `GET /admin/branches` - Get all branches
- `POST /admin/users` - Create user
- `POST /admin/categories` - Create category
- `GET /admin/categories` - Get all categories
- `POST /admin/products` - Create product
- `GET /admin/products` - Get all products
- `GET /admin/orders` - Get all orders
- `PATCH /admin/orders/:id/status` - Update order status

### User Endpoints
- `GET /user/products` - Get product catalog
- `POST /user/orders` - Place new order
- `GET /user/orders` - Get user's orders

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Admin and user role separation
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Secure error responses
- **Password Hashing**: bcrypt password encryption

## 📞 Support

For API support and questions:
- Check the detailed documentation in the respective files
- Review the example requests and responses
- Test with the provided cURL commands
- Ensure proper authentication headers are included

## 📄 License

This API documentation is part of the Inventory Management System project. 