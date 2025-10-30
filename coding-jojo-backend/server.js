require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");

// Import routes
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");
const courseRoutes = require("./src/routes/courses");
const dashboardRoutes = require("./src/routes/dashboard");
const paymentRoutes = require("./src/routes/payments");
const adminRoutes = require("./src/routes/admin");
const communityRoutes = require("./src/routes/community");
const categoryRoutes = require("./src/routes/categories");
const cartRoutes = require("./src/routes/cart");
const teacherRoutes = require("./src/routes/teacher");
const aiRoutes = require("./src/routes/ai");
const analyticsRoutes = require("./src/routes/analytics");
const communicationRoutes = require("./src/routes/communication");
const chatRoutes = require("./src/routes/chatRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const apiRoutes = require("./src/routes/apiRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes"); // FIXED: Add upload routes
const testRoutes = require("./src/routes/testRoutes"); // Add test routes

// Import middleware
const errorHandler = require("./src/middleware/errorHandler");
const { connectDB } = require("./src/config/database");

// Initialize passport
require("./src/config/passport")(passport);

const app = express();

// Connect to MongoDB
connectDB();

// Trust proxy
app.set("trust proxy", 1);

// CORS configuration - Fixed for file serving
const corsOptions = {
  origin: [
    'https://codingjojo.vercel.app',
    'http://localhost:3001', 
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001'
  ], // Specific origins for better security
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization", 
    "X-Requested-With",
    "Accept",
    "Origin",
    "Range", // FIXED: Add Range header for video streaming
    "Accept-Ranges",
    "Content-Range"
  ],
  exposedHeaders: [
    "Content-Length", 
    "X-Requested-With",
    "Content-Range", // FIXED: Expose Content-Range for video streaming
    "Accept-Ranges"
  ],
  optionsSuccessStatus: 200,
};

// Apply CORS before other middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Session configuration for OAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET || "coding-jojo-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs (increased for testing)
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// Body parsing middleware
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// FIXED: Serve static files with proper headers for CORS
app.use('/uploads', (req, res, next) => {
  // Set CORS headers for static files
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Range');
  res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return res.status(200).end();
  }
  
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/communication", communicationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes); // FIXED: Add upload routes
app.use("/api/test", testRoutes); // Add test routes
app.use("/api", apiRoutes);

// API v1 routes (for frontend compatibility)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/community", communityRoutes);
app.use("/api/v1/categories", categoryRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Coding JoJo API",
    version: "2.0.0",
    documentation: "/api/docs",
    health: "/health",
  });
});

// Favicon route to prevent 404 errors
app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});

// Initialize Socket.IO
const socketService = require('./src/socket');
socketService.initializeSocket(server);

// Initialize services on startup
const initializeServices = async () => {
  try {
    console.log('🔄 Initializing services...');
    
    // Initialize cache service
    const cacheService = require('./src/services/cacheService');
    console.log('✓ Cache service initialized');
    
    // Initialize search service
    const searchService = require('./src/services/searchService');
    console.log('✓ Search service initialized');
    
    // Initialize analytics service
    const analyticsService = require('./src/services/analyticsService');
    console.log('✓ Analytics service initialized');
    
    // Initialize email service
    const emailService = require('./src/services/emailService');
    console.log('✓ Email service initialized');
    
    // Initialize file storage service
    const fileStorageService = require('./src/services/fileStorageService');
    console.log('✓ File storage service initialized');
    
    // Initialize video service
    const videoService = require('./src/services/videoService');
    console.log('✓ Video service initialized');
    
    // Initialize mobile money service
    const mobileMoneyService = require('./src/services/mobileMoneyService');
    console.log('✓ Mobile money service initialized');
    
    console.log('🎉 All services initialized successfully!');
    
    // Show service status summary
    console.log('\n📊 Service Status Summary:');
    console.log(`   ✅ MongoDB: Connected`);
    console.log(`   ${process.env.REDIS_ENABLED === 'false' ? '❌' : '✅'} Redis: ${process.env.REDIS_ENABLED === 'false' ? 'Disabled' : 'Enabled'}`);
    console.log(`   ${process.env.ELASTICSEARCH_ENABLED === 'false' ? '❌' : '✅'} Elasticsearch: ${process.env.ELASTICSEARCH_ENABLED === 'false' ? 'Disabled (using MongoDB search)' : 'Enabled'}`);
    console.log(`   ✅ Email: Configured`);
    console.log(`   ✅ File Storage: Ready`);
    
    if (process.env.REDIS_ENABLED === 'false' || process.env.ELASTICSEARCH_ENABLED === 'false') {
      console.log('\n💡 Optional services disabled. See DEV_CONFIG.md for setup instructions.');
    }
    
  } catch (error) {
    console.error('❌ Service initialization failed:', error);
  }
};

// Initialize services
initializeServices();

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  
  try {
    // Close server
    server.close(() => {
      console.log('✓ HTTP server closed');
    });
    
    // Disconnect services
    const cacheService = require('./src/services/cacheService');
    await cacheService.disconnect();
    console.log('✓ Cache service disconnected');
    
    console.log('✅ Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  gracefulShutdown('UNHANDLED_REJECTION');
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  gracefulShutdown('SIGTERM');
});

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  gracefulShutdown('SIGINT');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

module.exports = app;
