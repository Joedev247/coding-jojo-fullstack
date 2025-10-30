# Coding JoJo Backend - Deployment & Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 5.0+
- Redis 6.0+
- Docker & Docker Compose (optional)

### Development Setup

1. **Clone and Install**
```bash
git clone <repository-url>
cd coding-jojo-backend
npm install
```

2. **Environment Configuration**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start Services**
```bash
# Option 1: Docker Compose (Recommended)
docker-compose up -d

# Option 2: Manual setup
# Start MongoDB, Redis, and Elasticsearch manually
npm run dev
```

4. **Initialize Database**
```bash
# If using manual setup
npm run seed
npm run create-admin
```

## 🏗️ Architecture Overview

### Core Services
- **Express.js** - REST API server
- **MongoDB** - Primary database with Mongoose ODM
- **Redis** - Caching and session storage
- **Socket.IO** - Real-time communication
- **Elasticsearch** - Advanced search (optional, falls back to MongoDB)

### Advanced Features
- **File Storage**: Cloudinary + AWS S3 support
- **Payments**: Stripe + African Mobile Money (Orange, MTN, Flutterwave, Airtel)
- **Email**: Nodemailer with template support and queue processing
- **Analytics**: Comprehensive user and course analytics
- **Caching**: Multi-layer caching with Redis
- **Search**: Full-text search with Elasticsearch fallback
- **Video Processing**: FFmpeg integration for video optimization

## 📁 Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middleware/       # Express middleware
├── models/           # Mongoose models
├── routes/           # API routes
├── services/         # Business logic services
│   ├── analyticsService.js    # User/course analytics
│   ├── cacheService.js        # Redis caching
│   ├── emailService.js        # Email with templates
│   ├── fileStorageService.js  # File upload/storage
│   ├── mobileMoneyService.js  # African payments
│   ├── searchService.js       # Elasticsearch integration
│   └── videoService.js        # Video processing
└── socket.js         # Socket.IO real-time server

scripts/
├── backup.js         # Database backup utility
├── healthCheck.js    # System health monitoring
├── resetCache.js     # Cache management
└── mongo-init.js     # MongoDB initialization
```

## 🔧 Configuration

### Essential Environment Variables

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/coding-jojo
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-session-secret

# File Storage (choose one or both)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=your-bucket-name

# Email Service
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Providers
STRIPE_SECRET_KEY=sk_test_...
ORANGE_MONEY_API_KEY=your-orange-key
MTN_MOMO_SUBSCRIPTION_KEY=your-mtn-key
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-...
```

## 🚢 Deployment Options

### Docker Compose (Recommended)

```bash
# Production deployment
docker-compose -f docker-compose.yml up -d

# Development with tools
docker-compose --profile development up -d

# View logs
docker-compose logs -f backend

# Scale services
docker-compose up -d --scale backend=3
```

### Manual Deployment

1. **Build & Install**
```bash
npm ci --production
npm run build  # If you have a build step
```

2. **Start with PM2**
```bash
npm install -g pm2
pm2 start server.js --name "coding-jojo-backend"
pm2 startup
pm2 save
```

3. **Nginx Setup**
```bash
# Copy nginx configuration
sudo cp nginx/nginx.conf /etc/nginx/sites-available/coding-jojo
sudo ln -s /etc/nginx/sites-available/coding-jojo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔍 Monitoring & Maintenance

### Health Checks
```bash
# Quick health check
npm run health-check

# Check specific services
curl https://codingjojo-backend.onrender.com/api/health

# Docker health status
docker-compose ps
```

### Cache Management
```bash
# Clear all cache
npm run reset-cache

# Clear specific patterns
node scripts/resetCache.js clear users
node scripts/resetCache.js analyze

# Cache statistics
node scripts/resetCache.js stats
```

### Database Backups
```bash
# Manual backup
npm run backup

# Automated backup (via cron)
# Add to crontab: 0 2 * * * cd /path/to/app && npm run backup
```

### Log Management
```bash
# View application logs
tail -f logs/app.log

# View error logs
tail -f logs/error.log

# Docker logs
docker-compose logs -f backend redis mongo
```

## 🧪 Testing & Development

### Running Tests
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Development Tools
```bash
# Start development server
npm run dev

# Access MongoDB admin (Docker)
# http://localhost:8081 (mongo-express)

# Access Redis admin (Docker)
# http://localhost:8082 (redis-commander)
```

## 📊 Performance Optimization

### Caching Strategy
- **Redis**: Session storage, rate limiting, temporary data
- **MongoDB**: Query result caching
- **Nginx**: Static file caching, response compression

### Database Optimization
- Proper indexing on frequently queried fields
- Connection pooling with Mongoose
- Query optimization and aggregation pipelines

### File Storage
- CDN integration for global content delivery
- Image optimization and resizing
- Video transcoding for multiple quality levels

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Secure password hashing with bcrypt

### API Security
- Rate limiting per endpoint
- Request validation and sanitization
- CORS configuration
- Helmet.js security headers

### Data Protection
- MongoDB sanitization
- XSS protection
- Input validation with Joi

## 🌍 African Market Features

### Mobile Money Integration
- **Orange Money** (Cameroon, Ivory Coast, Senegal, Mali, Burkina Faso, Niger)
- **MTN Mobile Money** (Cameroon, Ghana, Uganda, Zambia, Rwanda)
- **Flutterwave** (Nigeria, Ghana, Kenya, Uganda, South Africa, Tanzania, Rwanda)
- **Airtel Money** (Nigeria, Ghana, Kenya, Uganda, Tanzania, Zambia, Malawi)

### Localization
- Multi-currency support (XAF, NGN, GHS, KES, UGX, ZAR)
- Timezone handling for different African regions
- Language support (English, French)

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Issues**
```bash
# Check connection
node -e "console.log(process.env.MONGODB_URI)"
mongosh "your-connection-string"
```

**Redis Connection Issues**
```bash
# Check Redis
redis-cli ping
redis-cli -u "your-redis-url" ping
```

**Port Conflicts**
```bash
# Check what's running on port 5000
lsof -i :5000
netstat -tulpn | grep :5000
```

**Memory Issues**
```bash
# Check memory usage
free -h
docker stats

# Increase Node.js memory limit
node --max-old-space-size=4096 server.js
```

### Performance Issues
- Check slow MongoDB queries: `db.setProfilingLevel(2)`
- Monitor Redis memory: `redis-cli info memory`
- Check file descriptor limits: `ulimit -n`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### Course Endpoints
- `GET /api/courses` - List courses with filtering
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Payment Endpoints
- `POST /api/payments/initialize` - Initialize payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/methods` - Get payment methods

### Search & Analytics
- `GET /api/search/courses` - Search courses
- `GET /api/analytics/dashboard` - Dashboard analytics
- `GET /api/cache/stats` - Cache statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@codingjojo.com or create an issue in the repository.

---

**Built with ❤️ for African developers by the Coding JoJo Team**
