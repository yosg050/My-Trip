import React, { useState, useCallback, useEffect, useRef } from "react";
import { Card, Spinner } from "react-bootstrap";
import LocationModal from "./LocationModal";

function LocationList({ locations, onLocationUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [listSize, setListSize] = useState({ width: "100%", height: "80vh" });
  const listContainerRef = useRef(null);

  const updateListSize = useCallback(() => {
    if (listContainerRef.current) {
      const { offsetWidth } = listContainerRef.current.parentElement;
      const windowHeight = window.innerHeight;
      const topMargin = 20; // Adjust this value based on your layout
      const bottomMargin = 0; // Adjust this value to increase/decrease bottom margin

      setListSize({
        width: `${offsetWidth}px`,
        height: `${
          Math.floor(windowHeight * 0.9) - topMargin - bottomMargin
        }px`,
      });
    }
  }, []);

  useEffect(() => {
    updateListSize();
    window.addEventListener("resize", updateListSize);
    return () => window.removeEventListener("resize", updateListSize);
  }, [updateListSize]);

  const handleCardClick = useCallback((location) => {
    setSelectedLocation(location);
    setShowModal(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setSelectedLocation(null);
  }, []);

  const handleLocationUpdate = useCallback(
    (updatedLocation) => {
      if (typeof onLocationUpdate === "function") {
        onLocationUpdate(updatedLocation);
        setSelectedLocation(updatedLocation);
      } else {
        console.error("onLocationUpdate is not a function");
      }
    },
    [onLocationUpdate]
  );

  if (!locations || !Array.isArray(locations) ) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <Spinner  variant="primary"/>
      </div>
    );
  }
  if ( locations.length === 0){
    return (<div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "90vh" }}
  >
    אין מיקומים להצגה
  </div>
);
  }

  const listContainerStyle = {
    width: listSize.width,
    height: listSize.height,
    overflowY: "scroll",
    marginBottom: "20px",
    paddingRight: "10px",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // Internet Explorer 10+
  };

  const listContentStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    direction: "rtl",
  };

  return (
    <div ref={listContainerRef} style={listContainerStyle}>
      <style>
        {`
          #locationListContainer::-webkit-scrollbar {
            display: none;
          }
          .clickable-card {
            cursor: pointer;
            transition: box-shadow 0.3s ease-in-out;
          }
          .clickable-card:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
        `}
      </style>
      <div id="locationListContainer" style={listContentStyle}>
        {locations.map((location, index) => (
          <Card
            key={index}
            style={{ width: "100%", marginBottom: "10px", }}
            className="clickable-card"
            onClick={() => handleCardClick(location)}
          >
            <Card.Body>
              <Card.Title
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "0.8em" }}>
                  {location.name}
                </span>
                <span
                  style={{
                    fontSize: "0.8em",
                    color: location.visit ? "green" : "red",
                    backgroundColor: location.visit ? "#e6ffe6" : "#ffe6e6",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  {location.visit ? "ביקרתי" : "לא ביקרתי"}
                </span>
              </Card.Title>
              <Card.Text style={{ lineHeight: "1", fontSize: "0.9em" }}>
                <span style={{ fontWeight: "bold" }}>כתובת: </span>
                {location.address}
              </Card.Text>
              {location.tripTypes?.length > 0 && (
                <Card.Text style={{ lineHeight: "0.8", fontSize: "0.9em" }}>
                  <span style={{ fontWeight: "bold" }}>קטגוריה: </span>{" "}
                  {location.tripTypes.join(", ")}
                </Card.Text>
              )}
              {(location.durationText || location.distanceText) && (
                <Card.Text
                  style={{
                    fontSize: "0.8em",
                    backgroundColor: "#ffefef",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontWeight: "bold",
                    direction: "rtl",
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
                </Card.Text>
              )}
              {location.nearbyPlaces && location.nearbyPlaces.length > 0 && (
                <Card.Text>
                  מקומות קרובים: {location.nearbyPlaces.length}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>

      <LocationModal
        show={showModal}
        handleClose={handleClose}
        location={selectedLocation}
        onLocationUpdate={handleLocationUpdate}
      />
    </div>
  );
}

export default LocationList;
