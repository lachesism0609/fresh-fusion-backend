# Fresh Fusion Backend
Course: TTC8430-3005 Web server programming with an application framework  
Date: December 2024

- **Group**: Sushi Lover
- **Members**: 
  - Jiahui Pan (AE8278)
  - Tingting Huang (AE8277)

## Project Overview
Backend services for Fresh Fusion sushi restaurant web application, providing APIs for menu management, order processing, and user authentication.

## Source Code
The complete source code is available on GitHub:
- Repository: [Fresh-Fusion-Backend](https://gitlab.labranet.jamk.fi/AE8278/sushi-lover/-/tree/main/fresh-fusion-backend)
- Frontend website: [Fresh Fusion](https://ae8278.pages.labranet.jamk.fi/sushi-lover)
- Branch: main
- Access: Public

## Application Structure
fresh-fusion-backend/   
│  
├── __tests__/          # Test directories  
│   ├── api/            # API tests  
│   │   └── menu.test.js  
│   ├── integration/    # Integration tests  
│   │   └── database.test.js  
│   └── security/       # Security tests  
│       └── auth.test.js  
│  
├── app.js             # Main application entry point  
├── server.js          # Server configuration  
├── package.json       # Project dependencies  
├── README.md         # Project documentation  
├── jest.config.js    # Jest test configuration  
├── jest.setup.js     # Jest setup file  
├── load-test.js      # Load testing script  
│  
├── controllers/      # Business logic  
│   ├── authController.js  # Authentication logic  
│   ├── menuController.js  # Menu management  
│   └── orderController.js # Order processing  
│  
├── middleware/       # Custom middleware  
│   └── authMiddleware.js  # Authentication middleware  
│  
├── models/          # Database schemas  
│   ├── MenuItem.js   # Menu item model  
│   ├── Order.js      # Order model  
│   └── User.js       # User model  
│  
├── routes/          # API routes  
│   ├── auth.js       # Authentication routes  
│   ├── menu.js       # Menu routes  
│   └── orders.js     # Order routes  
│  
├── seeds/           # Database seeders  
│   └── seedMenu.js   # Menu items seeder  
│  
└── utils/           # Utility functions  
    └── config.js     # Configuration settings  

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

## API Endpoints Implementation
1. **Menu Management**
   - GET /api/menu - Retrieve menu items with filters (search, category, price range, dietary)
   - GET /api/menu/category/:category - Get items by category
   - POST /api/menu/createMenu - Add new menu item (admin)
   - PUT /api/menu/updateMenu/:id - Update menu item (admin)
   - PATCH /api/menu/stock/:id - Update stock level (admin)
   - DELETE /api/menu/deleteMenu/:id - Delete menu item (admin)
   - GET /api/menu/check-stock/:id - Check item stock availability

2. **User Authentication**
   - POST /api/auth/register - User registration
   - POST /api/auth/login - User authentication
   - GET /api/auth/profile - Get user profile

3. **Order System**
   - POST /api/orders - Create new order with stock verification
   - GET /api/orders/my-orders - Get user's orders
   - GET /api/orders/all - Get all orders (admin)
   - PATCH /api/orders/:orderId/status - Update order status (admin)

## Database Schema Implementation
1. **Menu Items**
   - title: String
   - category: String
   - price: Number
   - description: String
   - imageUrl: String
   - dietaryFlags: [String]
   - stock: Number
   - ingredients: [String]
   - popularity: Number
   - isSpecial: Boolean
   - createdAt: Date

2. **Users**
   - name: String
   - email: String (unique)
   - username: String (unique)
   - password: String (hashed)
   - role: String (user/admin)
   - createdAt: Date

3. **Orders**
   - userId: Reference
   - items: [{menuItemId, quantity, price}]
   - totalPrice: Number
   - status: String (enum)
   - deliveryAddress: String
   - contactNumber: String
   - timestamps: true

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

## Time Tracking
- **Tingting Huang (40 hours)**:
  - API development (15h)
  - Database implementation (10h)
  - Authentication system (15h)

- **Jiahui Pan (40 hours)**:
  - Order management system (15h)
  - Testing and Documentation (10h)
  - Render deployment and CI/CD setup (15h)

## Development Achievements
1. **Core Features**
   - Implemented comprehensive menu management system
   - Built secure user authentication with JWT
   - Created order processing with stock management
   - Added admin-specific functionalities

2. **Advanced Features**
   - Stock tracking and validation
   - Menu filtering and search
   - Pagination support
   - Role-based access control

3. **Security Features**
   - JWT authentication
   - Password hashing
   - Admin middleware protection
   - Input validation

## Self-Assessment
Grade Proposition: 4/5

**Successes:**
- Successfully implemented all core requirements
- Created a robust authentication system
- Achieved efficient database operations
- Deployed with production-grade security

**Areas for Improvement:**

- Could add more automated tests
- Real-time notifications could be implemented
- Cache system could be optimized