import axios from 'axios';
import fs from 'fs';

async function placesAroundResults(placesForTrip, finalFilteredLocations, apiKey) {


  const placesAround = async (placeType, location) => {
    const latitude = location.latitude
    const longitude = location.longitude
    // const {latitude, location} = location

    try {
      const radius = 500;
      const types = "supermarket";


      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${latitude},${longitude}&radius=${radius}&type=${placeType}`;
      const response = await axios.get(url);

      if (response.data.results.length > 0) {
        const dataResults = response.data.results
        for (const i of dataResults) {

          Object.assign(i, { placeType })
        }
      }

      console.log('Response data Server:', response.data);

      return response.data

    } catch (error) {
      console.error('Error:', error.message);
      return "Wrong"
    }
  };

  const processLocation = async (location) => {
    const placesAroundResponse = await Promise.all(
      placesForTrip.map(async (placeType) => {
        const response = await placesAround(placeType, location);


        // console.log(response.results);
        
       return {response}
      })
    );
  
    const allPlacesFound = placesAroundResponse.every(
      ({ response }) => response !== "Wrong" && response.results && response.results.length > 0
    );

    if (allPlacesFound) {
      const placesAround = finalFilteredLocations.placesAround || {}; 
      placesAroundResponse.forEach(({ placeType, response }) => {
        if (!placesAround[placeType]) {

          placesAround[placeType] = [];
        }
   
        const newPlaces = response.results.map(place => ({
          type: place.placeType,
          name: place.name,
          rating: place.rating,
          openNow: place.opening_hours ? place.opening_hours.open_now : null,
          // placeLocation: place.geometry.location,
          latitude:  place.geometry.location.lat,
          longitude:  place.geometry.location.lng,

        }));
        placesAround[placeType].push(...newPlaces); 
      });
    
      return { ...location, placesAround };
    }

    return null; 
  };


  const filteredLocations = await Promise.all(finalFilteredLocations.map(processLocation));



  return filteredLocations.filter(Boolean); // Remove null entries
}

export default placesAroundResults
