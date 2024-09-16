import axios from 'axios';



const placeId = async (value, apiKey) => {
  console.log("ID: ", value);
  const strValue = value.placeId;
  console.log("server: ", strValue);


  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${strValue}&key=${apiKey}&language=he`
    console.log((url));
    const response = await axios.get(url);
    // console.log("A:", response.data);
    // console.log("B:",response)

    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    return "Wrong"
  }
}
export default placeId