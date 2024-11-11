import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../connections/AuthContext";
import { ListGroup } from "react-bootstrap";

const AutocompleteInput = ({ onPlaceSelect, text }) => {
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
    <div>
      <input
        id="autocomplete"
        placeholder={text}
        value={input}
        onChange={handleInputChange}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          textAlign: "right",
          direction: "rtl",
          borderColor: "#0d6efd",
        }}
      />

      {predictions.length > 0 && (
        <ListGroup
          style={{
            position: "absolute",
            zIndex: 1000,
            width: "90%",
            maxWidth: '400px',
            backgroundColor: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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
