const axios = require("axios");

async function testForgotPassword() {
  try {
    console.log("🔄 Testing forgot password API...");

    // Test with a regular user email (change this to an actual email in your database)
    const testEmail = "test@example.com";

    const response = await axios.post(
      "http://localhost:5000
/api/auth/forgot-password",
      {
        email: testEmail,
      }
    );

    console.log("✅ API Response:", response.data);
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    console.error("Status:", error.response?.status);
    console.error("Headers:", error.response?.headers);
  }
}

testForgotPassword();
