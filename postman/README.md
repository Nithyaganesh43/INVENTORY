# Inventory System - Postman Collection

This directory contains a complete Postman collection and environment for testing the Inventory Management System API.

## Files

- `Inventory_System_Environment.json` - Postman environment with variables
- `Inventory_System_Collection.json` - Complete API collection with all endpoints
- `README.md` - This documentation file

## Setup Instructions

### 1. Import Environment

1. Open Postman
2. Click "Import" button
3. Select `Inventory_System_Environment.json`
4. The environment will be imported with all necessary variables

### 2. Import Collection

1. Click "Import" button again
2. Select `Inventory_System_Collection.json`
3. The collection will be imported with all API endpoints

### 3. Select Environment

1. In the top-right corner of Postman, select "Inventory System - Environment"
2. This will enable all environment variables

## Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `base_url` | API base URL | `http://localhost:3000` |
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
- **Get Profile** - Get current user profile

### 3. Admin - Branch Management
- **Create Branch** - Create new branch (saves branch ID)
- **Get All Branches** - List all branches
- **Update Branch** - Update branch details
- **Delete Branch** - Delete branch

### 4. Admin - User Management
- **Create User** - Create new user (saves user ID)
- **Get All Users** - List all users
- **Update User** - Update user details
- **Delete User** - Delete user

### 5. Admin - Order Management
- **Get All Orders** - List all orders
- **Update Order Status** - Change order status
- **Get Order Statistics** - Get order statistics

### 6. Product Management
- **Create Category** - Create product category (saves category ID)
- **Get All Categories** - List all categories
- **Update Category** - Update category details
- **Delete Category** - Delete category
- **Create Product** - Create new product (saves product ID)
- **Get All Products** - List all products
- **Get Product by ID** - Get specific product
- **Update Product** - Update product details
- **Delete Product** - Delete product

### 7. User - Order Management
- **Place Order** - Create new order (saves order ID)
- **Get Own Orders** - List user's orders
- **Get Order by ID** - Get specific order
- **Update Order** - Update order (fresh status only)
- **Cancel Order** - Cancel order (fresh status only)
- **Get User Order Statistics** - Get user's order statistics

## Testing Workflow

### Prerequisites
1. Start the server: `npm run dev`
2. Run the setup script: `node scripts/setup.js`
3. Ensure MongoDB is running

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
- Global test script validates response status codes
- Ensures required fields are present in successful responses

### Error Testing
- Collection includes various error scenarios
- Tests validation errors, authentication failures, etc.

## API Endpoints Covered

### Authentication
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

### Admin Routes
- `POST /admin/branch` - Create branch
- `GET /admin/branches` - Get all branches
- `PUT /admin/branch/:id` - Update branch
- `DELETE /admin/branch/:id` - Delete branch
- `POST /admin/user` - Create user
- `GET /admin/users` - Get all users
- `PUT /admin/user/:id` - Update user
- `DELETE /admin/user/:id` - Delete user
- `GET /admin/orders` - Get all orders
- `PATCH /admin/order/:id` - Update order status
- `GET /admin/orders/stats` - Get order statistics

### User Routes
- `POST /user/order` - Place order
- `GET /user/orders` - Get own orders
- `GET /user/order/:id` - Get specific order
- `PUT /user/order/:id` - Update order
- `DELETE /user/order/:id` - Cancel order
- `GET /user/orders/stats` - Get order statistics

### Product Routes
- `POST /product/category` - Create category
- `GET /product/categories` - Get all categories
- `PUT /product/category/:id` - Update category
- `DELETE /product/category/:id` - Delete category
- `POST /product` - Create product
- `GET /product/list` - Get all products
- `GET /product/:id` - Get specific product
- `PUT /product/:id` - Update product
- `DELETE /product/:id` - Delete product

### System Routes
- `GET /health` - Health check

## Troubleshooting

### Common Issues

1. **Server not running**
   - Ensure the server is started with `npm run dev`
   - Check if MongoDB is running

2. **Authentication errors**
   - Run the setup script: `node scripts/setup.js`
   - Verify admin credentials: `admin/admin123`

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

- Tokens are automatically saved to environment variables
- Clear environment variables when done testing
- Never commit real tokens to version control
- Use different credentials for production testing

## Support

For issues with the API or collection:
1. Check the main README.md for API documentation
2. Verify server setup and configuration
3. Check MongoDB connection and data
4. Review server logs for detailed error messages 