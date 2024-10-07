import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-map-gl";
import { GeoAltFill, PinFill, ThreeDots, XLg } from "react-bootstrap-icons";
import { Card, Button } from "react-bootstrap";

function Markers({ locations, onLocationUpdate, handleShow }) {
  const [popupInfo, setPopupInfo] = React.useState(null);
  const { current: map } = useMap();

  useEffect(() => {
    if (map) {
      const onClick = (e) => {
        if (popupInfo && !e.originalEvent.defaultPrevented) {
          setPopupInfo(null);
        }
      };
      map.on("click", onClick);
      return () => {
        map.off("click", onClick);
      };
    }
  }, [map, popupInfo]);

  const handleShowAndClose = (location) => {
    handleShow(location);
    setPopupInfo(null); // סגירת הפופאפ
  };

  if (!locations || !Array.isArray(locations) || locations.length === 0) {
    return null;
  }

  return (
    <>
      {locations.map((location, index) => (
        <Marker
             key={`marker-${index}`}
          longitude={location.longitude}
          latitude={location.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(location);
          }}
        >
          {location.visit === true ? (
            <PinFill size={24} color="green" />
          ) : (
            <GeoAltFill size={24} color="red" />
          )}
        </Marker>
      ))}
      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => setPopupInfo(null)}
          closeButton={false}
          closeOnClick={true}
          style={{ margin: "0", padding: "0" }}
        >
          <Card
            style={{
              width: "100%",
              border: "none",
              textAlign: "right",
              direction: "rtl",
              minWidth: "150px",
              padding: "0px"
            }}
          >
            <div style={{ position: "absolute", top: 5, left: 5, zIndex: 1 }}>
              <Button
                variant="link"
                size="sm"
                onClick={() => setPopupInfo(null)}
                aria-label="סגור חלון קופץ"
                style={{
                  padding: 0,
                  color: "#666",
                  lineHeight: 1,
                  fontSize: "16px",
                }}
              >
                <XLg size={14} />
              </Button>
            </div>
            <Card.Body style={{ padding: "10px" }}>
              <Card.Title style={{ fontSize: "1.5em" }}>
                <span style={{ fontWeight: "bold", fontSize: "0.8em" }}>
                  {popupInfo.name}
                </span>
              </Card.Title>
              {popupInfo.address?.length > 0 && (
                <Card.Text style={{ lineHeight: "0.9", fontSize: "1em" }}>
                  <span style={{ fontWeight: "bold" }}>כתובת: </span>
                  {popupInfo.address}
                </Card.Text>
              )}
              {popupInfo.tripTypes?.length > 0 && (
                <Card.Text style={{ lineHeight: "0.9", fontSize: "1em" }}>
                  <span style={{ fontWeight: "bold" }}>קטגוריה: </span>{" "}
                  {popupInfo.tripTypes.join(", ")}
                </Card.Text>
              )}
              {(popupInfo.durationText || popupInfo.distanceText) && (
                <Card.Text
                  style={{
                    fontSize: "1em",
                    backgroundColor: "#ffefef",
                    // padding: "2px 6px",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontWeight: "bold",
                    direction: "rtl",
                  }}
                >
                  {popupInfo.transportMode
                    ? popupInfo.transportMode
                        .replace("bicycling", "רכיבה באופניים: ")
                        .replace("transit", "תחבורה ציבורית: ")
                        .replace("walking", "הליכה: ")
                        .replace("driving", "נהיגה: ")
                    : popupInfo.transportMode}
                  {popupInfo.durationText
                    ? popupInfo.durationText
                        .replace("mins", "דק'")
                        .replace("min", "דק'")
                        .replace("hours", "שע' ו-")
                        .replace("hour", "שע' ו-")
                    : popupInfo.durationText}
                  {popupInfo.durationText && popupInfo.distanceText && " • "}
                  {popupInfo.distanceText &&
                    `מרחק: ${popupInfo.distanceText.replace("km", 'ק"מ')}`}
                </Card.Text>
              )}
              {popupInfo.nearbyPlaces && popupInfo.nearbyPlaces.length > 0 && (
                <Card.Text>
                  מקומות קרובים: {popupInfo.nearbyPlaces.length}
                </Card.Text>
              )}
              {/* <Card.Text>{popupInfo.address}</Card.Text> */}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleShowAndClose(popupInfo)}
              >
                <ThreeDots />
              </Button>
            </Card.Body>
          </Card>
        </Popup>
      )}
    </>
  );
}

export default Markers;
