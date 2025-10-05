// Debug GitHub OAuth Issue
const express = require("express");
const passport = require("passport");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env.development") });

// Import passport configuration
require("./src/config/passport.js")(passport);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Enable CORS for development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend server is running!",
    timestamp: new Date().toISOString(),
    githubConfigured: !!(
      process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ),
  });
});

// GitHub OAuth routes
app.get("/api/auth/github", (req, res, next) => {
  console.log("🔍 GitHub OAuth initiated");
  console.log("Client ID:", process.env.GITHUB_CLIENT_ID);
  console.log("Callback URL:", process.env.GITHUB_CALLBACK_URL);

  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
});

app.get(
  "/api/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api/auth/oauth/failure",
  }),
  (req, res) => {
    console.log("✅ GitHub OAuth callback received");
    console.log("User:", req.user?.email);

    if (!req.user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=oauth_failed`
      );
    }

    const token = req.user.getSignedJwtToken();
    console.log("Token generated:", !!token);

    // Redirect to frontend with token
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?token=${token}&provider=github`
    );
  }
);

// OAuth failure route
app.get("/api/auth/oauth/failure", (req, res) => {
  console.log("❌ OAuth failure");
  res.redirect(
    `${process.env.FRONTEND_URL}/login?error=oauth_failed&provider=github`
  );
});

// 404 handler
app.use("*", (req, res) => {
  console.log("❌ 404 - Route not found:", req.originalUrl);
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    availableRoutes: [
      "/api/test",
      "/api/auth/github",
      "/api/auth/github/callback",
    ],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Debug server running on port ${PORT}`);
  console.log(`📱 Test backend: http://localhost:${PORT}/api/test`);
  console.log(`🔗 GitHub OAuth: http://localhost:${PORT}/api/auth/github`);
  console.log(`🔑 GitHub Client ID: ${process.env.GITHUB_CLIENT_ID}`);
  console.log(`🔄 Callback URL: ${process.env.GITHUB_CALLBACK_URL}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});
