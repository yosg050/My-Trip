import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import useUserProfileWithLocations from "./GetUserDate";

const UserProfileDisplay = () => {
  console.log("Rendering of UserProfileDisplay");
  const { user } = useAuth();
  console.log("USer-in-useAuth:", user);

  if (!user) {
    return <div>אין משתמש מחובר</div>;
  }

  const userId = user.uid;
  console.log("מזהה משתמש:", userId);

  const { userData, locations, loading, error } =
    useUserProfileWithLocations(userId);

  useEffect(() => {
    console.log("Error:", error);
  }, [userData, locations, loading, error]);

  if (loading) {
    // console.log("עדיין טוען...");
    return <div>טוען...</div>;
  }
  if (error) {
    console.log("אירעה שגיאה:", error);
    return <div>שגיאה: {error}</div>;
  }
};

export default UserProfileDisplay;
