# Coding JoJo Backend API v2.0

A modern, clean backend API for the Coding JoJo online education platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role management
- **Course Management**: Complete CRUD operations for courses
- **User Management**: Profile management, subscriptions, notifications
- **Payment Integration**: Stripe integration for course purchases and subscriptions
- **Community Features**: Posts, categories, members, and popular tags
- **Admin Dashboard**: Administrative endpoints for platform management
- **Security**: Rate limiting, input sanitization, CORS protection
- **Database**: MongoDB with Mongoose ODM
- **Development Ready**: Works with or without database connection

## 📁 Project Structure

```
src/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User management
│   ├── courseController.js  # Course operations
│   ├── dashboardController.js # Dashboard data
│   ├── paymentController.js # Payment processing
│   ├── adminController.js   # Admin operations
│   └── communityController.js # Community features
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── errorHandler.js     # Global error handling
├── models/
│   ├── User.js             # User schema
│   ├── Course.js           # Course schema
│   └── Community.js        # Community models
├── routes/
│   ├── auth.js             # Auth routes
│   ├── users.js            # User routes
│   ├── courses.js          # Course routes
│   ├── dashboard.js        # Dashboard routes
│   ├── payments.js         # Payment routes
│   ├── admin.js            # Admin routes
│   └── community.js        # Community routes
└── utils/                  # Utility functions
```

## 🛠 Installation

1. **Navigate to backend directory**
   ```bash
   cd coding-jojo-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The server will start on https://codingjojo-backend.onrender.com


## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upgrade-premium` - Upgrade to premium
- `GET /api/users/courses` - Get enrolled courses
- `GET /api/users/notifications` - Get notifications

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/categories` - Get course categories

### Dashboard
- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/analytics` - Get learning analytics

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Get purchase history
- `POST /api/payments/subscribe` - Create subscription

### Admin (Admin only)
- `GET /api/admin/stats` - Get admin statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/courses` - Get all courses

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Mock Users (for development)
- **Student**: Any email with any password
- **Admin**: admin@codingjojo.com with any password

## 🏗 Development Mode

The backend is designed to work seamlessly with or without a database connection:

- **With Database**: Full functionality with MongoDB
- **Without Database**: Uses mock data for development
- **Frontend Integration**: CORS configured for https://codingjojo.vercel.app

## 🤝 Frontend Integration

This backend is specifically designed to work with the Coding JoJo Next.js frontend:
- CORS configured for frontend domain
- API responses match frontend data expectations
- Authentication flow compatible with frontend auth context
- Mock data structure matches frontend components

## 📈 Features Included

✅ User authentication and authorization  
✅ Course management and enrollment  
✅ Payment processing (Stripe ready)  
✅ Admin dashboard functionality  
✅ User profiles and preferences  
✅ Dashboard analytics  
✅ Notification system  
✅ Community features (posts, categories, members, tags)  
✅ Security middleware  
✅ Error handling  
✅ Development-friendly (works without DB)

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   npm run dev
   ```

3. **Test the API**
   - Visit https://codingjojo-backend.onrender.com
/health
   - Register a new user: POST https://codingjojo-backend.onrender.com
/api/auth/register
   - Login: POST https://codingjojo-backend.onrender.com
/api/auth/login

## 💻 Perfect for Frontend Development

This backend is ready to work with your frontend immediately:
- No database setup required
- Realistic mock data
- All endpoints functional
- CORS configured for localhost:3000
- Community features with mock posts, categories, and members

## 📚 API Documentation

- **Community API**: See [COMMUNITY-API-DOCS.md](./COMMUNITY-API-DOCS.md) for detailed community endpoints
- **Main API**: All auth, user, course, payment, and admin endpoints are functional

Start your frontend and begin building! 🎉
