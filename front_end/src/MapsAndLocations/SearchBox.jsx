import React, { useState } from "react";
import axios from "axios";
import { Popup } from "mapbox-gl";
import { useAuth } from "../connections/AuthContext";
import { ListGroup } from "react-bootstrap";

const AutocompleteInput = ({ onPlaceSelect }) => {
  const [input, setInput] = useState("");
  const [predictions, setPredictions] = useState([]);
  const { user } = useAuth();
  const userEmail = user.email;
  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInput(value);
    try {
      const response = await axios.get(
        `http://localhost:4000/autocomplete?input=${value}`
      );
      if (response.data && Array.isArray(response.data.predictions)) {
        setPredictions(response.data.predictions);
      } else {
        console.error(
          "Response does not contain predictions array",
          response.data
        );
        setPredictions([]);
      }
    } catch (error) {
      console.error(error);
      setPredictions([]);
    }
  };

  const handlePredictionClick = async (placeId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/placeDetails?placeId=${placeId}`
      );
      console.log(response.data);

      const newTarget = {
        name: response.data.result.name,
        address: response.data.result.formatted_address,
        latitude: response.data.result.geometry.location.lat,
        longitude: response.data.result.geometry.location.lng,
        place_id: response.data.result.place_id,
      };

      console.log(newTarget);

      // קריאה ל-onPlaceSelect כדי להעביר את הערך שנבחר חזרה לרכיב האב
      if (onPlaceSelect) {
        onPlaceSelect(newTarget);
      }

      setInput("");
      setPredictions([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-w-[300px]">
      <input
        id="autocomplete"
        placeholder="חפש יעד"
        value={input}
        onChange={handleInputChange}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #e5e7eb",
          borderRadius: "4px",
          textAlign: "right",
          direction: "rtl",
        }}
      />

      {predictions.length > 0 && (
        <ListGroup
          style={{
            position: "absolute", // הפוך את הרשימה לאבסולוטית
            zIndex: 1000, // תן לה עדיפות גבוהה יותר בהצגה
            width: "90%", // ודא שהרשימה תתאים לרוחב ה-input
            backgroundColor: "white", // רקע לבן לרשימה
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // הצללה קלה
          }}
        >
          {predictions.map((prediction, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => handlePredictionClick(prediction.place_id)}
              style={{
                padding: "8px",
                cursor: "pointer",
                textAlign: "right",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#38a169")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              {prediction.description}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default AutocompleteInput;
