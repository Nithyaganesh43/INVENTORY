# Admin API Documentation

## Base URL
```
https://invetorymanagementsystembyisai.onrender.com/admin
```

## Authentication
All admin endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. Branch Management

#### Create Branch
**POST** `/branches`

Creates a new branch in the system.

**Request Body:**
```json
{
  "name": "Main Office"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Branch created successfully",
  "branch": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Main Office",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Branch name is required"
}
```

#### Get All Branches
**GET** `/branches`

Retrieves all branches in the system.

**Response (200 OK):**
```json
{
  "success": true,
  "branches": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Main Office",
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    },
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "name": "Branch Office",
      "createdAt": "2023-09-06T11:00:00.000Z",
      "updatedAt": "2023-09-06T11:00:00.000Z"
    }
  ]
}
```

### 2. User Management

#### Create User
**POST** `/users`

Creates a new user in a specific branch.

**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "password123",
  "branchId": "64f8a1b2c3d4e5f6a7b8c9d0"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "name": "John Doe",
    "username": "johndoe",
    "role": "user",
    "branch": "64f8a1b2c3d4e5f6a7b8c9d0"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Name, username, password, and branch are required"
}
```

### 3. Category Management

#### Create Category
**POST** `/categories`

Creates a new product category.

**Request Body:**
```json
{
  "name": "Electronics"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Category created successfully",
  "category": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
    "name": "Electronics",
    "createdAt": "2023-09-06T12:00:00.000Z",
    "updatedAt": "2023-09-06T12:00:00.000Z"
  }
}
```

#### Get All Categories
**GET** `/categories`

Retrieves all product categories.

**Response (200 OK):**
```json
{
  "success": true,
  "categories": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
      "name": "Electronics",
      "createdAt": "2023-09-06T12:00:00.000Z",
      "updatedAt": "2023-09-06T12:00:00.000Z"
    },
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
      "name": "Office Supplies",
      "createdAt": "2023-09-06T12:30:00.000Z",
      "updatedAt": "2023-09-06T12:30:00.000Z"
    }
  ]
}
```

### 4. Product Management

#### Create Product
**POST** `/products`

Creates a new product in a specific category.

**Request Body:**
```json
{
  "name": "Laptop",
  "value": 1200,
  "categoryId": "64f8a1b2c3d4e5f6a7b8c9d3"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
    "name": "Laptop",
    "value": 1200,
    "category": "64f8a1b2c3d4e5f6a7b8c9d3",
    "createdAt": "2023-09-06T13:00:00.000Z",
    "updatedAt": "2023-09-06T13:00:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Name, value, and category are required"
}
```

#### Get All Products
**GET** `/products`

Retrieves all products with their category information.

**Response (200 OK):**
```json
{
  "success": true,
  "products": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
      "name": "Laptop",
      "value": 1200,
      "category": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
        "name": "Electronics"
      },
      "createdAt": "2023-09-06T13:00:00.000Z",
      "updatedAt": "2023-09-06T13:00:00.000Z"
    },
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d6",
      "name": "Printer",
      "value": 300,
      "category": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
        "name": "Office Supplies"
      },
      "createdAt": "2023-09-06T13:30:00.000Z",
      "updatedAt": "2023-09-06T13:30:00.000Z"
    }
  ]
}
```

### 5. Order Management

#### Get All Orders
**GET** `/orders`

Retrieves all orders from all users with detailed information.

**Response (200 OK):**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d7",
      "status": "fresh",
      "product": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
        "name": "Laptop",
        "value": 1200
      },
      "quantity": 2,
      "user": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
        "name": "John Doe",
        "username": "johndoe"
      },
      "reason": "New employee onboarding",
      "createdAt": "2023-09-06T14:00:00.000Z",
      "updatedAt": "2023-09-06T14:00:00.000Z"
    }
  ]
}
```

#### Update Order Status
**PATCH** `/orders/:orderId/status`

Updates the status of a specific order.

**Request Body:**
```json
{
  "status": "pending"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "order": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d7",
    "status": "pending",
    "product": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
      "name": "Laptop",
      "value": 1200
    },
    "quantity": 2,
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
      "name": "John Doe",
      "username": "johndoe"
    },
    "reason": "New employee onboarding",
    "createdAt": "2023-09-06T14:00:00.000Z",
    "updatedAt": "2023-09-06T14:30:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid status. Must be one of: fresh, pending, finished"
}
```

## Order Status Values
- `fresh`: New order, not yet processed
- `pending`: Order is being processed
- `finished`: Order has been completed

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error while processing request"
}
```

## Authentication Flow

1. **Login** (via `/auth/login` endpoint)
2. **Get JWT Token** from login response
3. **Include Token** in Authorization header for all admin requests

## Example cURL Commands

### Create Branch
```bash
curl -X POST https://invetorymanagementsystembyisai.onrender.com/admin/branches \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "New Branch"}'
```

### Create User
```bash
curl -X POST https://invetorymanagementsystembyisai.onrender.com/admin/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "username": "janesmith",
    "password": "password123",
    "branchId": "64f8a1b2c3d4e5f6a7b8c9d0"
  }'
```

### Get All Orders
```bash
curl -X GET https://invetorymanagementsystembyisai.onrender.com/admin/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Order Status
```bash
curl -X PATCH https://invetorymanagementsystembyisai.onrender.com/admin/orders/64f8a1b2c3d4e5f6a7b8c9d7/status \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "finished"}'
``` 