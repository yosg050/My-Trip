import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { UserProfileProvider } from "../connections/GetUserDate";
import { useAuth } from "../connections/AuthContext";


const Client = () => {

  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { user } = useAuth();
  const userId = user.uid;
  // console.log(user.uid);
  
console.log(user);


  return (
    <div>
      <UserProfileProvider userId={userId}>
        {/* <Navbar /> */}

        <Outlet />
        {/* <Outlet context={{ setShowContact }} />  */}
        {/* <Footer /> */}
      </UserProfileProvider>
    </div>
  );
};

export default Client;
