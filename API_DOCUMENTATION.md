# API Documentation

## Base URL
```
https://your-app-name.onrender.com
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Authentication

#### Login
```
POST /auth/login
```
**Body:**
```json
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
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "username": "username",
    "role": "admin",
    "branch": null
  }
}
```

### 2. Admin Routes (Admin Only)

#### Create Branch
```
POST /admin/branches
```
**Body:**
```json
{
  "name": "Branch Name"
}
```

#### Get All Branches
```
GET /admin/branches
```

#### Create User
```
POST /admin/users
```
**Body:**
```json
{
  "name": "User Name",
  "username": "username",
  "password": "password",
  "branchId": "branch-id"
}
```

#### Get All Users
```
GET /admin/users
```

#### Create Category
```
POST /admin/categories
```
**Body:**
```json
{
  "name": "Category Name"
}
```

#### Get All Categories
```
GET /admin/categories
```

#### Create Product
```
POST /admin/products
```
**Body:**
```json
{
  "name": "Product Name",
  "value": 100,
  "categoryId": "category-id"
}
```

#### Get All Products
```
GET /admin/products
```

#### Get All Orders
```
GET /admin/orders
```

#### Update Order Status
```
PATCH /admin/orders/:orderId/status
```
**Body:**
```json
{
  "status": "pending"
}
```
**Status Options:** `fresh`, `pending`, `finished`

### 3. User Routes (User Only)

#### Get All Products
```
GET /user/products
```

#### Place Order
```
POST /user/orders
```
**Body:**
```json
{
  "productId": "product-id",
  "quantity": 5,
  "reason": "Need for project"
}
```

#### Get My Orders
```
GET /user/orders
```

### 4. Public Routes

#### Health Check
```
GET /health
```

## Error Responses
All endpoints return errors in this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Order Status Flow
1. `fresh` - New order created by user
2. `pending` - Admin has started processing
3. `finished` - Order completed

## Admin Credentials
- **Username:** `admin`
- **Password:** `admin123`

The admin user is automatically created when the server starts. 