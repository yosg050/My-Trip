import React, { useState, useEffect } from "react";
import { Navbar, Container, Button, Image, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Gear, BoxArrowRight, InfoCircle } from "react-bootstrap-icons";
import logoImage from "../assets/logo.jpg";
import Settings from "../components/Settings";
import { useAuth } from "../connections/AuthContext";
import { doc, getDoc } from "firebase/firestore"; // ייבוא הפונקציות הנדרשות
import { db } from "../../firebaseConfig";
import UserTestAndExit from "../connections/UserTest&Exit";
import Info from "../components/Info";
import { useUserProfile } from "../connections/GetUserDate";

const CustomNavbar = ({ titleData }) => {
  const [showSettings, setShowSettings] = useState(false);
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const { userData: userProfileData, loading, error } = useUserProfile(); // נתוני המשתמש

  useEffect(() => {
    if (userProfileData) {
      setProfileData(userProfileData); // הגדרת נתוני המשתמש
    }
  }, [userProfileData]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <>
      <Navbar
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid #dee2e6",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <div className="d-flex border p-2 rounded-3 shadow-sm mx-4">
              <Image
                src={
                  profileData?.photoURL ||
                  user?.photoURL ||
                  "https://via.placeholder.com/50"
                }
                roundedCircle
                width="50"
                height="50"
                className="me-3"
              />

              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  direction: "rtl",
                }}
              >
                <div
                  style={{
                    marginLeft: "0.5em",
                    fontWeight: "bold",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  שלום,
                </div>
                {profileData?.lastName && profileData.firstName ? (
                  <span
                    style={{
                      fontWeight: "bold",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    {`${profileData.firstName} ${profileData.lastName}`}
                  </span>
                ) : (
                  <span
                    style={{
                      fontWeight: "bold",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    {profileData?.displayName || user?.email}
                  </span>
                )}
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ textAlign: "center" }}>
            <Dropdown.Item>
              <UserTestAndExit />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setShowSettings(true)}
              className="mb-1"
            >
              <Gear className="me-2" /> הגדרות
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setShowInfo(true)}>
              <InfoCircle className="me-2" /> מידע
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div>
          <h2
            style={{
              margin: "0",
              fontWeight: "bold",
              fontSize: "2rem",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              textAlign: "center",
            }}
          >
            My-Trip
       
          </h2>
          <h2
            style={{
              margin: "0",
              fontWeight: "bold",
              fontSize: "1.5rem",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              textAlign: "center",
            }}
          >
      {titleData}
          </h2>
        </div>

        <div>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logoImage}
              width="90"
              height="90"
              className="d-inline-block align-top r-2 rounded"
              alt="MyTrip Logo"
              style={{
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            />
          </Navbar.Brand>
        </div>
      </Navbar>
      <div style={{ height: "1px", backgroundColor: "#e0e0e0" }}></div>

      <Settings
        show={showSettings}
        handleClose={() => setShowSettings(false)}
      />
      <Info show={showInfo} handleClose={() => setShowInfo(false)} />
    </>
  );
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ display: "flex", cursor: "pointer" }}
  >
    {children}
  </div>
));

export default CustomNavbar;
