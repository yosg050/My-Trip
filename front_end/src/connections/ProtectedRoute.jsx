import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Spinner from "react-bootstrap/Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/SignIn" />;
  }

  return children;
};

export default ProtectedRoute;
