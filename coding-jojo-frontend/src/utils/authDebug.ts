// Debug utilities for authentication issues
export const debugAuthState = () => {
  if (typeof window === "undefined") {
    console.log("Auth Debug: Running on server-side, no localStorage available");
    return;
  }

  console.log("=== AUTH DEBUG STATE ===");
  
  const localToken = localStorage.getItem("auth_token");
  const sessionToken = sessionStorage.getItem("auth_token");
  const localUser = localStorage.getItem("user");
  const sessionUser = sessionStorage.getItem("user");
  
  console.log("LocalStorage token:", {
    value: localToken,
    type: typeof localToken,
    isUndefined: localToken === "undefined",
    isNull: localToken === "null",
    isEmpty: !localToken,
    preview: localToken ? `${localToken.substring(0, 10)}...` : "NO TOKEN"
  });
  
  console.log("SessionStorage token:", {
    value: sessionToken,
    type: typeof sessionToken,
    isUndefined: sessionToken === "undefined",
    isNull: sessionToken === "null",
    isEmpty: !sessionToken,
    preview: sessionToken ? `${sessionToken.substring(0, 10)}...` : "NO TOKEN"
  });
  
  console.log("LocalStorage user:", {
    hasValue: !!localUser,
    type: typeof localUser,
    isValid: localUser && localUser !== "undefined" && localUser !== "null"
  });
  
  console.log("SessionStorage user:", {
    hasValue: !!sessionUser,
    type: typeof sessionUser,
    isValid: sessionUser && sessionUser !== "undefined" && sessionUser !== "null"
  });
  
  // Try to parse user data
  if (localUser && localUser !== "undefined" && localUser !== "null") {
    try {
      const parsedUser = JSON.parse(localUser);
      console.log("Parsed user data:", {
        id: parsedUser._id,
        email: parsedUser.email,
        name: parsedUser.name
      });
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }
  
  console.log("========================");
};

export const fixAuthStorage = (token: string) => {
  if (typeof window === "undefined") {
    console.log("Fix Auth: Cannot fix on server-side");
    return false;
  }
  
  if (!token || token === "undefined" || token === "null") {
    console.error("Fix Auth: Invalid token provided");
    return false;
  }
  
  try {
    console.log("Fix Auth: Storing token:", `${token.substring(0, 10)}...`);
    localStorage.setItem("auth_token", token);
    sessionStorage.setItem("auth_token", token);
    
    // Verify storage
    const storedLocal = localStorage.getItem("auth_token");
    const storedSession = sessionStorage.getItem("auth_token");
    
    const success = storedLocal === token && storedSession === token;
    console.log("Fix Auth: Storage result:", { success, storedLocal: !!storedLocal, storedSession: !!storedSession });
    
    return success;
  } catch (error) {
    console.error("Fix Auth: Storage failed:", error);
    return false;
  }
};

export const clearAuthStorage = () => {
  if (typeof window === "undefined") {
    console.log("Clear Auth: Cannot clear on server-side");
    return;
  }
  
  console.log("Clear Auth: Removing all auth data");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("auth_token");
  sessionStorage.removeItem("user");
  
  console.log("Clear Auth: Storage cleared");
};
