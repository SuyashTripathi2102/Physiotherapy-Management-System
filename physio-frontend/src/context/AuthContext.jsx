// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  const login = (userData, tokenData, roleData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
    localStorage.setItem("role", roleData);
    setUser(userData);
    setToken(tokenData);
    setRole(roleData);
  };

  const logout = (message = "Logout successful!") => {
    console.log("Logout called with message:", message); // Debugging line
    if (message === "Session expired. Logging out..." || message === "Invalid session. Logging out...") {
      toast.error(message, { autoClose: 3000 }); // Show error message for session expiration or invalid token
    } else {
      toast.success(message, { autoClose: 3000 }); // Show success message for manual logout
    }
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    setToken(null);
    setRole(null);
    navigate("/users/login");
  };
  
  // Auto logout on token expiry
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiryTime = decoded.exp * 1000; // convert to ms
        const timeLeft = expiryTime - Date.now();

        if (timeLeft <= 0) {
          logout("Session expired. Logging out...");
        } else {
          const timeout = setTimeout(() => {
            logout("Session expired. Logging out...");
          }, timeLeft);

          return () => clearTimeout(timeout);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        logout("Invalid session. Logging out...");
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
