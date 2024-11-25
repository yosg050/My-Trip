import React, { useState, useEffect, useRef, useCallback } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Marker";
import { Spinner } from "react-bootstrap";
import LocationModal from "./LocationModal"; 

const TOKEN =
  "pk.eyJ1IjoieW9zZWZnZWxsZXIiLCJhIjoiY2x2dGJtbHVwMHh2dzJxbzk5a2JueHV5YyJ9.p-P__VkKDeLIw6rXu3qzIA";

const PinIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
    />
  </svg>
);

function MyMap({
  filteredLocations,
  center,
  onLocationUpdate,
}) {
  const [viewState, setViewState] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 15,
  });
  const [mapSize, setMapSize] = useState({ width: "100%", height: "90vh" });
  const mapContainerRef = useRef(null);
  const mapRef = useRef();
  const [popupInfo, setPopupInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const updateMapSize = useCallback(() => {
    if (mapContainerRef.current) {
      const { offsetWidth } = mapContainerRef.current.parentElement;
      const windowHeight = window.innerHeight;
      const bottomMargin = 1;

      setMapSize({
        width: `${offsetWidth}px`,
        height: '100%'
      });
    }
  }, []);

  useEffect(() => {
    updateMapSize();
    window.addEventListener("resize", updateMapSize);
    return () => window.removeEventListener("resize", updateMapSize);
  }, [updateMapSize]);

  useEffect(() => {
    setViewState({
      longitude: center.longitude,
      latitude: center.latitude,
      zoom: 12,
    });
  }, [center]);


  const handleShow = useCallback((location) => {
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

  if (!center) {
    return (

        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <Spinner  variant="primary"/>
        </div>
   
    );
  }

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: mapSize.width,
        height: mapSize.height,

      }}
      className="rounded"
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "98%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Markers
          locations={filteredLocations}
          onLocationUpdate={handleLocationUpdate}
          handleShow={handleShow}
        />
        <Marker
          latitude={center.latitude}
          longitude={center.longitude}
          anchor="bottom"
        >
          <div
            onMouseEnter={() => setPopupInfo(center)}
            onMouseLeave={() => setPopupInfo(null)}
          >
            <PinIcon size={32} color="#000000" />
          </div>
        </Marker>
        {popupInfo && (
          <Popup
            latitude={popupInfo.latitude}
            longitude={popupInfo.longitude}
            anchor="top"
            closeButton={false}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            offset={[0, -10]}
          >
            <div >מיקום נוכחי</div>
          </Popup>
        )}
        {/* <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            padding: "5px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            zIndex: 1,
            textAlign: "end",
          }}
        >
          <p style={{ marginBottom: "0px" , lineHeight: "0.9",}}>שינוי נקודת מוצא</p>
          <AutocompleteInput onPlaceSelect={handlePlaceSelect} />
        </div> */}
      </Map>
      <LocationModal
        show={showModal}
        handleClose={handleClose}
        location={selectedLocation}
        onLocationUpdate={handleLocationUpdate}
      />
    </div>
  );
}

export default MyMap;
