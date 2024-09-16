import React, { useState, useCallback } from "react";
import {
  Modal,
  Button,
  ListGroup,
  OverlayTrigger,
  Tooltip,
  Col,
  Row,
} from "react-bootstrap";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../connections/AuthContext";
import { Compass, Pin, Share, Trash3 } from "react-bootstrap-icons";
import LocationImage from "./LocationImage"; // יש לוודא שנתיב הייבוא נכון

function LocationModal({ show, handleClose, location }) {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { user } = useAuth();

  const handleVisitUpdate = useCallback(async () => {
    if (!user?.email || !location?.id) {
      console.error("Missing required fields for update");
      return;
    }

    setUpdating(true);
    try {
      const locationRef = doc(
        db,
        "Users",
        user.email,
        "Locations",
        location.id
      );

      await updateDoc(locationRef, {
        visit: true,
        lastUpdated: new Date().toISOString(),
      });

      handleClose();
    } catch (error) {
      console.error("Error updating location:", error);
    } finally {
      setUpdating(false);
    }
  }, [user, location, handleClose]);

  const handleDelete = useCallback(async () => {
    if (!user?.email || !location?.id) {
      console.error("Missing required fields for delete");
      return;
    }

    setDeleting(true);
    try {
      const locationRef = doc(
        db,
        "Users",
        user.email,
        "Locations",
        location.id
      );

      await deleteDoc(locationRef);

      handleClose();
    } catch (error) {
      console.error("Error deleting location:", error);
    } finally {
      setDeleting(false);
    }
  }, [user, location, handleClose]);

  const handleImageUpload = useCallback(
    async (downloadURL) => {
      if (!user?.email || !location?.id) {
        console.error("Missing required fields for image upload");
        return;
      }

      try {
        const locationRef = doc(
          db,
          "Users",
          user.email,
          "Locations",
          location.id
        );
        await updateDoc(locationRef, {
          image: downloadURL,
          lastUpdated: new Date().toISOString(),
        });

        handleClose();
      } catch (error) {
        console.error("Error updating location with new image:", error);
      }
    },
    [user, location, handleClose]
  );

  if (!location) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Modal.Header
        style={{
          backgroundColor: location.visit ? "#e6ffe6" : "#ffe6e6",
          padding: "4px 15px",
        }}
        closeButton
      >
        <span
          style={{
            color: location.visit ? "green" : "red",
            padding: "2px 6px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1em",
          }}
        >
          {location.visit ? "ביקרתי" : "לא ביקרתי"}
        </span>
      </Modal.Header>

      <Modal.Body style={{ direction: "rtl", alignItems: "center" }}>
        <Col>
          <Modal.Title
            style={{
              fontSize: "1em",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            {location.name}
          </Modal.Title>
          {(location.durationText || location.distanceText) && (
            <Row
              style={{
                fontSize: "0.8em",
                backgroundColor: "#ffefef",
                padding: "2px 6px",
                justifyContent: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {location.transportMode
                ? location.transportMode
                    .replace("bicycling", "רכיבה באופניים: ")
                    .replace("transit", "תחבורה ציבורית: ")
                    .replace("walking", "הליכה: ")
                    .replace("driving", "נהיגה: ")
                : location.transportMode}
              {location.durationText
                ? location.durationText
                    .replace("mins", "דק'")
                    .replace("min", "דק'")
                    .replace("hours", "שע' ו-")
                    .replace("hour", "שע' ו-")
                : location.durationText}
              {location.durationText && location.distanceText && " • "}
              {location.distanceText &&
                `מרחק: ${location.distanceText.replace("km", 'ק"מ')}`}
            </Row>
          )}
        </Col>

        <Row>
          <Col style={{ textAlign: "right", lineHeight: "1" }}>
            <Row>
              <p>
                <strong>כתובת:</strong> {location.address}
              </p>
            </Row>
            <Row>
              <p>
                <strong>הערות:</strong> {location.notes || "אין הערות"}
              </p>
            </Row>
            <Row>
              <p>
                <strong>קטגוריה:</strong>{" "}
                {location.tripTypes && location.tripTypes.length > 0
                  ? location.tripTypes.join(", ")
                  : "כללי"}
              </p>
            </Row>
          </Col>

          <Col>
            <LocationImage
              location={location}
              user={user}
              onImageUpload={handleImageUpload}
            />
          </Col>
        </Row>
        {location.nearbyPlaces && location.nearbyPlaces.length > 0 && (
          <>
            <h5>מקומות קרובים:</h5>
            <ListGroup>
              {location.nearbyPlaces.map((place, index) => (
                <ListGroup.Item key={index}>
                  {place.name} - {place.type}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Modal.Body>

      <Modal.Footer style={{ justifyContent: "center" }}>
        <OverlayTrigger placement="top" overlay={<Tooltip>נווט ליעד</Tooltip>}>
          <Button
            variant="outline-info"
            // onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "שולח מיקום..." : <Compass />}
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>שתף</Tooltip>}>
          <Button
            variant="outline-warning"
            // onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "משתף..." : <Share />}
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>מחק מיקום</Tooltip>}>
          <Button
            variant="outline-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "מוחק..." : <Trash3 />}
          </Button>
        </OverlayTrigger>

        {!location.visit && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>ביקרתי פה</Tooltip>}
          >
            <Button
              variant="outline-success"
              onClick={handleVisitUpdate}
              disabled={updating}
            >
              {updating ? "מעדכן..." : <Pin />}
            </Button>
          </OverlayTrigger>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default LocationModal;
