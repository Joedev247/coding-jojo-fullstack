const express = require("express");
const passport = require("passport");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env.development") });

// Import passport configuration
require("./src/config/passport.js")(passport);

const app = express();

// Test GitHub OAuth configuration
console.log("🔍 Testing GitHub OAuth Configuration...");

// Check environment variables
console.log("✅ Environment Variables:");
console.log(
  `   GITHUB_CLIENT_ID: ${
    process.env.GITHUB_CLIENT_ID ? "✅ Set" : "❌ Not set"
  }`
);
console.log(
  `   GITHUB_CLIENT_SECRET: ${
    process.env.GITHUB_CLIENT_SECRET ? "✅ Set" : "❌ Not set"
  }`
);
console.log(
  `   GITHUB_CALLBACK_URL: ${
    process.env.GITHUB_CALLBACK_URL ||
    "http://localhost:5000
/api/auth/github/callback"
  }`
);

// Check if GitHub strategy is registered
const githubStrategy = passport._strategies.github;
if (githubStrategy) {
  console.log("✅ GitHub OAuth Strategy: Registered successfully");
} else {
  console.log("❌ GitHub OAuth Strategy: Not registered");
}

// Check if required packages are installed
try {
  require("passport-github2");
  console.log("✅ passport-github2: Installed");
} catch (error) {
  console.log("❌ passport-github2: Not installed");
}

console.log("\n🎉 GitHub OAuth Setup Status:");
if (
  process.env.GITHUB_CLIENT_ID &&
  process.env.GITHUB_CLIENT_SECRET &&
  githubStrategy
) {
  console.log("✅ GitHub OAuth is properly configured and ready to use!");
  console.log("\nTo complete setup:");
  console.log(
    "1. Replace placeholder values in .env.development with your actual GitHub OAuth app credentials"
  );
  console.log("2. Start the backend server: npm start");
  console.log("3. Start the frontend server: npm run dev");
  console.log("4. Test the GitHub login button at http://localhost:3000/login");
} else {
  console.log("⚠️  GitHub OAuth needs configuration:");
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    console.log(
      "   - Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env.development"
    );
  }
  if (!githubStrategy) {
    console.log(
      "   - GitHub strategy not registered (check passport configuration)"
    );
  }
}
