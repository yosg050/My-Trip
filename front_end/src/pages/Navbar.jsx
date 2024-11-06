// import React, { useState, useEffect } from "react";
// import { Navbar, Container, Button, Image, Dropdown } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { Gear, BoxArrowRight, InfoCircle } from "react-bootstrap-icons";
// import logoImage from "../assets/logo.jpg";
// import Settings from "../components/Settings";
// import { useAuth } from "../connections/AuthContext";
// import { doc, getDoc } from "firebase/firestore"; // ייבוא הפונקציות הנדרשות
// import { db } from "../../firebaseConfig";
// import UserTestAndExit from "../connections/UserTest&Exit";
// import Info from "../components/Info";
// import { useUserProfile } from "../connections/GetUserDate";

// import DropdownButton from "react-bootstrap/DropdownButton";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";

// const CustomNavbar = ({ titleData, centerName }) => {
//   const [showSettings, setShowSettings] = useState(false);
//   const { user, logout } = useAuth();
//   const [profileData, setProfileData] = useState(null);
//   const [showInfo, setShowInfo] = useState(false);

//   const { userData: userProfileData, loading, error } = useUserProfile(); // נתוני המשתמש
//   console.log(centerName);

//   useEffect(() => {
//     if (userProfileData) {
//       setProfileData(userProfileData); // הגדרת נתוני המשתמש
//     }
//   }, [userProfileData]);

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error("Failed to log out", error);
//     }
//   };
//   const BACKGROUND_COLORS = {
//     "רשימת היעדים שלי": "#B7E2FF",
//     "בחירת יעד מתאים": "#DEFFD9",
//   };

//   return (
//     <>
//       <Navbar
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           // backgroundColor: BACKGROUND_COLORS[titleData],
//         }}
//       >
//         <Dropdown>
//           <Dropdown.Toggle as={CustomToggle}>
//             <div
//               style={{
//                 display: "flex",
//                 borderColor: "#CFE0E0",
//                 paddingRight: "0.5rem",
//                 borderRadius: "0.6rem",
//                 marginLeft: "1rem",
//                 marginRight: "1rem",
//                 color: "white",
//                 backgroundColor: "#0D6EFD",
//                 transition: "background-color 0.3s",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#0056b3")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#0D6EFD")
//               }
//             >
//               {/* <Image
//                 src={
//                   profileData?.photoURL ||
//                   user?.photoURL ||
//                   "https://via.placeholder.com/50"
//                 }
//                 roundedCircle
//                 width="50"
//                 height="50"
//                 style={{ margin: "5px" }}
//               /> */}

//               <div
//                 style={{
//                   display: "flex",
//                   textAlign: "center",
//                   alignItems: "center",
//                   direction: "rtl",
//                 }}
//               >
//                 <div
//                   style={{
//                     marginLeft: "0.5em",
//                     fontWeight: "bold",
//                     textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
//                   }}
//                 >
//                   היי,
//                 </div>
//                 {profileData && profileData.firstName ? (
//                   <span
//                     style={{
//                       marginLeft: "1em",
//                       fontWeight: "bold",
//                       textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
//                     }}
//                   >
//                     {`${profileData.firstName}`}
//                   </span>
//                 ) : (
//                   <span
//                     style={{
//                       fontWeight: "bold",
//                       textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
//                     }}
//                   >
//                     {profileData?.displayName || user?.email}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </Dropdown.Toggle>
//           <Dropdown.Menu style={{ textAlign: "center" }}>
//             <Dropdown.Item>
//               <UserTestAndExit />
//             </Dropdown.Item>
//             <Dropdown.Item
//               onClick={() => setShowSettings(true)}
//               className="mb-1"
//             >
//               <Gear className="me-2" /> הגדרות
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setShowInfo(true)}>
//               <InfoCircle className="me-2" /> מידע
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>

//         <div className="mb-2">
//           <OverlayTrigger
//             placement="right"
//             overlay={
//               <Tooltip id="tooltip-right">Tooltip for the dropdown</Tooltip>
//             }
//           >
//             <DropdownButton
//               as={ButtonGroup}
//               key="start"
//               id="dropdown-button-drop-start"
//               drop="start"
//               variant="primary"
//               title={
//                 <Image
//                   src={
//                     profileData?.photoURL ||
//                     user?.photoURL ||
//                     "https://via.placeholder.com/50"
//                   }
//                   roundedCircle
//                   width="50"
//                   height="50"
//                   style={{ margin: "5px" }}
//                 />
//               }
//             >
//               <p style={{ textAlign: "center" }}>
//                 {profileData?.lastName && profileData.firstName ? (
//                   <span
//                     style={{
//                       fontWeight: "bold",
//                       textAlign: "center",
//                     }}
//                   >
//                     {`${profileData.firstName} ${profileData.lastName}`}
//                   </span>
//                 ) : (
//                   <span
//                     style={{
//                       fontWeight: "bold",
//                       textAlign: "center",
//                     }}
//                   >
//                     {profileData?.displayName || user?.email}
//                   </span>
//                 )}
//               </p>
//               <Dropdown.Item style={{ textAlign: "center" }}>
//                 <UserTestAndExit />
//               </Dropdown.Item>
//               <Dropdown.Item
//                 style={{ textAlign: "center" }}
//                 onClick={() => setShowSettings(true)}
//                 className="mb-1"
//               >
//                 <Gear className="me-2" /> הגדרות
//               </Dropdown.Item>
//               <Dropdown.Item
//                 onClick={() => setShowInfo(true)}
//                 style={{ textAlign: "center" }}
//               >
//                 <InfoCircle className="me-2" /> מידע
//               </Dropdown.Item>
//             </DropdownButton>
//           </OverlayTrigger>
//         </div>
//         <strong
//           style={{
//             fontWeight: "bold",
//             fontSize: "1.2rem",
//             textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
//             textAlign: "center",
//             // alignSelf: "end",
//           }}
//         >
//           {" "}
//           {titleData}
//         </strong>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             alignItems: "center",
//           }}
//         >
//           <h2
//             style={{
//               marginRight: "10px",
//               fontWeight: "bold",
//               fontSize: "1.5rem",
//               textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
//               textAlign: "center",
//             }}
//           >
//             My-Trip
//           </h2>
//           <Navbar.Brand as={Link} to="/">
//             <img
//               src={logoImage}
//               width="60"
//               height="60"
//               className="d-inline-block align-top r-2 rounded"
//               alt="MyTrip Logo"
//               style={{
//                 filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
//               }}
//             />
//           </Navbar.Brand>
//         </div>
//       </Navbar>

//       <Settings
//         show={showSettings}
//         handleClose={() => setShowSettings(false)}
//       />
//       <Info show={showInfo} handleClose={() => setShowInfo(false)} />
//     </>
//   );
// };

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//   <div
//     ref={ref}
//     onClick={(e) => {
//       e.preventDefault();
//       onClick(e);
//     }}
//     style={{ display: "flex", cursor: "pointer" }}
//   >
//     {children}
//   </div>
// ));

// export default CustomNavbar;
