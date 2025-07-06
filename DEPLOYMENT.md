# Deployment Guide for Render

## Prerequisites
- Render account
- MongoDB database (MongoDB Atlas recommended)

## Deployment Steps

### 1. Prepare MongoDB Database
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add your IP to whitelist (or use 0.0.0.0/0 for all IPs)

### 2. Deploy to Render

1. **Connect your GitHub repository to Render**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Web Service**
   - **Name**: `inventory-system` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if needed)

3. **Environment Variables**
   Add these environment variables in Render:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory-system
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=10000
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your application

### 3. Verify Deployment
- Your API will be available at: `https://your-app-name.onrender.com`
- Test the health endpoint: `https://your-app-name.onrender.com/health`
- Admin login: `admin` / `admin123`

## API Base URL
Once deployed, your API base URL will be:
```
https://your-app-name.onrender.com
```

## Important Notes
- The admin user (admin/admin123) is automatically created on first server start
- Make sure your MongoDB connection string is correct
- The JWT_SECRET should be a strong, unique string
- Render will automatically restart your service if it crashes 