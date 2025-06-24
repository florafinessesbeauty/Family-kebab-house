# Project Structure - Kebab Shop Management System

## Overview
Complete kebab shop management system with public React frontend, Node.js backend API, and React admin dashboard.

## Folder Structure

```
kebab-shop/
├── public-react/                 # Public website (existing React frontend)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                       # Backend API (Node.js + Express + PostgreSQL)
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   └── MenuItem.js          # Sequelize MenuItem model
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   └── menu.js              # Menu CRUD endpoints
│   ├── app.js                   # Express app configuration
│   ├── server.js                # Server startup
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── admin/                        # Admin Dashboard (React)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddItemModal.js
│   │   │   ├── EditItemModal.js
│   │   │   ├── MenuItemsList.js
│   │   │   └── ProtectedRoute.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   └── Login.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── .gitignore
│   └── README.md
│
├── .env                          # Environment variables
└── PROJECT_STRUCTURE.md         # This file
```

## API Endpoints

### Public Endpoints
- `GET /api/menu` - List all menu items (used by public frontend)
- `GET /health` - Server health check

### Authentication Endpoints
- `POST /api/auth/login` - Admin login (returns JWT)
- `GET /api/auth/verify` - Verify JWT token

### Protected Admin Endpoints (Require JWT)
- `POST /api/menu` - Create new menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

## Database Schema

### MenuItem Table
```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  logo_emoji VARCHAR,
  description TEXT,
  category VARCHAR NOT NULL,
  is_special BOOLEAN DEFAULT false,
  single_price DECIMAL(10,2),
  price_small DECIMAL(10,2),
  price_medium DECIMAL(10,2),
  price_large DECIMAL(10,2),
  price_x_large DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Getting Started

### 1. Backend Setup
```bash
cd server/
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

### 2. Admin Dashboard Setup
```bash
cd admin/
npm install
npm start
```

### 3. Public Frontend (Existing)
Your existing React frontend at `/public-react` continues to work by calling `GET /api/menu`

## Authentication Flow

1. Admin accesses dashboard at `/admin`
2. Login form sends credentials to `POST /api/auth/login`
3. Backend validates and returns JWT token
4. Frontend stores token and includes in all admin requests
5. Backend middleware validates JWT for protected routes

## Data Flow

1. **Public Site**: `GET /api/menu` → Display menu items
2. **Admin Login**: `POST /api/auth/login` → Get JWT token
3. **Admin CRUD**: Protected API calls with JWT header
4. **Real-time Updates**: Admin changes immediately reflect on public site

## Security Features

- JWT authentication for admin access
- Rate limiting on API endpoints
- CORS configuration
- Helmet.js security headers
- Input validation and sanitization
- SQL injection protection via Sequelize ORM

## Development Workflow

1. **Add New Menu Item**: Admin dashboard → API → Database → Public site
2. **Edit Item**: Admin dashboard → API → Database → Public site  
3. **Delete Item**: Admin dashboard → API → Database → Public site

All changes are immediate and reflect on the public website instantly.

## Production Deployment

### Backend
- Deploy Node.js app to your preferred platform
- Set production environment variables
- Ensure PostgreSQL database is accessible
- Update CORS settings for production domains

### Admin Dashboard
- Build React app: `npm run build`
- Serve static files from `/build` folder
- Configure proxy/API endpoints for production

### Public Frontend
- Your existing deployment process
- Ensure it can access the new API endpoints

## Environment Variables

### Required (.env)
```
DATABASE_URL=postgresql://user:pass@host:port/database
JWT_SECRET=your-secret-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-password
```

### Optional
```
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

## Migration from Existing Setup

1. Your existing React frontend remains unchanged
2. Update API calls from static data to `GET /api/menu`
3. Deploy backend API on port 5000 (or configure proxy)
4. Deploy admin dashboard separately
5. Populate database with existing menu items via admin dashboard

This architecture provides a complete content management system while maintaining your existing public website functionality.