#!/bin/bash

echo "🚀 Testing OnlineUsersBar with Real Database Users"
echo "=================================================="
echo ""

# Check if we're in the backend directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the coding-jojo-backend directory"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Make sure MongoDB connection is configured."
    echo "   Create a .env file with MONGO_URI=your_mongodb_connection_string"
    echo ""
fi

# Run the database test
echo "🧪 Running database connectivity test..."
echo ""
node test-online-users-db.js

echo ""
echo "📝 Next Steps:"
echo "1. If database is connected and users are found, your OnlineUsersBar should work!"
echo "2. Start your backend server: npm run dev"
echo "3. Start your frontend: npm run dev (in frontend directory)"
echo "4. Visit /community page to see real online users"
echo "5. Use the test page at /test-online-users to debug issues"
echo ""
echo "💡 Tips:"
echo "- Users are considered 'online' if active within last 15 minutes"
echo "- The auth middleware automatically updates user activity on API calls"
echo "- If no users are online, try logging in and making some API requests"
