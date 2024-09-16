import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup, Modal } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../connections/AuthContext";
import { useUserProfile } from "../connections/GetUserDate";

const initialTripTypes = ["זוגי", "ילדים", "חברים"];

export default function TripTypes() {
  const [selectedTripTypes, setSelectedTripTypes] = useState({});
  const [customTripTypes, setCustomTripTypes] = useState([]);
  const [newTripType, setNewTripType] = useState("");
  const { user } = useAuth();
  const { userData, loading, error } = useUserProfile();

  useEffect(() => {
    if (userData && userData.typesOfTrips) {
      setSelectedTripTypes(userData.typesOfTrips);
      const customTypes = Object.keys(userData.typesOfTrips).filter(
        type => !initialTripTypes.includes(type)
      );
      setCustomTripTypes(customTypes);
    }
  }, [userData]);

  const handleCheckboxChange = (tripType, isChecked) => {
    setSelectedTripTypes(prev => ({ ...prev, [tripType]: isChecked }));
  };

  const handleAddTripType = () => {
    if (newTripType && !customTripTypes.includes(newTripType)) {
      setCustomTripTypes(prev => [...prev, newTripType]);
      setSelectedTripTypes(prev => ({ ...prev, [newTripType]: true }));
      setNewTripType("");
    }
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
          typesOfTrips: selectedTripTypes,
          lastUpdated: new Date(),
        },
        { merge: true }
      );

      console.log("Trip types saved successfully");
    } catch (error) {
      console.error("Error saving trip types:", error);
    }
  };

  if (loading) return <div>טוען...</div>;
  if (error) return <div>שגיאה בטעינת הנתונים: {error.message}</div>;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '60vh',
      maxWidth: '100vw',
      margin: '0 auto',
      position: 'relative'
    }}>
      <div style={{textAlign: 'center', marginBottom: '20px'}}>
        <h2>קטגוריות</h2>
        <p>הוסף את הקטגוריות לטיולים המועדפות עליך  </p>
      </div>
      <div style={{
        maxHeight: "calc(100vh - 200px)",
        overflowY: "auto",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Form style={{width: '100%', maxWidth: '100px'}}>
          {[...initialTripTypes, ...customTripTypes].map((tripType) => (
            <div key={tripType} >
              <Form.Check
                type="switch"
                id={tripType}
                checked={selectedTripTypes[tripType] || false}
                label={tripType}
                onChange={(e) => handleCheckboxChange(tripType, e.target.checked)}
                reverse
              />
            </div>
          ))}
        </Form>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <InputGroup style={{ width: '300px' }}>
          <Form.Control
            placeholder="הוסף קטגוריה חדשה"
            value={newTripType}
            onChange={(e) => setNewTripType(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={handleAddTripType}>
            הוסף
          </Button>
        </InputGroup>
      </div>
      <Modal.Footer
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: "5%",
          paddingBottom: "10px",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'white'
        }}
      >
        <Button onClick={saveToFirestore}>שמור העדפות</Button>
      </Modal.Footer>
    </div>
  );
}