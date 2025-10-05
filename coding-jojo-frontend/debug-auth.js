// Emergency Debug and Fix Script for Authentication Issues
// Run this in your browser console while logged in

function debugAndFixAuth() {
  console.log("🔍 AUTHENTICATION DEBUG REPORT");
  console.log("================================");
  
  // Check current localStorage state
  const localToken = localStorage.getItem("auth_token");
  const sessionToken = sessionStorage.getItem("auth_token");
  const localUser = localStorage.getItem("user");
  const sessionUser = sessionStorage.getItem("user");
  
  console.log("📦 Storage Contents:");
  console.log("LocalStorage token:", {
    value: localToken,
    type: typeof localToken,
    isUndefined: localToken === "undefined",
    isNull: localToken === "null",
    preview: localToken && localToken !== "undefined" && localToken !== "null" ? `${localToken.substring(0, 15)}...` : "INVALID/MISSING"
  });
  
  console.log("SessionStorage token:", {
    value: sessionToken,
    type: typeof sessionToken,
    isUndefined: sessionToken === "undefined",
    isNull: sessionToken === "null",
    preview: sessionToken && sessionToken !== "undefined" && sessionToken !== "null" ? `${sessionToken.substring(0, 15)}...` : "INVALID/MISSING"
  });
  
  console.log("LocalStorage user:", {
    hasValue: !!localUser,
    isValid: localUser && localUser !== "undefined" && localUser !== "null"
  });
  
  if (localUser && localUser !== "undefined" && localUser !== "null") {
    try {
      const user = JSON.parse(localUser);
      console.log("User data:", {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      });
    } catch (e) {
      console.error("Failed to parse user data:", e);
    }
  }
  
  // Check if the main issue is undefined token
  const hasInvalidToken = localToken === "undefined" || sessionToken === "undefined";
  
  if (hasInvalidToken) {
    console.log("🚨 ISSUE DETECTED: Token stored as 'undefined' string");
    console.log("📝 RECOMMENDATIONS:");
    console.log("1. Clear storage and re-login");
    console.log("2. Or try the emergency fix below");
    
    // Check if user has a valid session on the server
    if (localUser && localUser !== "undefined") {
      console.log("💡 Attempting emergency token recovery...");
      
      // Try to get a fresh token from the server
      fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          console.log("✅ Server session is still valid");
          console.log("🔧 Try logging out and back in to refresh token");
        } else {
          console.log("❌ Server session expired, full re-login required");
        }
      })
      .catch(error => {
        console.log("❌ Cannot reach server:", error);
      });
    }
  } else if (localToken && localToken !== "undefined" && localToken !== "null") {
    console.log("✅ Token appears to be valid");
    console.log("🔍 The issue might be elsewhere - check network requests");
  } else {
    console.log("❓ No token found - user needs to log in");
  }
  
  console.log("\n🛠️ EMERGENCY FIXES:");
  console.log("Run one of these commands in console:");
  console.log("1. clearAndReload() - Clear storage and reload");
  console.log("2. testTokenRequest() - Test if current token works");
}

function clearAndReload() {
  console.log("🧹 Clearing all auth data...");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("auth_token");
  sessionStorage.removeItem("user");
  console.log("🔄 Reloading page...");
  window.location.reload();
}

function testTokenRequest() {
  const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
  
  if (!token || token === "undefined" || token === "null") {
    console.log("❌ No valid token to test");
    return;
  }
  
  console.log("🧪 Testing token with server...");
  fetch('http://localhost:5000/api/auth/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(`Response status: ${response.status}`);
    if (response.ok) {
      console.log("✅ Token is valid!");
      return response.json();
    } else {
      console.log("❌ Token is invalid or expired");
      throw new Error(`HTTP ${response.status}`);
    }
  })
  .then(data => {
    console.log("👤 User data from server:", data);
  })
  .catch(error => {
    console.log("❌ Token test failed:", error);
  });
}

// Auto-run the debug function
debugAndFixAuth();

// Make functions globally available
window.debugAndFixAuth = debugAndFixAuth;
window.clearAndReload = clearAndReload;
window.testTokenRequest = testTokenRequest;

console.log("\n🎯 DEBUG FUNCTIONS LOADED:");
console.log("- debugAndFixAuth() - Run full diagnostic");
console.log("- clearAndReload() - Clear storage and reload");
console.log("- testTokenRequest() - Test current token");
