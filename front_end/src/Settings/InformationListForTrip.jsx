import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../connections/AuthContext";
import placesData from "../../LocationsHebrewEnglish";
import { useUserProfile } from "../connections/GetUserDate";
import useMobile from "../components/UseMobile";

const placesDataSingle = placesData;
const isMobile = useMobile;
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
      const userDocRef = doc(db, "Users", user.uid);
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <p style={{ fontWeight: "bold", fontSize: "1.5em", lineHeight: "1" }}>
          בחר מקומות
        </p>
        <p style={{ fontSize: "1em", lineHeight: "0.8" }}>
          הוסף מקומות עניין לטיולים שלך
        </p>
      </div>
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        <Modal.Body
          style={{
            display: "flex",
            maxHeight: "250px",
            justifyContent: "center",
            overflowY: "auto",
          }}
        >
          <Form>
            <div>
              {placesDataSingle.map(({ hebrew, english }) => (
                <div
                  key={english}
                  style={{
                    width: "100%",
                    direction: "rtl",
                  }}
                >
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
        </Modal.Body>
      </div>
      <Modal.Footer
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: "0",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Button onClick={saveToFirestore}>שמור העדפות</Button>
      </Modal.Footer>
    </div>
  );
}

// return (
//   <div style={styles.container}>
//     <div style={styles.header}>
//       <h2>בחר מקומות</h2>
//       <p>בחר ביעדי סוגי טיולים</p>
//     </div>
//     <div style={styles.checkboxContainer}>
//       <Form>
//         <div style={styles.checkboxList}>
//           {placesDataSingle.map(({ hebrew, english }) => (
//             <div key={english} style={styles.checkboxItem}>
//               <Form.Check
//                 type="switch"
//                 id={english}
//                 checked={selectedPlaces[english] || false}
//                 label={hebrew}
//                 onChange={(e) =>
//                   handleCheckboxChange(english, e.target.checked)
//                 }
//                 reverse
//               />
//             </div>
//           ))}
//         </div>
//       </Form>
//     </div>
//     <Modal.Footer style={styles.footer}>
//       <Button onClick={saveToFirestore}>שמור העדפות</Button>
//     </Modal.Footer>
//   </div>
// );
// }
