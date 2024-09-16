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


// import express from 'express';
// // const express = require('express');
// import cors from 'cors';
// import getByGeo from './node_app.js';
// import searchBox from './searchBox.js';
// import placeId from './placeId.js';
// // const { filterLocations } = require('./locationFilters');

// const app = express();
// const router = express.Router();
// const PORT = 4000 || 5000;
// console.log(PORT);
// app.use(express.json());
// app.use(cors())
// import { apiKeyG} from './apiKey.js';
// import filterLocations from './filterLocations.js';

// const apiKey = apiKeyG;
// // const emailKye = gmailKye;
// app.get('/places', async (req, res) => {
//     const { longitude, latitude } = req.query
//     await getByGeo(longitude, latitude, apiKey).then((map) => {
//         res.status(200).json(map)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })


// app.post('/filter-locations', async (req, res) => {
//     try {
//         const { locations, searchParams } = req.body;
//         const filteredLocations = await filterLocations({ locations, searchParams, apiKey });
//         res.status(200).json(filteredLocations);
//     } catch (error) {
//         console.error('Error in filtering locations:', error);
//         res.status(400).json({ error: 'Error processing request' });
//     }
// });


// app.get('/autocomplete', async (req, res) => {
//     const value = req.query
//     // console.log(value);
//     await searchBox(value, apiKey).then((map) => {
//         res.status(200).json(map)
//         // console.log(map);
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })


// app.get('/placeDetails', async (req, res) => {
//     const  value  = req.query
//     console.log(req.query);
//     await placeId(value, apiKey).then((map) => {
//         res.status(200).json(map)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })


// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });





// // router.route