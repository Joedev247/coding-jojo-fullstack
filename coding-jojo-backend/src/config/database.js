const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('📡 This may take 10-20 seconds for cloud databases...');
    
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo';
    
    // Show connection progress
    const connectionTimeout = setTimeout(() => {
      console.log('⏳ Still connecting... MongoDB Atlas can be slow on first connection');
    }, 5000);

    // Enhanced connection options for better reliability
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
      connectTimeoutMS: 30000, // Increase to 30 seconds for initial connection
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: true, // Enable buffering to prevent immediate failures
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 2, // Maintain a minimum of 2 socket connections
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      retryWrites: true,
      w: 'majority',
      heartbeatFrequencyMS: 10000, // Send a ping to server every 10 seconds
      maxStalenessSeconds: 90, // Max time before considering a replica set member stale
    };

    const startTime = Date.now();
    const conn = await mongoose.connect(mongoURI, options);
    const connectionTime = Date.now() - startTime;
    
    clearTimeout(connectionTimeout);

    console.log(`✅ MongoDB Connected Successfully in ${connectionTime}ms`);
    console.log(`🏠 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔌 Connection State: ${mongoose.connection.readyState}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔒 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Provide more specific error information
    if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('🌐 Network Error: Check your internet connection and MongoDB Atlas settings');
    } else if (error.message.includes('Authentication failed')) {
      console.log('🔐 Authentication Error: Check your MongoDB credentials');
    } else if (error.message.includes('timeout')) {
      console.log('⏱️ Timeout Error: MongoDB took too long to respond (>30 seconds)');
      console.log('💡 This often happens with slow internet or MongoDB Atlas cold starts');
      console.log('🔄 The server will continue to attempt connection in the background...');
    }
    
    console.log('⚠️ Continuing without database connection...');
    console.log('💡 To fix this:');
    console.log('   1. Check your internet connection speed');
    console.log('   2. Verify MongoDB Atlas cluster is running (not paused)');
    console.log('   3. Check your IP is whitelisted in MongoDB Atlas');
    console.log('   4. Try restarting the server in a few minutes');
  }
};

// Add a function to check connection status
const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Add a function to get connection info
const getConnectionInfo = () => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  return {
    state: states[mongoose.connection.readyState],
    host: mongoose.connection.host,
    name: mongoose.connection.name,
    port: mongoose.connection.port
  };
};

// Add automatic retry mechanism
const retryConnection = async (retries = 3, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    if (isConnected()) {
      console.log('✅ Database connection already established');
      return true;
    }
    
    console.log(`🔄 Attempting database reconnection (attempt ${i + 1}/${retries})...`);
    
    try {
      await connectDB();
      if (isConnected()) {
        console.log('✅ Database reconnection successful');
        return true;
      }
    } catch (error) {
      console.log(`❌ Reconnection attempt ${i + 1} failed:`, error.message);
    }
    
    if (i < retries - 1) {
      console.log(`⏳ Waiting ${delay / 1000} seconds before next attempt...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  console.log('❌ All reconnection attempts failed');
  return false;
};

module.exports = { connectDB, isConnected, getConnectionInfo, retryConnection };
