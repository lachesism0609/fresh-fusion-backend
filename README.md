# Web Services and Server Programming - Fresh Fusion Backend
- **Group**: Sushi Lover
- **Members**: 
  - Jiahui Pan (AE8278)
  - Tingting Huang (AE8277)

## Project Overview
Backend services for Fresh Fusion sushi restaurant web application, providing APIs for menu management, order processing, and user authentication.

## Technical Stack
### Backend Framework
- **Node.js** with **Express.js**
  - RESTful API architecture
  - MVC pattern implementation
  - Middleware for authentication and logging

### Database
- **MongoDB Atlas**
  - Cloud-hosted MongoDB service
  - Document-based storage for menu items
  - User authentication data
  - Order management

### Deployment
- **Render**
  - Manual deployment using Render Web Services
  - Direct code upload and build configuration
  - Environment variables management
  - SSL/TLS encryption

### Additional Technologies
- **JWT** for authentication
- **Mongoose** for database modeling
- **Bcrypt** for password hashing
- **Cors** for cross-origin resource sharing
- **Express-validator** for input validation

## API Endpoints Planning
1. **Menu Management**
   - GET /api/menu - Retrieve all menu items
   - GET /api/menu/:category - Get items by category
   - POST /api/menu - Add new menu item (admin)
   - PUT /api/menu/:id - Update menu item (admin)

2. **User Management**
   - POST /api/auth/register - User registration
   - POST /api/auth/login - User authentication
   - GET /api/user/profile - Get user profile

3. **Order System**
   - POST /api/orders - Create new order
   - GET /api/orders/:userId - Get user orders
   - PUT /api/orders/:id - Update order status

## Database Schema Design
1. **Menu Items**
   - Name
   - Category
   - Price
   - Description
   - Image URL
   - Dietary flags

2. **Users**
   - Username
   - Email
   - Password (hashed)
   - Role (customer/admin)

3. **Orders**
   - User reference
   - Items
   - Total price
   - Status
   - Timestamp

## Division of Labor
- **Tingting Huang**:
  - API development
  - Database implementation
  - Authentication system

- **Jiahui Pan**:
  - Order management system
  - Testing and Documentation
  - Render deployment and CI/CD setup

## Development Timeline
1. **Week 1: Setup & Planning**
   - Project structure setup
   - Database design
   - API documentation
   - Initial Render service configuration

2. **Week 2-3: Core Development**
   - API implementation
   - Database integration
   - Authentication system
   - Manual deployment setup on Render

3. **Week 4: Testing & Documentation**
   - API testing
   - Security testing
   - Documentation completion
   - Final production deployment and monitoring

## Testing Strategy
- Unit testing for API endpoints
- Integration testing for database operations
- Security testing for authentication
- Load testing for performance verification