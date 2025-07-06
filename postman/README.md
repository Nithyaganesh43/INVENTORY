# Inventory System - Postman Collection

This directory contains a complete Postman collection and environment for testing the Inventory Management System API.

## Files

- `Inventory_System_Environment.json` - Postman environment with variables
- `Inventory_System_Collection.json` - Complete API collection with all endpoints
- `Admin_API_Collection.json` - Admin-specific API collection
- `README.md` - This documentation file

## Setup Instructions

### 1. Import Environment

1. Open Postman
2. Click "Import" button
3. Select `Inventory_System_Environment.json`
4. The environment will be imported with all necessary variables

### 2. Import Collection

1. Click "Import" button again
2. Select `Inventory_System_Collection.json` (or `Admin_API_Collection.json` for admin-only testing)
3. The collection will be imported with all API endpoints

### 3. Select Environment

1. In the top-right corner of Postman, select "Inventory System - Environment"
2. This will enable all environment variables

## Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `base_url` | API base URL | `https://invetorymanagementsystembyisai.onrender.com` |
| `admin_token` | JWT token for admin user | (auto-populated) |
| `user_token` | JWT token for regular user | (auto-populated) |
| `admin_username` | Admin username | `admin` |
| `admin_password` | Admin password | `admin123` |
| `test_user_username` | Test user username | `john.doe` |
| `test_user_password` | Test user password | `password123` |
| `branch_id` | Branch ID for testing | (auto-populated) |
| `user_id` | User ID for testing | (auto-populated) |
| `category_id` | Category ID for testing | (auto-populated) |
| `product_id` | Product ID for testing | (auto-populated) |
| `order_id` | Order ID for testing | (auto-populated) |

## Collection Structure

### 1. Health Check
- **Health Check** - Verify API is running

### 2. Authentication
- **Admin Login** - Login as admin (saves admin token)
- **User Login** - Login as user (saves user token)

### 3. Public Products
- **Get All Products** - List all products (public access)
- **Get Product by ID** - Get specific product (public access)
- **Get All Categories** - List all categories (public access)

### 4. Admin - Branch Management
- **Create Branch** - Create new branch (saves branch ID)
- **Get All Branches** - List all branches

### 5. Admin - User Management
- **Create User** - Create new user (saves user ID)

### 6. Admin - Category Management
- **Create Category** - Create product category (saves category ID)
- **Get All Categories** - List all categories

### 7. Admin - Product Management
- **Create Product** - Create new product (saves product ID)
- **Get All Products** - List all products

### 8. Admin - Order Management
- **Get All Orders** - List all orders
- **Update Order Status** - Change order status

### 9. User - Products
- **Get Products** - List products (user access)

### 10. User - Orders
- **Place Order** - Create new order (saves order ID)
- **Get My Orders** - List user's orders

## Testing Workflow

### Prerequisites
1. Start the server: `npm start`
2. Ensure MongoDB is running and connected

### Recommended Testing Order

1. **Health Check** - Verify API is accessible
2. **Admin Login** - Get admin authentication token
3. **Create Branch** - Create a test branch
4. **Create Category** - Create a product category
5. **Create Product** - Create a test product
6. **Create User** - Create a test user
7. **User Login** - Get user authentication token
8. **Place Order** - Create a test order
9. **Test Admin Functions** - Manage orders, users, etc.
10. **Test User Functions** - Manage own orders

## Features

### Automatic Token Management
- Login requests automatically save tokens to environment variables
- Subsequent requests use the saved tokens

### ID Tracking
- Create requests automatically save IDs to environment variables
- Update/Delete requests use the saved IDs

### Response Validation
- Test scripts validate response status codes
- Ensures required fields are present in successful responses

## API Endpoints Covered

### Authentication
- `POST /auth/login` - User login

### Public Routes
- `GET /health` - Health check
- `GET /product` - Get all products
- `GET /product/:id` - Get product by ID
- `GET /product/categories` - Get all categories

### Admin Routes
- `POST /admin/branches` - Create branch
- `GET /admin/branches` - Get all branches
- `POST /admin/users` - Create user
- `POST /admin/categories` - Create category
- `GET /admin/categories` - Get all categories
- `POST /admin/products` - Create product
- `GET /admin/products` - Get all products
- `GET /admin/orders` - Get all orders
- `PATCH /admin/orders/:orderId/status` - Update order status

### User Routes
- `GET /user/products` - Get products
- `POST /user/orders` - Place order
- `GET /user/orders` - Get own orders

## Troubleshooting

### Common Issues

1. **Server not running**
   - Ensure the server is started with `npm start`
   - Check if MongoDB is running

2. **Authentication errors**
   - Verify admin credentials: `admin/admin123`
   - Check if JWT_SECRET is set in environment

3. **Missing IDs**
   - Run requests in the recommended order
   - Check that create requests completed successfully

4. **Validation errors**
   - Check request body format
   - Ensure all required fields are provided

### Debug Tips

1. Check the Postman console for detailed logs
2. Verify environment variables are set correctly
3. Test individual endpoints before running the full collection
4. Check server logs for detailed error messages

## Security Notes

- All admin routes require admin authentication
- All user routes require user authentication
- Public routes are accessible without authentication
- JWT tokens expire after 24 hours
- Passwords are hashed using bcrypt

## API Response Format

All API responses follow this format:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": {}, // Optional data object
  "token": "jwt_token" // Only for login responses
}
```

## Error Responses

Error responses include:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error 