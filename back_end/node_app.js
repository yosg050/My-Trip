import axios from 'axios';

const getByGeo = async (longitude, latitude, apiKey) => {

  try {
    const radius = 250;
    const keyword = "cruise";
    const types = "supermarket";


    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${latitude},${longitude}&radius=${radius}&type=${types}`;

    const response = await axios.get(url);
    console.log('Response:', response); // Print response to console

    return response.data
  } catch (error) {
    console.error('Error:', error.message);
    return "Wrong"
  }
}
export default getByGeo



// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




// http://localhost:3000/places?latitude=32.08554209632055&longitude=34.835144259621856


// keyword=${keyword}&

// https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyB3VsoS6NJQoT8rPz_zuobAjtZCbXjyHtY&location=(31.77980,35.20870)&radius=500&type=synagogue
// query=public toilets -- טקסט לחיפוש
