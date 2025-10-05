// Quick test to check backend login endpoint
const fetch = require('node-fetch');

const testLogin = async () => {
  try {
    console.log("🧪 Testing backend login endpoint...");
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'newdev123@gmail.com',
        password: 'yourpassword' // Replace with actual password
      })
    });
    
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);
    
    const data = await response.json();
    console.log("Raw response data:", JSON.stringify(data, null, 2));
    
    if (data.token) {
      console.log("Token details:", {
        type: typeof data.token,
        length: data.token.length,
        isUndefinedString: data.token === "undefined",
        value: data.token
      });
    }
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log("🚨 Backend server is not running on port 5000");
    }
  }
};

testLogin();
