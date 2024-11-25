import { useState, useEffect, useCallback } from "react";

const DEFAULT_CENTER = {
  latitude: 31.7798,
  longitude: 35.2087,
};

export const useCenter = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateCenter = useCallback((newCenter) => {
    setCenter(newCenter);
    setLoading(false);
    setError(null);
  }, []);

  const getCurrentCenter = useCallback(() => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateCenter({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("לא הצלחנו לקבל את המיקום הנוכחי");
          setCenter(DEFAULT_CENTER);
          setLoading(false);
        }
      );
    } else {
      setError("הדפדפן שלך לא תומך בשירותי מיקום");
      setCenter(DEFAULT_CENTER);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentCenter();
  }, [getCurrentCenter]);

  
if (center){  const handlePredictionClick = async (placeId) => {
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
};}

  return { center, loading, error, getCurrentCenter, updateCenter };
};
