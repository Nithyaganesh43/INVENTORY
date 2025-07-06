# Inventory Management System

A simple inventory management system with admin and user roles.

## Features

- **Admin Login**: Default credentials (admin/admin)
- **Branch Management**: Create branches
- **User Management**: Create users for each branch
- **Category Management**: Create product categories
- **Product Management**: Create products with categories
- **Order Management**: Users can place orders, admins can manage status

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   - Copy `env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure secret key

3. **Initialize Admin User**:
   ```bash
   npm run init-admin
   ```

4. **Start Server**:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /auth/login` - Login for admin and users

### Admin Routes (requires admin token)
- `POST /admin/branches` - Create branch
- `GET /admin/branches` - Get all branches
- `POST /admin/users` - Create user
- `POST /admin/categories` - Create category
- `GET /admin/categories` - Get all categories
- `POST /admin/products` - Create product
- `GET /admin/products` - Get all products
- `GET /admin/orders` - Get all orders
- `PATCH /admin/orders/:orderId/status` - Update order status

### User Routes (requires user token)
- `GET /user/products` - Get all products
- `POST /user/orders` - Place order
- `GET /user/orders` - Get user's orders

### Public Routes
- `GET /product` - Get all products
- `GET /product/categories` - Get all categories
- `GET /product/:id` - Get product by ID
- `GET /health` - Health check

## Order Status
- `fresh` - New order
- `pending` - Order being processed
- `finished` - Order completed

## Default Admin Credentials
- Username: `admin`
- Password: `admin`

**Important**: Change the default password after first login! 