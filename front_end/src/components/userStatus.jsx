import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../connections/AuthContext";
import { useUserProfile } from "../connections/GetUserDate";

function UserStatus() {
  const [children, setChildren] = useState([]);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
  });
  const { user } = useAuth();
  const { userData: userProfileData, loading, error } = useUserProfile();

  useEffect(() => {
    if (userProfileData) {
      setUserData(userProfileData);
      if (userProfileData.children) {
        setChildren(userProfileData.children);
      }
    }
  }, [userProfileData]);

  const addChild = () => {
    setChildren([...children, { name: "", birthDate: "" }]);
  };

  const updateChild = (index, field, value) => {
    const updatedChildren = [...children];
    updatedChildren[index][field] = value;
    setChildren(updatedChildren);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
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
          ...userData,
          children,
          lastUpdated: new Date(),
        },
        { merge: true }
      );

      console.log("User data saved successfully");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  if (loading) return <div>טוען...</div>;
  if (error) return <div>שגיאה בטעינת הנתונים: {error.message}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "65vh",
        width: "100%",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ 
        overflowY: "auto", 
        overflowX: "hidden",
        flexGrow: 1, 
        paddingBottom: "60px",
        paddingRight: "15px",
        paddingLeft: "15px",
        boxSizing: "border-box"
      }}>
        <Form>
          <Row>
            <Col lg={6} md={12} className="mb-3">
              <Form.Group controlId="formFirstName">
                <Form.Label>שם פרטי</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="הכנס שם פרטי"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col lg={6} md={12} className="mb-3">
              <Form.Group controlId="formLastName">
                <Form.Label>שם משפחה</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="הכנס שם משפחה"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={4} md={12} className="mb-3">
              <Form.Group controlId="formBirthDate">
                <Form.Label>תאריך לידה</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={userData.birthDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col lg={4} md={12} className="mb-3">
              <Form.Group controlId="formGender">
                <Form.Label>מין</Form.Label>
                <Form.Select
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">בחר</option>
                  <option value="male">זכר</option>
                  <option value="female">נקבה</option>
                  <option value="other">אחר</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col lg={4} md={12} className="mb-3">
              <Form.Group controlId="formMaritalStatus">
                <Form.Label>סטטוס משפחתי</Form.Label>
                <Form.Select
                  name="maritalStatus"
                  value={userData.maritalStatus}
                  onChange={handleInputChange}
                >
                  <option value="">בחר</option>
                  <option value="single">רווק/ה</option>
                  <option value="married">נשוי/אה</option>
                  <option value="divorced">גרוש/ה</option>
                  <option value="widowed">אלמן/ה</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" >
            <Form.Label>ילדים</Form.Label>
            {children.map((child, index) => (
              <div key={index} className="mb-2">
                <Row>
                  <Col lg={6} md={12} className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="שם הילד"
                      value={child.name}
                      onChange={(e) => updateChild(index, "name", e.target.value)}
                      className="mb-1"
                    />
                  </Col>
                  <Col lg={6} md={12} className="mb-3">
                    <Form.Control
                      type="date"
                      value={child.birthDate}
                      onChange={(e) =>
                        updateChild(index, "birthDate", e.target.value)
                      }
                    />
                  </Col>
                </Row>
              </div>
            ))}
            <Button variant="secondary" onClick={addChild} className="mt-2">
              +
            </Button>
          </Form.Group>
        </Form>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px",
          backgroundColor: "white",
          borderTop: "1px solid #dee2e6",
          textAlign: "center"
        }}
      >
        <Button onClick={saveToFirestore}>שמור פרטים</Button>
      </div>
    </div>
  );
}

export default UserStatus;
