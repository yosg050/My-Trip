import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

const SignUp = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setEmail("");
      setPassword("");
      handleClose(); // סגירת המודאל לאחר יצירת המשתמש
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <a href="#" variant="primary" onClick={handleShow}>
        {/* Opening a new account */}
        יצירת חשבון משתמש חדש
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> הרשמה</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>מייל</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                לעולם לא נשתף את האימייל שלך עם אף אחד אחר.{" "}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>סיסמה</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                סגור
              </Button>
              <Button variant="primary" type="submit">
                שמור{" "}
              </Button>
            </Modal.Footer>
          </Form>
          {/* {error && <div>{error}</div>} */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUp;
