import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Navigate, useNavigate } from "react-router-dom";
import { BoxArrowLeft, Gear } from "react-bootstrap-icons";
import { Button, Dropdown } from "react-bootstrap";
import Settings from "../components/Settings";

const UserTestAndExit = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (!loading && !user) {
      Navigate("/SignIn");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/SignIn");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user && (
        // <Button variant="danger" className="me-2" onClick={handleSignOut}>
        //   <BoxArrowLeft strokeWidth={3} width={24} height={24} />
        // </Button>
        <Dropdown.Item as="button" onClick={handleSignOut}>
          <BoxArrowLeft className="me-2" /> יציאה
        </Dropdown.Item>
      )}
    </div>
  );
};

export default UserTestAndExit;
