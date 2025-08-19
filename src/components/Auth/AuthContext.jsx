import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      
      // If we're on the login page, redirect to the intended page or home
      if (location.pathname === '/login') {
        navigate('/dashboard', { replace: true });
      }
    } else {
      // Only redirect to login if not already there
      if (location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    }
    setIsInitialized(true);
  }, []);

  const login = (newToken) => {
  localStorage.setItem('authToken', newToken);
  setToken(newToken);
  setIsAuthenticated(true);
  navigate('/dashboard', { replace: true }); // Always go to dashboard after login
};

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setToken(null);
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      isAuthenticated,
      isInitialized, // Expose initialization status
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};