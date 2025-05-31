// src/components/ProtectedRoute.js
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Base protected route that requires authentication
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    // Redirect to login and save the location they were trying to access
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return <Outlet />;
};

// Route that requires admin role
export const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <Outlet />;
};

// Route that requires master role
export const MasterRoute = () => {
  const { isAuthenticated, isMaster, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  if (!isMaster) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <Outlet />;
};