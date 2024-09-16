import { useState, useEffect, useCallback } from 'react';

const DEFAULT_CENTER = {
  latitude: 31.7798,
  longitude: 35.2087
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
    if ("geolocation" in navigator) { // שינוי מ-"geoCenter" ל-"geolocation"
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateCenter({ // שינוי מ-updateLocation ל-updateCenter
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
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

  return { center, loading, error, getCurrentCenter, updateCenter };
};