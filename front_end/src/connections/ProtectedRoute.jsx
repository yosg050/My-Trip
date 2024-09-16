import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Spinner from 'react-bootstrap/Spinner';


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return   <Spinner animation="border" variant="success" />
    ;
  }

  if (!user) {
    return <Navigate to="/SignIn" />;
  } 

  return children;
};

export default ProtectedRoute;





