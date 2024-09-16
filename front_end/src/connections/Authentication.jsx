import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import SignUp from "./NewUser";
import { useAuth } from "./AuthContext";
import logoImage from "../assets/logo.jpg";
import Image from "react-bootstrap/Image";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import handleResetPassword from "./resetPasswordEmail";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
      console.log("Google sign-in successful");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        marginTop: "5%",
      }}
    >
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Image
            src={logoImage}
            rounded
            style={{ width: "120px", height: "120px" }}
          />
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              textAlign: "center",
            }}
          >
            MyTrip
          </h2>
          <Form.Group className="mt-3" controlId="formPlaintextEmail">
            <Form.Label>מייל</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPlaintextPassword">
            <Form.Label sm="2">סיסמה</Form.Label>

            <Form.Control
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <a href="#" variant="primary" onClick={handleResetPassword}>
            שכחתי סיסמה
          </a>
          <div className="d-grid gap-2">
            <Button style={{ marginTop: "23px" }}>התחברות</Button>
            <Button onClick={handleGoogleSignIn} style={{ marginTop: "23px" }}>
              Google התחברות באמצעות חשבון
            </Button>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
        </Form>
        <SignUp />
      </Col>
    </div>
  );
};

export default SignIn;
