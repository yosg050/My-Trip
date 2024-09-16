function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.log("The browser does not support - Geolocation");
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      console.log("Starts asking for a location");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location successfully received");
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.log("Error getting location:", error.code);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error("User denied the request for Geolocation."));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error("Location information is unavailable."));
              break;
            case error.TIMEOUT:
              reject(new Error("The request to get user location timed out."));
              break;
            default:
              reject(new Error("An unknown error occurred."));
              break;
          }
        }
      );
    }
  });
}


export default getCurrentLocation





