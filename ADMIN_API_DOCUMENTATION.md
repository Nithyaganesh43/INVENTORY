# Inventory Management System - API Documentation

## Base URL 

https://invetorymanagementsystembyisai.onrender.com

## Authentication
All admin routes require authentication using JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin`

⚠️ **Important**: Change the default password after first login!

---

## 1. Authentication Routes

### 1.1 Admin Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "System Administrator",
    "username": "admin",
    "role": "admin",
    "branch": null
  }
}
```

---

## 2. Branch Management Routes

### 2.1 Create Branch
**POST** `/admin/branch`

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Main Branch"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Branch created successfully",
  "branch": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "name": "Main Branch",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
```

### 2.2 Get All Branches
**GET** `/admin/branches`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "branches": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "name": "Main Branch",
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    },
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
      "name": "North Branch",
      "createdAt": "2023-09-06T11:00:00.000Z",
      "updatedAt": "2023-09-06T11:00:00.000Z"
    }
  ]
}
```

### 2.3 Update Branch
**PUT** `/admin/branch/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Branch Name"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Branch updated successfully",
  "branch": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "name": "Updated Branch Name",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T12:00:00.000Z"
  }
}
```

### 2.4 Delete Branch
**DELETE** `/admin/branch/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Branch deleted successfully"
}
```

---

## 3. User Management Routes

### 3.1 Create User
**POST** `/admin/user`

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "password123",
  "branch": "64f8a1b2c3d4e5f6a7b8c9d1"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d3",
    "name": "John Doe",
    "username": "johndoe",
    "role": "user",
    "branch": "64f8a1b2c3d4e5f6a7b8c9d1"
  }
}
```

### 3.2 Get All Users
**GET** `/admin/users`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
      "name": "John Doe",
      "username": "johndoe",
      "role": "user",
      "branch": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "name": "Main Branch"
      },
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    }
  ]
}
```

### 3.3 Update User
**PUT** `/admin/user/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Smith",
  "username": "johnsmith",
  "password": "newpassword123",
  "branch": "64f8a1b2c3d4e5f6a7b8c9d2"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d3",
    "name": "John Smith",
    "username": "johnsmith",
    "role": "user",
    "branch": "64f8a1b2c3d4e5f6a7b8c9d2"
  }
}
```

### 3.4 Delete User
**DELETE** `/admin/user/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## 4. Category Management Routes

### 4.1 Create Category
**POST** `/product/category`

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "Electronics",
  "name": "Laptops"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Category created successfully",
  "category": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
    "type": "Electronics",
    "name": "Laptops",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
```

### 4.2 Get All Categories
**GET** `/product/categories`

**Response:**
```json
{
  "success": true,
  "categories": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
      "type": "Electronics",
      "name": "Laptops",
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    },
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
      "type": "Electronics",
      "name": "Smartphones",
      "createdAt": "2023-09-06T11:00:00.000Z",
      "updatedAt": "2023-09-06T11:00:00.000Z"
    }
  ]
}
```

### 4.3 Update Category
**PUT** `/product/category/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "Electronics",
  "name": "Gaming Laptops"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Category updated successfully",
  "category": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
    "type": "Electronics",
    "name": "Gaming Laptops",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T12:00:00.000Z"
  }
}
```

### 4.4 Delete Category
**DELETE** `/product/category/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

---

## 5. Product Management Routes

### 5.1 Create Product
**POST** `/product`

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "MacBook Pro",
  "value": 1299.99,
  "category": "64f8a1b2c3d4e5f6a7b8c9d4"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d6",
    "name": "MacBook Pro",
    "value": 1299.99,
    "category": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
      "type": "Electronics",
      "name": "Laptops"
    },
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
```

### 5.2 Get All Products
**GET** `/product`

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d6",
      "name": "MacBook Pro",
      "value": 1299.99,
      "category": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
        "type": "Electronics",
        "name": "Laptops"
      },
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    }
  ]
}
```

### 5.3 Update Product
**PUT** `/product/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "MacBook Pro M2",
  "value": 1499.99,
  "category": "64f8a1b2c3d4e5f6a7b8c9d4"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d6",
    "name": "MacBook Pro M2",
    "value": 1499.99,
    "category": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
      "type": "Electronics",
      "name": "Laptops"
    },
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T12:00:00.000Z"
  }
}
```

### 5.4 Delete Product
**DELETE** `/product/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 6. Order Management Routes

### 6.1 Get All Orders
**GET** `/admin/orders`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d7",
      "status": "pending",
      "product": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d6",
        "name": "MacBook Pro",
        "value": 1299.99
      },
      "quantity": 2,
      "user": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
        "name": "John Doe",
        "username": "johndoe",
        "branch": {
          "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
          "name": "Main Branch"
        }
      },
      "reason": "Office equipment",
      "time": "2023-09-06T10:30:00.000Z",
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    }
  ]
}
```

### 6.2 Update Order Status
**PATCH** `/admin/order/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "order": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d7",
    "status": "completed",
    "product": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d6",
      "name": "MacBook Pro",
      "value": 1299.99
    },
    "quantity": 2,
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
      "name": "John Doe",
      "username": "johndoe",
      "branch": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "name": "Main Branch"
      }
    },
    "reason": "Office equipment",
    "time": "2023-09-06T10:30:00.000Z",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T12:00:00.000Z"
  }
}
```

### 6.3 Get Order Statistics
**GET** `/admin/orders/stats`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 25,
    "byStatus": {
      "fresh": 5,
      "pending": 10,
      "completed": 8,
      "rejected": 2
    }
  }
}
```

---

## 7. Admin Profile Routes

### 7.1 Change Admin Password
**PATCH** `/admin/change-password`

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "admin",
  "newPassword": "newSecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## 8. Error Responses

### 8.1 Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "Name is required",
      "path": "name",
      "location": "body"
    }
  ]
}
```

### 8.2 Authentication Error
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### 8.3 Authorization Error
```json
{
  "success": false,
  "message": "Access denied. Insufficient permissions."
}
```

### 8.4 Not Found Error
```json
{
  "success": false,
  "message": "Branch not found"
}
```

### 8.5 Server Error
```json
{
  "success": false,
  "message": "Server error while creating branch"
}
```

---

## 9. Order Status Values

- `fresh` - New order, not yet processed
- `pending` - Order is being reviewed/processed
- `completed` - Order has been approved and fulfilled
- `rejected` - Order has been denied

---

## 10. Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

3. **Initialize default admin user:**
   ```bash
   npm run init-admin
   ```

4. **Start the server:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

5. **Login with default credentials:**
   - Username: `admin`
   - Password: `admin`

6. **Change the default password immediately after first login!** 