# Inventory Management System

A simple inventory management system with admin website and user mobile app functionality.

## Features

### Admin Website
- Login with admin credentials (admin/admin123)
- Manage branches
- Manage users
- Manage categories
- Manage products
- View and update order status

### User Mobile App
- Login with credentials provided by admin
- View all products
- Place orders
- View own orders

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp env.example .env
```

3. Update `.env` with your MongoDB URI and JWT secret.

4. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /auth/login` - Login for admin and users

### Admin Routes (Admin only)
- `POST /admin/branches` - Create branch
- `GET /admin/branches` - Get all branches
- `POST /admin/users` - Create user
- `GET /admin/users` - Get all users
- `POST /admin/categories` - Create category
- `GET /admin/categories` - Get all categories
- `POST /admin/products` - Create product
- `GET /admin/products` - Get all products
- `GET /admin/orders` - Get all orders
- `PATCH /admin/orders/:orderId/status` - Update order status

### User Routes (User only)
- `GET /user/products` - Get all products
- `POST /user/orders` - Place order
- `GET /user/orders` - Get user's orders

## Database Schema

- **User**: name, username, password, role (admin/user), branch
- **Branch**: name
- **Category**: name
- **Product**: name, value, category
- **Order**: status, product, quantity, user, reason

## Admin Credentials
- Username: `admin`
- Password: `admin123`

The admin user is automatically created when the server starts. 