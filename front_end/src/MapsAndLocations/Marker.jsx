
import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-map-gl";
import { GeoAltFill, PinFill, XLg } from "react-bootstrap-icons";
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
        >
          <Card
            style={{
              width: "100%",
              border: "none",
              textAlign: "right",
              direction: "rtl",
              minWidth: "150px",
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
                {popupInfo.name}
              </Card.Title>
              <Card.Text>{popupInfo.address}</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleShowAndClose(popupInfo)}
              >
                הצג
              </Button>
            </Card.Body>
          </Card>
        </Popup>
      )}
    </>
  );
}

export default Markers;
