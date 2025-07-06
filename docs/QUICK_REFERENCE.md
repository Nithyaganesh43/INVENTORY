# Quick Reference Guide

## 🔑 Authentication

### Login (Admin & Users)
```bash
curl -X POST https://invetorymanagementsystembyisai.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "adminpass"}'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "name": "Admin User",
    "role": "admin"
  }
}
```

## 👨‍💼 Admin API Quick Reference

### Create Branch
```bash
curl -X POST https://invetorymanagementsystembyisai.onrender.com/admin/branches \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "New Branch"}'
```

### Create User
```bash
curl -X POST https://invetorymanagementsystembyisai.onrender.com/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "username": "johndoe",
    "password": "password123",
    "branchId": "BRANCH_ID"
  }'
```

### Create Product
```bash
curl -X POST https://invetorymanagementsystembyisai.onrender.com/admin/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "value": 1200,
    "categoryId": "CATEGORY_ID"
  }'
```

### Get All Orders
```bash
curl -X GET https://invetorymanagementsystembyisai.onrender.com/admin/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Order Status
```bash
curl -X PATCH https://invetorymanagementsystembyisai.onrender.com/admin/orders/ORDER_ID/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "pending"}'
```

## 📱 User API Quick Reference

### Get Products (Mobile App)
```bash
curl -X GET https://invetorymanagementsystembyisai.onrender.com/user/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Place Order (Mobile App)
```bash
curl -X POST https://invetorymanagementsystembyisai.onrender.com/user/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PRODUCT_ID",
    "quantity": 2,
    "reason": "New employee onboarding"
  }'
```

### Get My Orders (Mobile App)
```bash
curl -X GET https://invetorymanagementsystembyisai.onrender.com/user/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 Common Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🔄 Order Status Flow

```
fresh → pending → finished
  ↓        ↓         ↓
 New    Processing  Completed
Order
```

## 📋 Required Headers

### For Admin Endpoints
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### For User Endpoints
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

## 🚨 Common Error Codes

- `400` - Bad Request (missing/invalid data)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## 📱 Mobile App Integration Checklist

- [ ] Implement login with username/password
- [ ] Store JWT token securely
- [ ] Add token to all API requests
- [ ] Handle token expiration
- [ ] Display product catalog
- [ ] Implement order placement
- [ ] Show order history
- [ ] Handle error states
- [ ] Add loading indicators

## 🔧 Development Tips

1. **Test Authentication First**: Always test login before other endpoints
2. **Check Token Expiration**: JWT tokens expire after 24 hours
3. **Validate Input**: Ensure all required fields are provided
4. **Handle Errors Gracefully**: Implement proper error handling in mobile apps
5. **Use HTTPS in Production**: Always use secure connections 