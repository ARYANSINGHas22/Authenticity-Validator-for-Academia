import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = () => {
    // Check for auth token in localStorage
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    // Return true if both token and user exist
    return token && user;
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;