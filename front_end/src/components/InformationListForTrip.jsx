// import React, { useState, useEffect } from "react";
// import { Form, Button, Modal } from "react-bootstrap";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../firebaseConfig";
// import { useAuth } from "../connections/AuthContext";
// import placesData from "../../LocationsHebrewEnglish";
// import { useUserProfile } from "../connections/GetUserDate";

// const placesDataSingle = placesData;

// export default function InformationListForTrip() {
//   const [selectedPlaces, setSelectedPlaces] = useState({});
//   const { user } = useAuth();
//   const { userData, loading, error } = useUserProfile();

//   useEffect(() => {
//     if (userData && userData.selectedPlaces) {
//       setSelectedPlaces(userData.selectedPlaces);
//     }
//   }, [userData]);

//   const handleCheckboxChange = (english, isChecked) => {
//     setSelectedPlaces((prev) => ({ ...prev, [english]: isChecked }));
//   };

//   const saveToFirestore = async () => {
//     if (!user) {
//       console.error("No user logged in");
//       return;
//     }

//     try {
//       const userDocRef = doc(db, "Users", user.email);
//       await setDoc(
//         userDocRef,
//         {
//           selectedPlaces: selectedPlaces,
//           lastUpdated: new Date(),
//         },
//         { merge: true }
//       );

//       console.log("Preferences saved successfully");
//     } catch (error) {
//       console.error("Error saving preferences:", error);
//     }
//   };

//   if (loading) return <div>טוען...</div>;
//   if (error) return <div>שגיאה בטעינת הנתונים: {error.message}</div>;

//   return (
//     <div>
//       <div style={{ textAlign: "center" }}>
//         <h2>בחר מקומות</h2>
//         <p>בחר ביעדי סוגי טיולים</p>
//       </div>
//       <div
//         style={{
//           maxHeight: "250px",
//           overflowY: "auto",
//           marginBottom: "20px",
//           display: "flex",
//         }}
//       >
//         <Form>
//           <div className="checkbox-container">
//             {placesDataSingle.map(({ hebrew, english }) => (
//               <div key={english} className="checkbox-item">
//                 <Form.Check
//                   type="switch"
//                   id={english}
//                   checked={selectedPlaces[english] || false}
//                   label={hebrew}
//                   onChange={(e) =>
//                     handleCheckboxChange(english, e.target.checked)
//                   }
//                   reverse
//                 />
//               </div>
//             ))}
//           </div>
//         </Form>
//       </div>
//       <Modal.Footer
//         style={{
   
          
//           position: 'absolute',
//           bottom: 0,
//           left: 0,
//           right: 0,
//           maxHeight: "5%",
//           paddingBottom: "10px",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: 'white'
          
//         }}
//       >
//         <Button onClick={saveToFirestore}>שמור העדפות</Button>
//       </Modal.Footer>
      
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../connections/AuthContext";
import placesData from "../../LocationsHebrewEnglish";
import { useUserProfile } from "../connections/GetUserDate";

const placesDataSingle = placesData;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  checkboxContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    marginBottom: '20px',
  },
  checkboxList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '10px',
  },
  checkboxItem: {
    width: 'calc(25% - 7.5px)',
    direction: 'rtl',
    textAlign: 'right',
  },
  footer: {
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
};

export default function InformationListForTrip() {
  const [selectedPlaces, setSelectedPlaces] = useState({});
  const { user } = useAuth();
  const { userData, loading, error } = useUserProfile();

  useEffect(() => {
    if (userData && userData.selectedPlaces) {
      setSelectedPlaces(userData.selectedPlaces);
    }
  }, [userData]);

  const handleCheckboxChange = (english, isChecked) => {
    setSelectedPlaces((prev) => ({ ...prev, [english]: isChecked }));
  };

  const saveToFirestore = async () => {
    if (!user) {
      console.error("No user logged in");
      return;
    }

    try {
      const userDocRef = doc(db, "Users", user.email);
      await setDoc(
        userDocRef,
        {
          selectedPlaces: selectedPlaces,
          lastUpdated: new Date(),
        },
        { merge: true }
      );

      console.log("Preferences saved successfully");
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  if (loading) return <div>טוען...</div>;
  if (error) return <div>שגיאה בטעינת הנתונים: {error.message}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>בחר מקומות</h2>
        <p>בחר ביעדי סוגי טיולים</p>
      </div>
      <div style={styles.checkboxContainer}>
        <Form>
          <div style={styles.checkboxList}>
            {placesDataSingle.map(({ hebrew, english }) => (
              <div key={english} style={styles.checkboxItem}>
                <Form.Check
                  type="switch"
                  id={english}
                  checked={selectedPlaces[english] || false}
                  label={hebrew}
                  onChange={(e) =>
                    handleCheckboxChange(english, e.target.checked)
                  }
                  reverse
                />
              </div>
            ))}
          </div>
        </Form>
      </div>
      <Modal.Footer style={styles.footer}>
        <Button onClick={saveToFirestore}>שמור העדפות</Button>
      </Modal.Footer>
    </div>
  );
}