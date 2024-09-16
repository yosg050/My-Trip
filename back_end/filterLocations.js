import axios from 'axios';

async function filterLocations({ locations, searchParams, apiKey }) {
  console.log('Received request for filterLocations');
  
  console.log('Detailed incoming parameters:');
  console.log('searchParams:', JSON.stringify(searchParams, null, 2));
  console.log('apiKey:', apiKey ? 'Provided (last 4 chars: ' + apiKey.slice(-4) + ')' : 'Not provided');
  console.log('Locations:', locations.map(loc => ({
    name: loc.name,
    latitude: loc.latitude,
    longitude: loc.longitude,
    visit: loc.visit
  })));

  const { 
    center, 
    totalTravelMinutes, 
    includeVisited,
    transportMode
  } = searchParams;
  
  if (!locations || locations.length === 0) {
    console.log('No locations to filter');
    return [];
  }

  if (!center || !center.latitude || !center.longitude) {
    console.log('Invalid center coordinates, returning all locations');
    return locations;
  }

  let filteredLocations = locations;

  if (!includeVisited) {
    filteredLocations = filteredLocations.filter(location => !location.visit);
    console.log(`Removed ${locations.length - filteredLocations.length} visited locations`);
  }

  const finalFilteredLocations = [];

  const validModes = ['driving', 'walking', 'bicycling', 'transit'];
  const mode = validModes.includes(transportMode) ? transportMode : 'driving';

  // בדיקת תקינות ה-API key
  try {
    const testUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=0,0&destinations=0,0&key=${apiKey}`;
    const testResponse = await axios.get(testUrl);
    if (testResponse.data.status === 'REQUEST_DENIED') {
      throw new Error(`API key is invalid or unauthorized: ${testResponse.data.error_message}`);
    }
  } catch (error) {
    console.error('Error validating API key:', error.message);
    throw new Error('Failed to validate API key. Please check your Google Maps API key and ensure it has the necessary permissions.');
  }

  for (const location of filteredLocations) {
    if (!location.latitude || !location.longitude) {
      console.log(`Skipping location ${location.name} due to missing coordinates`);
      continue;
    }

    try {
      const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${center.latitude},${center.longitude}&destinations=${location.latitude},${location.longitude}&mode=${mode}&key=${apiKey}`;
      console.log(`Requesting distance matrix for ${location.name} with mode: ${mode}`);
      const response = await axios.get(distanceMatrixUrl);

      console.log(`Raw API response for ${location.name}:`, JSON.stringify(response.data, null, 2));

      if (response.data.status === 'OK' && response.data.rows[0].elements[0].status === 'OK') {
        const distanceText = response.data.rows[0].elements[0].distance.text;
        const durationText = response.data.rows[0].elements[0].duration.text;
        const durationInMinutes = Math.round(response.data.rows[0].elements[0].duration.value / 60);

        console.log(`Location: ${location.name}, Duration: ${durationText}, Distance: ${distanceText}, Mode: ${mode}`);

        if (totalTravelMinutes === 0 || durationInMinutes <= totalTravelMinutes) {
          finalFilteredLocations.push({
            ...location,
            distanceText,
            durationText,
            durationInMinutes,
            transportMode: mode
          });
          console.log(`Added ${location.name} to filtered locations`);
        } else {
          console.log(`Filtered out ${location.name} due to long travel time`);
        }
      } else {
        console.log(`Skipping location ${location.name} due to Distance Matrix API error: ${response.data.status}`);
      }
    } catch (error) {
      console.error(`Error calculating distance for ${location.name}:`, error.message);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  }

  console.log('Final filtered locations:');
  finalFilteredLocations.forEach((location, index) => {
    console.log(`${index + 1}. ${location.name} - Distance: ${location.distanceText}, Duration: ${location.durationText}, Mode: ${location.transportMode}`);
  });

  console.log(`Total filtered locations: ${finalFilteredLocations.length}`);

  finalFilteredLocations.sort((a, b) => a.durationInMinutes - b.durationInMinutes);

  return finalFilteredLocations;
}

export default filterLocations;