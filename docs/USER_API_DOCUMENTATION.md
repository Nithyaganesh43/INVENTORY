# User API Documentation (Mobile App)

## Base URL
```
https://invetorymanagementsystembyisai.onrender.com
```

## Authentication
All user endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. Authentication

#### Login
**POST** `/auth/login`

Authenticates a user and returns a JWT token for mobile app access.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGY4YTFhMmMzZDRlNWY2YTdiOGM5ZDIiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5NDAwMDAwMCwiZXhwIjoxNjk0MDg2NDAwfQ.example",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "name": "John Doe",
    "username": "johndoe",
    "role": "user",
    "branch": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Main Office"
    }
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Username and password are required"
}
```

### 2. Product Management

#### Get All Products
**GET** `/user/products`

Retrieves all available products for ordering. This is the main endpoint for the mobile app to display the product catalog.

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

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
    },
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d8",
      "name": "Desk Chair",
      "value": 150,
      "category": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
        "name": "Office Supplies"
      },
      "createdAt": "2023-09-06T14:00:00.000Z",
      "updatedAt": "2023-09-06T14:00:00.000Z"
    }
  ]
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Access denied. User privileges required."
}
```

### 3. Order Management

#### Place Order
**POST** `/user/orders`

Creates a new order for a product. This is the main endpoint for users to place orders through the mobile app.

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "64f8a1b2c3d4e5f6a7b8c9d5",
  "quantity": 2,
  "reason": "New employee onboarding - need laptop for new team member"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d7",
    "status": "fresh",
    "product": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
      "name": "Laptop",
      "value": 1200
    },
    "quantity": 2,
    "user": "64f8a1b2c3d4e5f6a7b8c9d2",
    "reason": "New employee onboarding - need laptop for new team member",
    "createdAt": "2023-09-06T14:30:00.000Z",
    "updatedAt": "2023-09-06T14:30:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Product, quantity, and reason are required"
}
```

**Error Response (400 Bad Request - Invalid Quantity):**
```json
{
  "success": false,
  "message": "Quantity must be at least 1"
}
```

**Error Response (400 Bad Request - Product Not Found):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

#### Get My Orders
**GET** `/user/orders`

Retrieves all orders placed by the authenticated user. This allows users to view their order history in the mobile app.

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

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
      "user": "64f8a1b2c3d4e5f6a7b8c9d2",
      "reason": "New employee onboarding - need laptop for new team member",
      "createdAt": "2023-09-06T14:30:00.000Z",
      "updatedAt": "2023-09-06T14:30:00.000Z"
    },
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d9",
      "status": "pending",
      "product": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d6",
        "name": "Printer",
        "value": 300
      },
      "quantity": 1,
      "user": "64f8a1b2c3d4e5f6a7b8c9d2",
      "reason": "Replacement for broken printer",
      "createdAt": "2023-09-05T10:00:00.000Z",
      "updatedAt": "2023-09-06T09:00:00.000Z"
    },
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9da",
      "status": "finished",
      "product": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d8",
        "name": "Desk Chair",
        "value": 150
      },
      "quantity": 3,
      "user": "64f8a1b2c3d4e5f6a7b8c9d2",
      "reason": "New office furniture for expansion",
      "createdAt": "2023-09-01T08:00:00.000Z",
      "updatedAt": "2023-09-03T16:00:00.000Z"
    }
  ]
}
```

## Order Status Values
- `fresh`: New order, not yet processed by admin
- `pending`: Order is being processed by admin
- `finished`: Order has been completed and delivered

## Mobile App Integration Examples

### 1. Login Flow
```javascript
// Mobile app login example
const loginUser = async (username, password) => {
  try {
    const response = await fetch('https://invetorymanagementsystembyisai.onrender.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token in secure storage
      await SecureStore.setItemAsync('userToken', data.token);
      await SecureStore.setItemAsync('userData', JSON.stringify(data.user));
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
```

### 2. Product Catalog
```javascript
// Mobile app product listing example
const getProducts = async () => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    
    const response = await fetch('https://invetorymanagementsystembyisai.onrender.com/user/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.products;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Failed to get products:', error);
    throw error;
  }
};
```

### 3. Place Order
```javascript
// Mobile app order placement example
const placeOrder = async (productId, quantity, reason) => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    
    const response = await fetch('https://invetorymanagementsystembyisai.onrender.com/user/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        quantity,
        reason
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.order;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Failed to place order:', error);
    throw error;
  }
};
```

### 4. Order History
```javascript
// Mobile app order history example
const getMyOrders = async () => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    
    const response = await fetch('https://invetorymanagementsystembyisai.onrender.com/user/orders', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.orders;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Failed to get orders:', error);
    throw error;
  }
};
```

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access denied. User privileges required."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. User privileges required."
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

## Mobile App Workflow

### 1. User Authentication
1. User opens mobile app
2. User enters username and password
3. App calls `/auth/login` endpoint
4. App stores JWT token securely
5. App navigates to main screen

### 2. Product Browsing
1. App calls `/user/products` to get product catalog
2. App displays products in a list/grid view
3. User can filter by category (client-side)
4. User selects a product to order

### 3. Order Placement
1. User selects product and enters quantity
2. User provides reason for order
3. App calls `/user/orders` to place order
4. App shows confirmation message
5. App updates order history

### 4. Order Tracking
1. App calls `/user/orders` to get order history
2. App displays orders with status indicators
3. User can see order progress (fresh → pending → finished)

## Example cURL Commands

### Login
```bash
curl -X POST https://invetorymanagementsystembyisai.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

### Get Products (with token)
```bash
curl -X GET https://invetorymanagementsystembyisai.onrender.com/user/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Place Order (with token)
```bash
curl -X POST https://invetorymanagementsystembyisai.onrender.com/user/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "64f8a1b2c3d4e5f6a7b8c9d5",
    "quantity": 1,
    "reason": "Need laptop for new employee"
  }'
```

### Get My Orders (with token)
```bash
curl -X GET https://invetorymanagementsystembyisai.onrender.com/user/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Security Considerations

1. **JWT Token Storage**: Store tokens securely in mobile app (e.g., Keychain for iOS, Keystore for Android)
2. **Token Expiration**: Handle token expiration gracefully with automatic logout
3. **Network Security**: Use HTTPS in production
4. **Input Validation**: Validate all user inputs on both client and server
5. **Error Handling**: Don't expose sensitive information in error messages