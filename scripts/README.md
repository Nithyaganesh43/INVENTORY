# Scripts Directory

This directory contains utility scripts for the Inventory Management System.

## Scripts

### `setup.js`
**Purpose**: Complete system setup and initialization
**Usage**: `npm run setup`

This script:
- Checks environment variables
- Connects to MongoDB
- Creates the default admin user (if not exists)
- Provides setup information and next steps

### `init-admin.js`
**Purpose**: Initialize only the admin user
**Usage**: `npm run init-admin`

This script:
- Creates the default admin user with credentials:
  - Username: `admin`
  - Password: `admin`
- Skips if admin already exists

## Default Admin Credentials

⚠️ **Important**: These are default credentials and should be changed after first login!

- **Username**: `admin`
- **Password**: `admin`

## Usage

1. **Complete Setup** (Recommended):
   ```bash
   npm run setup
   ```

2. **Admin Only Setup**:
   ```bash
   npm run init-admin
   ```

3. **Manual Setup**:
   ```bash
   # Create .env file
   cp env.example .env
   
   # Edit .env with your MongoDB URI and JWT secret
   
   # Initialize admin
   npm run init-admin
   
   # Start server
   npm start
   ```

## Security Notes

- Always change the default admin password after first login
- Use strong passwords in production
- Keep your JWT secret secure
- Regularly update dependencies 