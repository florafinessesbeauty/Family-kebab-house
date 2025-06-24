# Kebab Shop Admin Dashboard

A React-based admin dashboard for managing kebab shop menu items with full CRUD operations.

## Features

- **Secure Authentication** with JWT tokens
- **Menu Items Management** - Add, edit, delete menu items
- **Category Organization** - Filter and organize by categories
- **Real-time Updates** - Changes reflect immediately on public site
- **Responsive Design** - Works on desktop and mobile devices
- **Price Management** - Support for multiple pricing tiers
- **Special Items** - Mark items as specials with visual indicators

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   
   The admin dashboard will be available at http://localhost:3000

3. **Build for Production**
   ```bash
   npm run build
   ```

## Default Login Credentials

- **Username:** admin
- **Password:** admin123

*Note: Change these credentials in the backend configuration for production use.*

## Features Overview

### Dashboard
- View total items, categories, and special items
- Quick statistics overview
- Access to all management functions

### Menu Items Management
- **Add New Items** - Complete form with all pricing options
- **Edit Existing Items** - Inline editing with real-time updates
- **Delete Items** - Confirmation dialog for safety
- **Category Filtering** - Quick filter by category
- **Search and Sort** - Find items quickly

### Pricing Support
- Single price items
- Multiple size options (Small, Medium, Large, X-Large)
- Flexible pricing structure
- Visual price display in grid format

### Visual Features
- **Emoji Support** - Add visual icons to menu items
- **Special Item Badges** - Star indicators for special items
- **Category Tags** - Visual category organization
- **Responsive Cards** - Beautiful item display

## API Integration

The dashboard integrates with the backend API:

- `GET /api/menu` - Fetch all menu items
- `POST /api/menu` - Create new menu item
- `PUT /api/menu/:id` - Update existing item
- `DELETE /api/menu/:id` - Delete menu item
- `POST /api/auth/login` - Admin authentication

## File Structure

```
admin/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AddItemModal.js       # Add new item form
│   │   ├── EditItemModal.js      # Edit item form
│   │   ├── MenuItemsList.js      # Display menu items
│   │   └── ProtectedRoute.js     # Route protection
│   ├── contexts/
│   │   └── AuthContext.js        # Authentication context
│   ├── pages/
│   │   ├── Dashboard.js          # Main dashboard
│   │   └── Login.js              # Login page
│   ├── App.js                    # Main app component
│   ├── App.css                   # Global styles
│   └── index.js                  # App entry point
├── package.json
└── README.md
```

## Security Features

- JWT token authentication
- Protected routes
- Automatic token verification
- Secure API communication
- Session management

## Customization

### Adding New Categories
Edit the `commonCategories` array in the modal components:

```javascript
const commonCategories = [
  'kebabs', 'pizzas', 'burgers', 'chicken', 'sides', 'drinks', 
  'desserts', 'wraps', 'salads', 'specials', 'your-new-category'
];
```

### Styling
The app uses a custom CSS framework. Main styles are in `App.css`:

- Modify color schemes in CSS variables
- Update component styles
- Add custom animations

### Backend Configuration
Ensure the backend API is running on the expected port (default: 5000). The React app uses a proxy configuration to forward API requests.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Production Deployment

1. Build the app: `npm run build`
2. Serve the `build` folder with a web server
3. Ensure the backend API is accessible
4. Update API endpoints if necessary

## Troubleshooting

### Common Issues

1. **Login Issues**
   - Verify backend is running
   - Check credentials
   - Ensure API endpoints are accessible

2. **Menu Items Not Loading**
   - Check network tab for API errors
   - Verify authentication token
   - Ensure backend database is connected

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check for version conflicts
   - Update dependencies if needed

For more help, check the browser console for error messages.