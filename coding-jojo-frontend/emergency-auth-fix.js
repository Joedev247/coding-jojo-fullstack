// EMERGENCY AUTH FIX - Run this in your browser console
// This will help diagnose and potentially fix the undefined token issue

(function() {
  console.log("🚨 EMERGENCY AUTH FIX LOADED");
  
  // Step 1: Check current state
  function checkAuthState() {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    
    console.log("Current Auth State:", {
      token: token,
      tokenType: typeof token,
      tokenLength: token?.length,
      isUndefined: token === "undefined",
      user: user ? JSON.parse(user).email : 'NO USER'
    });
    
    return { token, user };
  }
  
  // Step 2: Try to recover from server
  async function recoverTokenFromServer() {
    console.log("🔄 Attempting token recovery from server...");
    
    try {
      // Try to get fresh token using existing session
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        console.log("✅ Server session still valid");
        const userData = await response.json();
        console.log("👤 User data from server:", userData);
        
        // If we have user data but no token, this indicates a session-based auth
        // Let's try to refresh the token
        const refreshResponse = await fetch('http://localhost:5000/api/auth/refresh-token', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (refreshResponse.ok) {
          const tokenData = await refreshResponse.json();
          console.log("🔑 Token refresh response:", tokenData);
          
          if (tokenData.token) {
            // Store the new token
            localStorage.setItem('auth_token', tokenData.token);
            sessionStorage.setItem('auth_token', tokenData.token);
            console.log("✅ New token stored successfully!");
            return tokenData.token;
          }
        }
      } else {
        console.log("❌ Server session expired or invalid");
      }
    } catch (error) {
      console.error("❌ Token recovery failed:", error);
    }
    
    return null;
  }
  
  // Step 3: Emergency login bypass (if you know credentials)
  async function emergencyLogin(email, password) {
    console.log("🚨 Emergency login attempt...");
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      console.log("Login response:", data);
      
      if (response.ok && data.token) {
        localStorage.setItem('auth_token', data.token);
        sessionStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        sessionStorage.setItem('user', JSON.stringify(data.user));
        console.log("✅ Emergency login successful!");
        window.location.reload();
        return true;
      }
    } catch (error) {
      console.error("❌ Emergency login failed:", error);
    }
    
    return false;
  }
  
  // Step 4: Clear and force re-auth
  function forceReauth() {
    console.log("🧹 Clearing all auth data...");
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');
    console.log("🔄 Redirecting to login...");
    window.location.href = '/login';
  }
  
  // Step 5: Test current token (if any)
  async function testCurrentToken() {
    const token = localStorage.getItem('auth_token');
    if (!token || token === 'undefined') {
      console.log("❌ No valid token to test");
      return false;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`Token test result: ${response.status}`);
      return response.ok;
    } catch (error) {
      console.error("Token test failed:", error);
      return false;
    }
  }
  
  // Auto-run diagnosis
  async function runDiagnosis() {
    console.log("🔍 Running automatic diagnosis...");
    
    const { token, user } = checkAuthState();
    
    if (token === 'undefined' || token === 'null' || !token) {
      console.log("🚨 PROBLEM: Invalid or missing token");
      
      if (user && user !== 'undefined') {
        console.log("💡 User data exists, attempting token recovery...");
        const recovered = await recoverTokenFromServer();
        
        if (recovered) {
          console.log("✅ Token recovered! Reloading page...");
          window.location.reload();
          return;
        }
      }
      
      console.log("❌ Token recovery failed");
      console.log("📝 RECOMMENDED ACTIONS:");
      console.log("1. Run: emergencyLogin('your_email', 'your_password')");
      console.log("2. Or run: forceReauth()");
    } else {
      console.log("🧪 Testing existing token...");
      const isValid = await testCurrentToken();
      
      if (isValid) {
        console.log("✅ Token is valid! The problem might be elsewhere.");
        console.log("Check network requests and server logs.");
      } else {
        console.log("❌ Token is invalid. Needs refresh or re-login.");
        await recoverTokenFromServer();
      }
    }
  }
  
  // Make functions available globally
  window.checkAuthState = checkAuthState;
  window.recoverTokenFromServer = recoverTokenFromServer;
  window.emergencyLogin = emergencyLogin;
  window.forceReauth = forceReauth;
  window.testCurrentToken = testCurrentToken;
  
  // Run diagnosis
  runDiagnosis();
  
  console.log("🛠️ EMERGENCY FUNCTIONS AVAILABLE:");
  console.log("- checkAuthState() - Check current state");
  console.log("- recoverTokenFromServer() - Try to get new token");
  console.log("- emergencyLogin(email, password) - Force login");
  console.log("- forceReauth() - Clear data and redirect to login");
  console.log("- testCurrentToken() - Test if current token works");
})();
