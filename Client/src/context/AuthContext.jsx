// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axios.js';

// Create the context
const AuthContext = createContext(null);

// Authentication Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set up axios interceptor for auth headers
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Handle 401 unauthorized errors
        if (error.response?.status === 401) {
          // Clear user data and token
          setCurrentUser(null);
          setToken(null);
          localStorage.removeItem('token');
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors when component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/auth/me');
        if (response.data.status) {
          setCurrentUser(response.data.admin);
        } else {
          // Invalid token, clear it
          localStorage.removeItem('token');
          setToken(null);
        }
      } catch (error) {
        // Clear token on error
        localStorage.removeItem('token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, [token]);

  // Login function
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/auth/admin-login', { username, password });
      
      if (response.data.status) {
        // Extract token from cookies or response
        const authToken = response.data.token; // If token is included in response
        
        if (authToken) {
          localStorage.setItem('token', authToken);
          setToken(authToken);
        }
        
        setCurrentUser(response.data.admin);
        return {
          success: true,
          message: "Login successful"
        };
      } else {
        return {
          success: false,
          message: response.data.msg || "Login failed"
        };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'An error occurred during login';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state regardless of server response
      localStorage.removeItem('token');
      setToken(null);
      setCurrentUser(null);
      setLoading(false);
    }
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    return currentUser?.role === role;
  };

  // Value to be provided by the context
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    error,
    login,
    logout,
    hasRole,
    isAdmin: currentUser?.role === 'admin',
    isMaster: currentUser?.role === 'master',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};