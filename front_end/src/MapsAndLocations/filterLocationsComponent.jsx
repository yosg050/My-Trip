import axios from "axios";

export function filterLocationsUI(
  locations,
  { visited, notVisited, searchTerm } = {}
) {
  if (!Array.isArray(locations)) {
    console.error("Locations is not an array:", locations);
    return [];
  }

  let filtered = locations;

  if (
    visited !== undefined &&
    notVisited !== undefined &&
    visited !== notVisited
  ) {
    filtered = filtered.filter((location) => {
      if (visited) return location.visit === true;
      if (notVisited) return location.visit === false;
      return true;
    });
  }

  if (searchTerm) {
    filtered = filtered.filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filtered;
}

// export async function filterLocationsTarget(
//   locations,
//   {
//     selectedTypes = {},
//     totalTravelMinutes = 0,
//     selectedPlacesForTrip = {},
//     center = null,
//   } = {}
// ) {
//   console.log("filterLocationsTarget called with:", {
//     locationsCount: locations.length,
//     selectedTypes,
//     totalTravelMinutes,
//     selectedPlacesForTrip,
//     center,
//   });

//   if (!Array.isArray(locations)) {
//     console.error("Locations is not an array:", locations);
//     return [];
//   }

//   // Remove all visited locations
//   let filteredLocations = locations.filter((location) => !location.visit);

//   console.log(
//     `Removed ${locations.length - filteredLocations.length} visited locations`
//   );
//   console.log(
//     "Locations removed:",
//     locations.filter((loc) => loc.visit).map((loc) => loc.name)
//   );

//   // Apply other filters
//   filteredLocations = filteredLocations.filter((location) => {
//     if (!location.tripTypes || !Array.isArray(location.tripTypes)) {
//       return false;
//     }

//     const hasSelectedTypes =
//       Object.keys(selectedTypes).length === 0 ||
//       Object.entries(selectedTypes).some(
//         ([type, isSelected]) => isSelected && location.tripTypes.includes(type)
//       );

//     return hasSelectedTypes;
//   });

//   console.log(
//     "Filtered locations before server request:",
//     filteredLocations.map((loc) => loc.name)
//   );

//   const selectedPlacesForTripEnglish = Object.keys(
//     selectedPlacesForTrip
//   ).reduce((acc, key) => {
//     if (selectedPlacesForTrip[key] === true) {
//       acc[key] = true;
//     }
//     return acc;
//   }, {});

//   const searchParams = {
//     selectedTypes,
//     totalTravelMinutes,
//     selectedPlacesForTrip: selectedPlacesForTripEnglish,
//     center,
//   };

//   console.log("Search params being sent to server:", searchParams);

//   try {
//     const response = await axios.post(
//       "http://localhost:4000/filter-locations",
//       {
//         locations: filteredLocations,
//         searchParams: searchParams,
//       }
//     );

//     if (response.data && Array.isArray(response.data)) {
//       filteredLocations = response.data;
//       console.log(
//         "Filtered locations after server response:",
//         filteredLocations.map((loc) => loc.name)
//       );
//     } else {
//       console.warn(
//         "Server did not return valid data, using client-side filtered results"
//       );
//     }
//   } catch (error) {
//     console.error("Error in server request:", error);
//     console.warn("Using client-side filtered results due to server error");
//   }

//   // Final check to ensure no visited locations
//   filteredLocations = filteredLocations.filter((location) => !location.visit);

//   console.log(
//     "Final filtered locations:",
//     filteredLocations.map((loc) => loc.name)
//   );
//   return filteredLocations;
// }
export async function filterLocationsTarget(
  locations,
  {
    selectedTypes = {},
    totalTravelMinutes = 0,
    selectedPlacesForTrip = {},
    center = null,
    includeVisited = false,
    transportMode = 'driving',  // הוספנו פרמטר חדש
  } = {}
) {
  console.log("filterLocationsTarget called with:", {
    locationsCount: locations.length,
    selectedTypes,
    totalTravelMinutes,
    selectedPlacesForTrip,
    center,
    includeVisited,
    transportMode,  // לוג הפרמטר החדש
  });

  if (!Array.isArray(locations)) {
    console.error("Locations is not an array:", locations);
    return [];
  }

  // סינון מיקומים מבוקרים בהתאם לפרמטר includeVisited
  let filteredLocations = includeVisited
    ? locations
    : locations.filter((location) => !location.visit);

  console.log(
    `${includeVisited ? "Included" : "Removed"} ${locations.length - filteredLocations.length} visited locations`
  );

  // החלת סינונים נוספים
  filteredLocations = filteredLocations.filter((location) => {
    if (!location.tripTypes || !Array.isArray(location.tripTypes)) {
      return false;
    }

    const hasSelectedTypes =
      Object.keys(selectedTypes).length === 0 ||
      Object.entries(selectedTypes).some(
        ([type, isSelected]) => isSelected && location.tripTypes.includes(type)
      );

    return hasSelectedTypes;
  });

  console.log(
    "Filtered locations before server request:",
    filteredLocations.map((loc) => loc.name)
  );

  const selectedPlacesForTripEnglish = Object.keys(
    selectedPlacesForTrip
  ).reduce((acc, key) => {
    if (selectedPlacesForTrip[key] === true) {
      acc[key] = true;
    }
    return acc;
  }, {});

  const searchParams = {
    selectedTypes,
    totalTravelMinutes,
    selectedPlacesForTrip: selectedPlacesForTripEnglish,
    center,
    includeVisited,
    transportMode,  // הוספת הפרמטר החדש לבקשת השרת
  };

  console.log("Search params being sent to server:", searchParams);

  try {
    const response = await axios.post(
      "http://localhost:4000/filter-locations",
      {
        locations: filteredLocations,
        searchParams: searchParams,
      }
    );

    if (response.data && Array.isArray(response.data)) {
      filteredLocations = response.data;
      console.log(
        "Filtered locations after server response:",
        filteredLocations.map((loc) => loc.name)
      );
    } else {
      console.warn(
        "Server did not return valid data, using client-side filtered results"
      );
    }
  } catch (error) {
    console.error("Error in server request:", error);
    console.warn("Using client-side filtered results due to server error");
  }

  // הסרת הבדיקה הסופית או עדכונה בהתאם ל-includeVisited
  if (!includeVisited) {
    filteredLocations = filteredLocations.filter((location) => !location.visit);
  }

  console.log(
    "Final filtered locations:",
    filteredLocations.map((loc) => loc.name)
  );
  return filteredLocations;
}