// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { doc, collection, query, onSnapshot, setDoc } from 'firebase/firestore';
// import { db } from '../../firebaseConfig';

// const UserProfileContext = createContext();

// export const UserProfileProvider = ({ userId, children }) => {
//   const [userData, setUserData] = useState(null);
//   const [locations, setLocations] = useState([]);
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // console.log("useUserProfileWithLocations called with userId:", userId);
//     setLoading(true);
//     setError(null);

//     const userDocRef = doc(db, "Users", userId);

//     const unsubscribeUser = onSnapshot(
//       userDocRef,
//       async (docSnapshot) => {
//         if (docSnapshot.exists()) {
//           const data = docSnapshot.data();
//           // console.log("User data received:", data);
//           setUserData(data);
//         } else {
//           // console.log("No user document found. Creating new user.");
//           try {
//             const newUserData = {
//               email: userId,
//               createdAt: new Date(),
//             };
//             await setDoc(userDocRef, newUserData);
//             setUserData(newUserData);
//           } catch (err) {
//             console.error("Error creating new user:", err);
//             setError("Failed to create new user: " + err.message);
//           }
//         }
//       },
//       (err) => {
//         console.error("Error fetching user data:", err);
//         setError(err.message);
//       }
//     );

//     const locationsRef = collection(db, "Users", userId, "Locations");
//     const q = query(locationsRef);

//     const unsubscribeLocations = onSnapshot(
//       q,
//       (querySnapshot) => {
//         const updatedLocations = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         console.log("Locations received:", updatedLocations);
//         setLocations(updatedLocations);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Error fetching locations:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     );

//     return () => {
//       // console.log("Cleaning up listeners");
//       unsubscribeUser();
//       unsubscribeLocations();
//     };
//   }, [userId]);

//   // console.log("Current state:", { userData, locations, loading, error });

//   return (
//     <UserProfileContext.Provider value={{ userData, locations, loading, error }}>
//       {children}
//     </UserProfileContext.Provider>
//   );
// };

// export const useUserProfile = () => {
//   const context = useContext(UserProfileContext);
//   if (context === undefined) {
//     throw new Error('useUserProfile must be used within a UserProfileProvider');
//   }
//   return context;
// };
import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, collection, query, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ userId, children }) => {
  const [userData, setUserData] = useState(null);
  const [locations, setLocations] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const userDocRef = doc(db, "Users", userId);
    let unsubscribeUser;
    let unsubscribeLocations;

    const fetchUserData = async () => {
      try {
        unsubscribeUser = onSnapshot(
          userDocRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              setUserData(docSnapshot.data());
            } else {
              setError("משתמש לא נמצא");
            }
            setLoading(false);
          },
          (err) => {
            console.error("Error fetching user data:", err);
            setError(err.message);
            setLoading(false);
          }
        );

        const locationsRef = collection(db, "Users", userId, "Locations");
        const q = query(locationsRef);
        unsubscribeLocations = onSnapshot(
          q,
          (querySnapshot) => {
            const updatedLocations = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setLocations(updatedLocations);
          },
          (err) => {
            console.error("Error fetching locations:", err);
            setError(err.message);
            setLoading(false);
          }
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();

    return () => {
      if (unsubscribeUser) unsubscribeUser();
      if (unsubscribeLocations) unsubscribeLocations();
    };
  }, [userId]);

  return (
    <UserProfileContext.Provider value={{ userData, locations, loading, error }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};