import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Alert,
  InputGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuth } from "./AuthContext";
import { auth } from "../../firebaseConfig";
import { Eye, EyeSlash } from "react-bootstrap-icons";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return setError("משתמש לא מחובר. אנא התחבר מחדש.");
    }

    if (newPassword !== confirmPassword) {
      return setError("הסיסמאות החדשות אינן תואמות");
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Change the password
      await updatePassword(user, newPassword);

      setSuccess("הסיסמה שונתה בהצלחה");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("שגיאה בשינוי הסיסמה: " + err.message);
    }

    setLoading(false);
  };

  const PasswordInput = ({ value, onChange, show, setShow, placeholder }) => (
    <InputGroup style={{ width: "300px" }}>
      <Form.Control
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
      />
      <Button variant="outline-secondary" onClick={() => setShow(!show)}>
        {show ? <EyeSlash /> : <Eye />}
      </Button>
    </InputGroup>
  );

  if (isLoading) {
    return <div>טוען...</div>;
  }

  if (!user) {
    return <Alert variant="danger">משתמש לא מחובר. אנא התחבר מחדש.</Alert>;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <div className="text-center">
            <h2>שינוי סיסמה</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>סיסמה נוכחית</Form.Label>
                <PasswordInput
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  show={showCurrentPassword}
                  setShow={setShowCurrentPassword}
                  autoComplete="current-password" 
                  placeholder="הזן סיסמה נוכחית"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>סיסמה חדשה</Form.Label>
                <PasswordInput
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  show={showNewPassword}
                  setShow={setShowNewPassword}
                  autocomplete="new-password"
                  placeholder="הזן סיסמה חדשה"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>אימות סיסמה חדשה</Form.Label>
                <PasswordInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  show={showConfirmPassword}
                  setShow={setShowConfirmPassword}
                  autocomplete="new-password"
                  placeholder="הזן שוב את הסיסמה החדשה"
                />
              </Form.Group>
              <Button type="submit" disabled={loading}>
                שינוי סיסמה
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;
