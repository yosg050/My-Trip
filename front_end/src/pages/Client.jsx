import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import {
  UserProfileProvider,
  useUserProfile,
} from "../connections/GetUserDate";
import { useAuth } from "../connections/AuthContext";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Gear,
  BoxArrowRight,
  InfoCircle,
  EnvelopeFill,
  QuestionCircle,
  Linkedin,
} from "react-bootstrap-icons";
import Settings from "../components/Settings";
import emailjs from "emailjs-com";
// import Footer from "./Footer";

const Client = () => {
  const [sideMenuHovered, setSideMenuHovered] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // const UserProfileComponent = () => {
  //   const { userData, locations, loading, error } = useUserProfile();
  // };

  const { user } = useAuth();
  const userId = user.email;

  useEffect(() => {
    emailjs.init("KD4KNz9sTJiN90XYN");
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_6aof0w1",
        "template_l8m25p7",
        { message: message, from_email: userId },
        "KD4KNz9sTJiN90XYN"
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setShowContact(false);
          setShowSuccessMessage(true);
          setMessage("");
          setTimeout(() => setShowSuccessMessage(false), 3000);
        },
        (error) => {
          console.error("Failed to send email:", error.text);
        }
      );
  };

  const handleCloseContact = () => {
    setShowContact(false);
    setMessage("");
  };

  return (
    <div>
      <UserProfileProvider userId={userId}>
        {/* <Navbar /> */}

        <Outlet context={{ setShowContact }} />
        {/* <Footer /> */}
      </UserProfileProvider>
    </div>
  );
};

export default Client;