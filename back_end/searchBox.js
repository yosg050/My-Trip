import axios from 'axios';



const searchBox = async (value, apiKey) => {
  // console.log("server: ", value);
  const strValue = value.input;
  // console.log("server: ", strValue);

  // let strValue =  encodeURIComponent(ensureString(value));
  //   if (!input) {
  //   return res.status(400).json({ error: 'Missing input parameter' });
  // }
  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${strValue}&components=country:il&language=he`
    // console.log((url));
    const response = await axios.get(url);
    // console.log("A:", response.data);
    // console.log("B:",response)

    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    return "Wrong"
  }
}
export default searchBox
