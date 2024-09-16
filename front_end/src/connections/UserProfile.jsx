import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import useUserProfileWithLocations from './GetUserDate';

const UserProfileDisplay = () => {
    console.log("Rendering of UserProfileDisplay");
    const { user } = useAuth();
    console.log("USer-in-useAuth:", user);

    if (!user) {
        return <div>אין משתמש מחובר</div>;
    }

    const userId = user.email;
    console.log("מזהה משתמש:", userId);

    const { userData, locations, loading, error } = useUserProfileWithLocations(userId);

    useEffect(() => {
        // console.log("עדכון נתונים:");
        console.log("נתוני משתמש:", userData);
        console.log("מיקומים:", locations);
        // console.log("טוען:", loading);
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


    return (
        <div>
            {/* <h2>פרטי משתמש:</h2>
            {userData && (
                <div>
                    <p>שם: {userData.Name}</p>
                    <p>אימייל: {user.email}</p>
                </div>  
            )} */}

            {/* <h2>מיקומים:</h2> */}
            {/* <ul>
                {locations.map((location, index) => (
                    <li key={index}>{JSON.stringify(location)}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default UserProfileDisplay;