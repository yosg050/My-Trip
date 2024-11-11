import React, { useState, useEffect, useCallback } from "react";
import { useCenter } from "./useCenter";
import { Spinner } from "react-bootstrap";
import AutocompleteInput from "./SearchBox";

const CenterManagement = ({ onCenterChange }) => {
  const {
    center,
    loading: centerLoading,
    error: centerError,
    getCurrentCenter,
    updateCenter,
  } = useCenter();

  useEffect(() => {
    getCurrentCenter();
  }, [getCurrentCenter]);

  const handlePlaceSelect = useCallback(
    (selectedPlace) => {
      const newLocation = {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      };
      updateCenter(newLocation);
      onCenterChange(newLocation);
    },
    [onCenterChange, updateCenter]
  );
  console.log(center);
  

  if (centerLoading) {
    return (
      <div
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
        <p style={{ marginBottom: "0px", lineHeight: "0.9" }}>
          שינוי נקודת מוצא
        </p>
        <Spinner variant="primary" />
      </div>
    );
  }

  if (centerError) {
    return (
      <div
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
        <p style={{ marginBottom: "0px", lineHeight: "0.9" }}>
          שינוי נקודת מוצא
        </p>
        <div>Error: {centerError}</div>
      </div>
    );
  }

  return (
    <div
 
    >
      <AutocompleteInput
        onPlaceSelect={handlePlaceSelect}
        text="שינוי מיקום נוכחי"
      />
    </div>
  );
};

export default CenterManagement;
