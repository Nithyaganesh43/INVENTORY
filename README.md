# Inventory Management System

A centralized inventory management system built with Node.js, Express.js, and MongoDB. The system supports role-based access control with admin and user roles, branch management, and comprehensive order tracking.

## 🏗️ System Architecture

### User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Admin** | Global access, manage branches, create users, view all orders, change order statuses, manage products and categories |
| **User** | Place orders, view/edit own orders, login using username/password |

### Database Schema

- **User**: name, username, password, role, branch
- **Branch**: name
- **Category**: type, name
- **Product**: name, value, category
- **Order**: status, product, quantity, user, reason, time

### Order Statuses

- `fresh` - Newly created order
- `pending` - Order under review
- `completed` - Order fulfilled
- `rejected` - Order rejected

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your configuration
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/inventory-system
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Setup Database**
   ```bash
   # Run the setup script to create admin user and sample data
   node scripts/setup.js
   ```

5. **Start the Server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## 🏭 Production Deployment

### Manual PM2 Deployment

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start server.js --name "inventory-system"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Docker Deployment

```bash
# Create Dockerfile manually if needed
# Build and run with Docker
docker build -t inventory-system .
docker run -p 3000:3000 --env-file .env inventory-system
```

## 📋 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### 1. Authentication Routes

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "System Administrator",
    "username": "admin",
    "role": "admin",
    "branch": {
      "_id": "...",
      "name": "Main Branch"
    }
  }
}
```

### 2. Admin Routes

#### Create Branch
```http
POST /admin/branch
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "New Branch"
}
```

#### Get All Branches
```http
GET /admin/branches
Authorization: Bearer <admin-token>
```

#### Create User
```http
POST /admin/user
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "John Doe",
  "username": "john.doe",
  "password": "password123",
  "branch": "branch-id"
}
```

#### Get All Users
```http
GET /admin/users
Authorization: Bearer <admin-token>
```

#### Get All Orders
```http
GET /admin/orders
Authorization: Bearer <admin-token>
```

#### Update Order Status
```http
PATCH /admin/order/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "pending"
}
```

#### Get Order Statistics
```http
GET /admin/orders/stats
Authorization: Bearer <admin-token>
```

### 3. User Routes

#### Place Order
```http
POST /user/order
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "product": "product-id",
  "quantity": 5,
  "reason": "Office supplies needed"
}
```

#### Get Own Orders
```http
GET /user/orders
Authorization: Bearer <user-token>
```

#### Update Order (fresh status only)
```http
PUT /user/order/:id
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "quantity": 10,
  "reason": "Updated reason"
}
```

#### Cancel Order (fresh status only)
```http
DELETE /user/order/:id
Authorization: Bearer <user-token>
```

### 4. Product Routes

#### Create Category (Admin only)
```http
POST /product/category
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "type": "Electronics",
  "name": "Computers"
}
```

#### Get Categories (Public)
```http
GET /product/categories
```

#### Create Product (Admin only)
```http
POST /product
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Laptop Dell XPS 13",
  "value": 1200,
  "category": "category-id"
}
```

#### Get Products (Public)
```http
GET /product/list
```

## 🧪 Testing with Postman

### Sample Test Cases

1. **Admin Login**
   ```json
   POST /auth/login
   {
     "username": "admin",
     "password": "admin123"
   }
   ```

2. **User Login**
   ```json
   POST /auth/login
   {
     "username": "john.doe",
     "password": "password123"
   }
   ```

3. **Create Branch (Admin)**
   ```json
   POST /admin/branch
   Authorization: Bearer <admin-token>
   {
     "name": "Test Branch"
   }
   ```

4. **Create User (Admin)**
   ```json
   POST /admin/user
   Authorization: Bearer <admin-token>
   {
     "name": "Test User",
     "username": "test.user",
     "password": "password123",
     "branch": "branch-id"
   }
   ```

5. **Place Order (User)**
   ```json
   POST /user/order
   Authorization: Bearer <user-token>
   {
     "product": "product-id",
     "quantity": 3,
     "reason": "Testing order placement"
   }
   ```

6. **Update Order Status (Admin)**
   ```json
   PATCH /admin/order/:id
   Authorization: Bearer <admin-token>
   {
     "status": "completed"
   }
   ```

## 📁 Project Structure

```
inventory-system/
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── adminController.js     # Admin operations
│   ├── userController.js      # User operations
│   └── productController.js   # Product management
├── models/
│   └── index.js              # Database schemas
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── admin.js              # Admin routes
│   ├── user.js               # User routes
│   └── product.js            # Product routes
├── middlewares/
│   ├── auth.js               # JWT authentication
│   └── validation.js         # Request validation
├── scripts/
│   └── setup.js              # Database initialization
├── app.js                    # Express app configuration
├── server.js                 # Server entry point
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/inventory-system |
| `JWT_SECRET` | JWT signing secret | (required) |
| `NODE_ENV` | Environment mode | development |

### Database Setup

The setup script (`scripts/setup.js`) creates:
- **Admin user** (admin/admin123) - **GLOBAL ACCESS, NO BRANCH**
- Sample branches
- Sample categories and products
- Sample users in Main Branch

### Workflow

1. **Admin Login**: Admin logs in with `admin/admin123` (no branch required)
2. **Create Branches**: Admin creates branches for the organization
3. **Create Users**: Admin creates users and assigns them to branches
4. **User Credentials**: Users receive their username/password offline
5. **User Login**: Users login with their credentials (no branch selection)
6. **Add Products**: Admin adds products and categories
7. **Place Orders**: Users place orders for products
8. **Manage Orders**: Admin views and manages all orders from all branches

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Admin and user permissions
- **Input Validation**: Request validation using express-validator
- **Error Handling**: Comprehensive error handling and logging

## 🚀 Deployment

### Production Setup

1. Set environment variables for production
2. Use a production MongoDB instance
3. Set a strong JWT_SECRET
4. Enable HTTPS
5. Use PM2 or similar process manager

```bash
# Install PM2
npm install -g pm2

# Start in production mode
pm2 start server.js --name "inventory-system"
```

## 📊 Features

### Admin Features
- ✅ Manage branches (CRUD)
- ✅ Manage users (CRUD)
- ✅ View all orders with details
- ✅ Update order statuses
- ✅ Manage products and categories
- ✅ View order statistics

### User Features
- ✅ Place orders with quantity and reason
- ✅ View own orders
- ✅ Edit orders (fresh status only)
- ✅ Cancel orders (fresh status only)
- ✅ View order statistics

### System Features
- ✅ Role-based authentication
- ✅ Input validation
- ✅ Error handling
- ✅ Database relationships
- ✅ API documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please create an issue in the repository. 