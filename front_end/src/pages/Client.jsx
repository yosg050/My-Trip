import { Outlet } from "react-router-dom";
import { UserProfileProvider } from "../connections/GetUserDate";
import { useAuth } from "../connections/AuthContext";


const Client = () => {


  const { user } = useAuth();
  const userId = user.uid;
  
console.log(user);


  return (
    <div>
      <UserProfileProvider userId={userId}>
        <Outlet />
      </UserProfileProvider>
    </div>
  );
};

export default Client;
