import React, { useEffect, useState } from "react";
import { Image, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Gear, InfoCircle, PersonCircle } from "react-bootstrap-icons";
import UserTestAndExit from "../connections/UserTest&Exit";
import { useAuth } from "../connections/AuthContext";
import { useUserProfile } from "../connections/GetUserDate";
import Settings from "./Settings";
import Info from "./Info";
import useMobile from "./UseMobile";

const ProfileButton = () => {
  const isMobile = useMobile();
  const [showSettings, setShowSettings] = useState(false);
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  //   const [imageError, setImageError] = useState(false);

  const { userData: userProfileData } = useUserProfile();

  useEffect(() => {
    if (userProfileData) {
      setProfileData(userProfileData);
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
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip>תפריט אפשרויות</Tooltip>}
      >
        <Dropdown
        // key="start"
        // id="dropdown-button-drop-start"
        // drop="start"
        // variant="primary"
        >
          <Dropdown.Toggle as={CustomToggle}>
            {/* {renderProfileImage()} */}
            {profileData?.photoURL || user?.photoURL ? (
              <Image
                src={
                  profileData?.photoURL ||
                  user?.photoURL ||
                  "https://via.placeholder.com/50"
                }
                roundedCircle
                width={isMobile ? "35" : " 50"}
                height={isMobile ? "35" : " 50"}
              />
            ) : (
              <PersonCircle size={isMobile ? "35" : " 50"} color="#0D6EFD" />
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.ItemText className="text-center font-weight-bold">
              {profileData?.lastName && profileData.firstName
                ? `${profileData.firstName} ${profileData.lastName}`
                : profileData?.displayName || user?.email}
              <Dropdown.Divider />
            </Dropdown.ItemText>
            <Dropdown.Item className="text-center">
              <UserTestAndExit />
            </Dropdown.Item>
            <Dropdown.Item
              className="text-center"
              onClick={() => setShowSettings(true)}
            >
              <Gear className="me-2" /> הגדרות
            </Dropdown.Item>
            <Dropdown.Item
              className="text-center"
              onClick={() => setShowInfo(true)}
            >
              <InfoCircle className="me-2" /> מידע
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </OverlayTrigger>
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
    style={{ cursor: "pointer" }}
  >
    {children}
  </div>
));

export default ProfileButton;
