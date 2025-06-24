# Kebab Shop Backend API

A Node.js + Express backend with PostgreSQL for managing kebab shop menu items with JWT authentication.

## Features

- **MenuItem Model** with comprehensive pricing structure
- **JWT Authentication** for admin access
- **Protected CRUD Routes** for menu management
- **Public Menu API** for frontend consumption
- **Rate Limiting** and security middleware
- **PostgreSQL** database with Sequelize ORM

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and JWT secret
   ```

3. **Database Setup**
   - Ensure PostgreSQL is running
   - Create a database for the project
   - Update DATABASE_URL in .env

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Production Start**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login (returns JWT)
- `GET /api/auth/verify` - Verify JWT token

### Menu Items (Public)
- `GET /api/menu` - List all menu items

### Menu Items (Protected - Requires JWT)
- `POST /api/menu` - Create new menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

### Health Check
- `GET /health` - Server health status

## MenuItem Schema

```javascript
{
  id: String (UUID),
  name: String (required),
  logoEmoji: String (optional),
  description: String (optional),
  category: String (required),
  isSpecial: Boolean (default: false),
  singlePrice: Decimal (optional),
  priceSmall: Decimal (optional),
  priceMedium: Decimal (optional),
  priceLarge: Decimal (optional),
  priceXLarge: Decimal (optional),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

## Authentication

Send JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

Default admin credentials (change in production):
- Username: `admin`
- Password: `admin123`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | Required |
| JWT_SECRET | Secret key for JWT signing | Required |
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |
| ADMIN_USERNAME | Admin username | admin |
| ADMIN_PASSWORD | Admin password | admin123 |

## Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- JWT token expiration (24 hours)
- Input validation and sanitization

## Database

Uses Sequelize ORM with PostgreSQL. Database models are automatically synchronized on server start.