import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import AutocompleteInput from "./SearchBox";
import { useUserProfile } from "../connections/GetUserDate";
import PopupMessage from "../connections/PopupMessage";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AddDataCollection from "../DB/AddDataCollection";

function AddDestinationWindow({ show, onHide }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { locations, userData } = useUserProfile();
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [isInLocations, setIsInLocations] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [availableTripTypes, setAvailableTripTypes] = useState([]);
  const [selectedTripTypes, setSelectedTripTypes] = useState({});
  const [notes, setNotes] = useState("");
  const [isNewPlaceCheck, setIsNewPlaceCheck] = useState(false);

  useEffect(() => {
    if (userData && userData.typesOfTrips) {
      const userPreferredTypes = Object.entries(userData.typesOfTrips)
        .filter(([_, value]) => value)
        .map(([key, _]) => key);
      setAvailableTripTypes(userPreferredTypes);

      const initialSelectedTypes = userPreferredTypes.reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {});
      setSelectedTripTypes(initialSelectedTypes);
    }
  }, [userData]);

  useEffect(() => {
    if (!show) {
      setSelectedPlace(null);
      setShowAlert(false);
      setAlertVariant("danger");
      setAlertMessage("");
      setIsInLocations(false);
      setShowAddLocation(false);
      setNotes("");
      setSelectedTripTypes((prevTypes) =>
        Object.keys(prevTypes).reduce((acc, type) => {
          acc[type] = false;
          return acc;
        }, {})
      );
    }
  }, [show]);

  const handleShowAlert = (message, variant = "danger") => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handlePlaceSelect = (place) => {
    const placeWithId = {
      ...place,
      id: place.id || place.place_id,
    };
    setSelectedPlace(placeWithId);
  };

  const handleInputChange = () => {
    setShowAlert(false);
    setSelectedPlace(null);
    setIsInLocations(false);
    setShowAddLocation(false);
  };

  const handleTripTypeChange = (tripType, isChecked) => {
    setSelectedTripTypes((prev) => ({ ...prev, [tripType]: isChecked }));
  };

  const handleAddLocation = () => {
    const selectedTypes = Object.keys(selectedTripTypes).filter(
      (type) => selectedTripTypes[type]
    );

    const updatedPlace = {
      ...selectedPlace,
      tripTypes: selectedTypes,
      notes: notes,
      addedAt: new Date(),
    };

    setSelectedPlace(updatedPlace);
    setShowAddLocation(true);
    // newPlace = true
  };

  const handleAddLocationSuccess = () => {
    setSelectedPlace(null);
    setShowAddLocation(false);
    setIsNewPlaceCheck(false)
    handleShowAlert("המיקום נוסף בהצלחה", "success");
  };

  const handleAddLocationError = (errorMessage) => {
    handleShowAlert(errorMessage, "danger");
  };

  useEffect(() => {
    if (selectedPlace && !isNewPlaceCheck) {
      const isPlaceAlreadyInLocations = locations.some(
        (location) => location.id === selectedPlace.id
      );
      setIsInLocations(isPlaceAlreadyInLocations);

      if (isPlaceAlreadyInLocations) {
        handleShowAlert("המיקום כבר קיים ברשימה");
      }
      setIsNewPlaceCheck(true);
    }
  }, [selectedPlace, locations, isNewPlaceCheck]);

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      style={{
        textAlign: "end",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>הוסף יעד</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container fluid>
          <Row>
            <Col>
              <AutocompleteInput
                onPlaceSelect={handlePlaceSelect}
                onInputChange={handleInputChange}
                text=" חפש יעד"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <PopupMessage
                show={showAlert}
                onClose={handleCloseAlert}
                variant={alertVariant}
                duration={3000}
                message={alertMessage}
              />
            </Col>
          </Row>
          {selectedPlace && !isInLocations && !showAddLocation && (
            <Row className="mt-3">
              <Col>
                <Form>
                  <div
                    style={{
                      padding: "3px",
                      borderRadius: "10px",
                      backgroundColor: "#05FFD7",
                    }}
                  >
                    <p style={{ fontWeight: "bold", textAlign: "center" }}>
                      יעד נבחר
                    </p>
                    <p
                      style={{
                        lineHeight: "1",
                        marginRight: "10%",
                        textAlign: "right",
                      }}
                    >
                      {" "}
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        שם:{" "}
                      </span>{" "}
                      {selectedPlace.name}
                    </p>
                    <p
                      style={{
                        lineHeight: "1",
                        marginRight: "10%",
                        textAlign: "right",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        כתובת:{" "}
                      </span>{" "}
                      {selectedPlace.address}
                    </p>
                  </div>
                  <p
                    style={{
                      fontWeight: "bold",
                      marginTop: "20px",
                      textAlign: "center",
                    }}
                  >
                    סיווג הטיול
                    <br /> (התאם את הטיול אישית)
                  </p>
                  <Row className="justify-content-center mb-3">
                    <Col
                      xs={10}
                      style={{
                        maxHeight: "30vh",
                        overflowY: "auto",
                        width: "40%",
                      }}
                    >
                      {availableTripTypes.map((tripType) => (
                        <Form.Check
                          key={tripType}
                          type="switch"
                          id={`trip-type-${tripType}`}
                          label={tripType}
                          checked={selectedTripTypes[tripType] || false}
                          onChange={(e) =>
                            handleTripTypeChange(tripType, e.target.checked)
                          }
                        />
                      ))}
                    </Col>
                  </Row>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      as="input"
                      rows={3}
                      placeholder="הערות"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      style={{ direction: "rtl", marginTop: "20px" }}
                    />
                  </Form.Group>
                </Form>
                <Row>
                  <Col xs={6} style={{ marginTop: "15px" }}>
                    <Button variant="primary" onClick={handleAddLocation}>
                      הוסף יעד
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
          {showAddLocation && (
            <Row>
              <Col>
                <AddDataCollection
                  newTarget={selectedPlace}
                  collection={"Locations"}
                  onSuccess={handleAddLocationSuccess}
                  onError={handleAddLocationError}
                />
              </Col>
            </Row>
          )}
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default AddDestinationWindow;
