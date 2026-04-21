// ProtectedRoute.jsx
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom"; // ✅ Add Navigate
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/users/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
