// // import React, { useState, useEffect } from "react";
// // import {
// //   Offcanvas,
// //   Form,
// //   Button,
// //   InputGroup,
// //   Container,
// //   Row,
// //   Col,
// // } from "react-bootstrap";
// // import { useUserProfile } from "../connections/GetUserDate";
// // import placesData from "../../LocationsHebrewEnglish";
// // import { filterLocationsTarget } from "./filterLocationsComponent";

// // function TargetSearch({ show, onHide, onFilterChange }) {
// //   const [selectedPlacesForTrip, setSelectedPlacesForTrip] = useState({});
// //   const [selectedTripTypes, setSelectedTripTypes] = useState({});
// //   const [availablePlaces, setAvailablePlaces] = useState([]);
// //   const [availableTripTypes, setAvailableTripTypes] = useState([]);
// //   const { userData, loading, error } = useUserProfile();
// //   const [travelHours, setTravelHours] = useState(0);
// //   const [travelMinutes, setTravelMinutes] = useState(0);

// //   useEffect(() => {
// //     if (userData) {
// //       if (userData.selectedPlaces) {
// //         setAvailablePlaces(
// //           placesData.filter(
// //             (place) => userData.selectedPlaces[place.english] === true
// //           )
// //         );
// //       }
// //       if (userData.typesOfTrips) {
// //         const userPreferredTypes = Object.entries(userData.typesOfTrips)
// //           .filter(([_, value]) => value)
// //           .map(([key, _]) => key);
// //         setAvailableTripTypes(userPreferredTypes);
// //       }
// //     }
// //   }, [userData]);

// //   const handlePlaceCheckboxChange = (english, isChecked) => {
// //     setSelectedPlacesForTrip((prev) => ({ ...prev, [english]: isChecked }));
// //   };

// //   const handleTripTypeCheckboxChange = (tripType, isChecked) => {
// //     setSelectedTripTypes((prev) => ({ ...prev, [tripType]: isChecked }));
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     const selectedTypes = Object.entries(selectedTripTypes)
// //       .filter(([_, value]) => value === true)
// //       .reduce((acc, [key, _]) => ({ ...acc, [key]: true }), {});

// //     const totalTravelMinutes = travelHours * 60 + travelMinutes;

// //     const selectedPlaceNames = availablePlaces
// //       .filter((place) => selectedPlacesForTrip[place.english])
// //       .map((place) => place.hebrew);

// //     const filterParams = {
// //       selectedPlacesForTrip,
// //       selectedTypes,
// //       totalTravelMinutes,
// //       selectedPlaceNames,
// //       center: { latitude: 31.7023181, longitude: 34.9695526 }, // מרכז קבוע לדוגמה, יש להחליף בערך אמיתי
// //     };

// //     console.log("TargetSearch: Submitting filter params:", filterParams);

// //     try {
// //       const filteredLocations = await filterLocationsTarget(
// //         availablePlaces,
// //         filterParams
// //       );
// //       console.log("TargetSearch: Filtered locations:", filteredLocations);

// //       if (typeof onFilterChange === "function") {
// //         onFilterChange(filterParams);
// //         console.log(
// //           "TargetSearch: onFilterChange called with params:",
// //           filterParams
// //         );
// //       } else {
// //         throw new Error("onFilterChange is not a function");
// //       }

// //       handleClose();
// //     } catch (error) {
// //       console.error("Error in TargetSearch handleSubmit:", error);
// //     }
// //   };

// //   const resetSettings = () => {
// //     setSelectedPlacesForTrip({});
// //     setSelectedTripTypes({});
// //     setTravelHours(0);
// //     setTravelMinutes(0);
// //   };

// //   const handleClose = () => {
// //     resetSettings();
// //     onHide();
// //   };

// //   if (loading) return <div>טוען...</div>;
// //   if (error) return <div>שגיאה בטעינת הנתונים: {error.message}</div>;

// //   return (
// //     <Offcanvas
// //       show={show}
// //       onHide={handleClose}
// //       placement="end"
// //       style={{
// //         width: "350px",
// //         textAlign: "center",
// //       }}
// //     >
// //       <Offcanvas.Header closeButton>
// //         <Offcanvas.Title>חיפוש יעד מתאים</Offcanvas.Title>
// //       </Offcanvas.Header>
// //       <Offcanvas.Body >
// //         <Form onSubmit={handleSubmit}>
// //           <Container>
// //             <Row className="justify-content-center">
// //               <Col xs={12} className="text-center">
// //                 <p
// //                   style={{
// //                     fontWeight: "bold",
// //                     lineHeight: "1",
// //                     fontSize: "1.5em",
// //                   }}
// //                 >
// //                   חפש יעד מתאים
// //                 </p>
// //               </Col>
// //             </Row>

// //             <Row className="justify-content-center mb-3" >
// //               <Col xs={12}>
// //                 <Form.Group controlId="formTravelTime">
// //                   <Form.Label style={{ direction: "rtl" }}>זמן נסיעה מקסימלי:</Form.Label>
// //                   <InputGroup>
// //                     <Form.Control
// //                       type="number"
// //                       value={travelHours}
// //                       onChange={(e) => setTravelHours(Number(e.target.value))}
// //                       min="0"
// //                       max="24"
// //                     />
// //                     <InputGroup.Text>שעות</InputGroup.Text>
// //                     <Form.Control
// //                       type="number"
// //                       value={travelMinutes}
// //                       onChange={(e) => setTravelMinutes(Number(e.target.value))}
// //                       min="0"
// //                       max="59"
// //                     />
// //                     <InputGroup.Text>דקות</InputGroup.Text>
// //                   </InputGroup>
// //                 </Form.Group>
// //               </Col>
// //             </Row>

// //             <Row className="justify-content-center mb-3">
// //               <Col xs={12} className="text-center">
// //                 <p
// //                   style={{
// //                     fontWeight: "bold",
// //                     lineHeight: "1",
// //                     fontSize: "1.2em",
// //                     marginTop: "20px",

// //                   }}
// //                 >
// //                   בחר מקומות בקרבת היעד{" "}
// //                 </p>
// //               </Col>
// //               <Col xs={10} style={{ maxHeight: "30vh", overflowY: "auto" }}>
// //                 {availablePlaces.map(({ hebrew, english }) => (
// //                   <Form.Check
// //                     key={english}
// //                     type="checkbox"
// //                     id={`trip-${english}`}
// //                     label={hebrew}
// //                     checked={selectedPlacesForTrip[english] || false}
// //                     onChange={(e) =>
// //                       handlePlaceCheckboxChange(english, e.target.checked)
// //                     }
// //                   />
// //                 ))}
// //                 {availablePlaces.length === 0 && (
// //                   <p style={{ backgroundColor: "#FFE6E6",borderRadius: "10px",  direction: "rtl" }}>אין מקומות זמינים. אנא בחר העדפות בהגדרות.</p>
// //                 )}
// //               </Col>
// //             </Row>

// //             <Row className="justify-content-center mb-3">
// //               <Col xs={12} className="text-center">
// //                 <p style={{  fontWeight: "bold", marginTop: "20px" }}>
// //                   סיווג הטיול
// //                   <br /> (התאם את הטיול אישית)
// //                 </p>
// //               </Col>

// //               <Col
// //                 xs={10}
// //                 style={{
// //                   maxHeight: "30vh",
// //                   overflowY: "auto",
// //                   direction: "rtl",
// //                   width: "40%",
// //                 }}
// //               >
// //                 {availableTripTypes.map((tripType) => (
// //                   <Form.Check
// //                     key={tripType}
// //                     type="checkbox"
// //                     id={`trip-type-${tripType}`}
// //                     label={tripType}
// //                     checked={selectedTripTypes[tripType] || false}
// //                     onChange={(e) =>
// //                       handleTripTypeCheckboxChange(tripType, e.target.checked)
// //                     }
// //                   />
// //                 ))}
// //                 {availableTripTypes.length === 0 && (
// //                   <p style={{ backgroundColor: "#FFE6E6", borderRadius: "10px", }}>
// //                     אין סוגי טיול זמינים. אנא בחר העדפות בהגדרות.
// //                   </p>
// //                 )}
// //               </Col>
// //             </Row>

// //             <Row className="justify-content-center">
// //               <Col xs={6}>
// //                 <Button type="submit" variant="primary" className="w-100">
// //                   חפש
// //                 </Button>
// //               </Col>
// //             </Row>
// //           </Container>
// //         </Form>
// //       </Offcanvas.Body>
// //     </Offcanvas>
// //   );
// // }

// // export default TargetSearch;

// import React, { useState, useEffect } from "react";
// import {
//   Offcanvas,
//   Form,
//   Button,
//   InputGroup,
//   Container,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { useUserProfile } from "../connections/GetUserDate";
// import placesData from "../../LocationsHebrewEnglish";

// function TargetSearch({ show, onHide, onFilterChange }) {
//   const [selectedPlacesForTrip, setSelectedPlacesForTrip] = useState({});
//   const [selectedTripTypes, setSelectedTripTypes] = useState({});
//   const [availablePlaces, setAvailablePlaces] = useState([]);
//   const [availableTripTypes, setAvailableTripTypes] = useState([]);
//   const { userData, loading, error } = useUserProfile();
//   const [travelHours, setTravelHours] = useState(0);
//   const [travelMinutes, setTravelMinutes] = useState(0);
//   const [includeVisited, setIncludeVisited] = useState(false);

//   useEffect(() => {
//     if (userData) {
//       if (userData.selectedPlaces) {
//         setAvailablePlaces(
//           placesData.filter(
//             (place) => userData.selectedPlaces[place.english] === true
//           )
//         );
//       }
//       if (userData.typesOfTrips) {
//         const userPreferredTypes = Object.entries(userData.typesOfTrips)
//           .filter(([_, value]) => value)
//           .map(([key, _]) => key);
//         setAvailableTripTypes(userPreferredTypes);
//       }
//     }
//   }, [userData]);

//   const handlePlaceCheckboxChange = (english, isChecked) => {
//     setSelectedPlacesForTrip((prev) => ({ ...prev, [english]: isChecked }));
//   };

//   const handleTripTypeCheckboxChange = (tripType, isChecked) => {
//     setSelectedTripTypes((prev) => ({ ...prev, [tripType]: isChecked }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const selectedTypes = Object.entries(selectedTripTypes)
//       .filter(([_, value]) => value === true)
//       .reduce((acc, [key, _]) => ({ ...acc, [key]: true }), {});

//     const totalTravelMinutes = travelHours * 60 + travelMinutes;

//     const selectedPlaceNames = availablePlaces
//       .filter((place) => selectedPlacesForTrip[place.english])
//       .map((place) => place.hebrew);

//     const filterParams = {
//       selectedPlacesForTrip,
//       selectedTypes,
//       totalTravelMinutes,
//       selectedPlaceNames,
//       includeVisited,
//     };

//     console.log("TargetSearch: Submitting filter params:", filterParams);

//     if (typeof onFilterChange === "function") {
//       onFilterChange(filterParams);
//     } else {
//       console.error("onFilterChange is not a function");
//     }

//     handleClose();
//   };

//   const resetSettings = () => {
//     setSelectedPlacesForTrip({});
//     setSelectedTripTypes({});
//     setTravelHours(0);
//     setTravelMinutes(0);
//     setIncludeVisited(false);
//   };

//   const handleClose = () => {
//     resetSettings();
//     onHide();
//   };

//   if (loading) return <div>טוען...</div>;
//   if (error) return <div>שגיאה בטעינת הנתונים: {error.message}</div>;

//   return (
//     <Offcanvas
//       show={show}
//       onHide={handleClose}
//       placement="end"
//       style={{
//         textAlign: "end",
//       }}
//     >
//       <Offcanvas.Header closeButton>
//         <Offcanvas.Title>חיפוש יעד מתאים</Offcanvas.Title>
//       </Offcanvas.Header>
//       <Offcanvas.Body>
//         <Form onSubmit={handleSubmit}>
//           <Container>
//             <Row>
//               <Col xs={10}>
//                 <Form.Group controlId="formTravelTime">
//                   <Form.Label style={{ direction: "rtl" }}>
//                     זמן נסיעה מקסימלי:
//                   </Form.Label>
//                   <InputGroup>
//                     <Form.Control
//                       type="number"
//                       value={travelHours}
//                       onChange={(e) => setTravelHours(Number(e.target.value))}
//                       min="0"
//                       max="24"
//                     />
//                     <InputGroup.Text>שעות</InputGroup.Text>
//                     <Form.Control
//                       type="number"
//                       value={travelMinutes}
//                       onChange={(e) => setTravelMinutes(Number(e.target.value))}
//                       min="0"
//                       max="59"
//                     />
//                     <InputGroup.Text>דקות</InputGroup.Text>
//                   </InputGroup>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col
//                 xs={10}
//                 style={{
//                   fontWeight: "bold",
//                   maxHeight: "30vh",
//                   overflowY: "auto",
//                   marginTop: "15px",
//                 }}
//               >
//                 <Form.Check
//                   type="switch"
//                   id="include-visited-switch"
//                   label="כלול יעדים שביקרתי בהם"
//                   checked={includeVisited}
//                   onChange={(e) => setIncludeVisited(e.target.checked)}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Col xs={12}>
//                 <p
//                   style={{
//                     fontWeight: "bold",
//                     lineHeight: "1",
//                     fontSize: "1.2em",
//                     marginTop: "20px",
//                     textAlign: "center",
//                   }}
//                 >
//                   בחר מקומות בקרבת היעד{" "}
//                 </p>
//               </Col>
//               <Col xs={10} style={{ maxHeight: "30vh", overflowY: "auto" }}>
//                 {availablePlaces.map(({ hebrew, english }) => (
//                   <Form.Check
//                     key={english}
//                     type="switch"
//                     id={`trip-${english}`}
//                     label={hebrew}
//                     checked={selectedPlacesForTrip[english] || false}
//                     onChange={(e) =>
//                       handlePlaceCheckboxChange(english, e.target.checked)
//                     }
//                   />
//                 ))}
//                 {availablePlaces.length === 0 && (
//                   <p
//                     style={{
//                       backgroundColor: "#FFE6E6",
//                       borderRadius: "10px",
//                       direction: "rtl",
//                     }}
//                   >
//                     אין מקומות זמינים. אנא בחר העדפות בהגדרות.
//                   </p>
//                 )}
//               </Col>
//             </Row>

//             <Row>
//               <Col xs={12}>
//                 <p
//                   style={{
//                     fontWeight: "bold",
//                     marginTop: "20px",
//                     textAlign: "center",
//                   }}
//                 >
//                   קטגוריה{" "}
//                 </p>
//               </Col>

//               <Col
//                 xs={10}
//                 style={{
//                   maxHeight: "30vh",
//                   overflowY: "auto",
//                 }}
//               >
//                 {availableTripTypes.map((tripType) => (
//                   <Form.Check
//                     key={tripType}
//                     type="switch"
//                     id={`trip-type-${tripType}`}
//                     label={tripType}
//                     checked={selectedTripTypes[tripType] || false}
//                     onChange={(e) =>
//                       handleTripTypeCheckboxChange(tripType, e.target.checked)
//                     }
//                   />
//                 ))}
//                 {availableTripTypes.length === 0 && (
//                   <p
//                     style={{ backgroundColor: "#FFE6E6", borderRadius: "10px" }}
//                   >
//                     אין סוגי טיול זמינים. אנא בחר העדפות בהגדרות.
//                   </p>
//                 )}
//               </Col>
//             </Row>

//             <Row>
//               <Col xs={6} style={{ marginTop: "15px" }}>
//                 <Button type="submit" variant="primary" className="w-100">
//                   חפש
//                 </Button>
//               </Col>
//             </Row>
//           </Container>
//         </Form>
//       </Offcanvas.Body>
//     </Offcanvas>
//   );
// }

// export default TargetSearch;

import React, { useState, useEffect } from "react";
import {
  Offcanvas,
  Form,
  Button,
  InputGroup,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { useUserProfile } from "../connections/GetUserDate";
import placesData from "../../LocationsHebrewEnglish";
import { Bicycle, BusFront, CarFront, PersonWalking } from "react-bootstrap-icons";

function TargetSearch({ show, onHide, onFilterChange }) {
  const [selectedPlacesForTrip, setSelectedPlacesForTrip] = useState({});
  const [selectedTripTypes, setSelectedTripTypes] = useState({});
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [availableTripTypes, setAvailableTripTypes] = useState([]);
  const { userData, loading, error } = useUserProfile();
  const [travelHours, setTravelHours] = useState(0);
  const [travelMinutes, setTravelMinutes] = useState(0);
  const [includeVisited, setIncludeVisited] = useState(false);
  const [transportMode, setTransportMode] = useState('driving');

  useEffect(() => {
    if (userData) {
      if (userData.selectedPlaces) {
        setAvailablePlaces(
          placesData.filter(
            (place) => userData.selectedPlaces[place.english] === true
          )
        );
      }
      if (userData.typesOfTrips) {
        const userPreferredTypes = Object.entries(userData.typesOfTrips)
          .filter(([_, value]) => value)
          .map(([key, _]) => key);
        setAvailableTripTypes(userPreferredTypes);
      }
    }
  }, [userData]);

  const handlePlaceCheckboxChange = (english, isChecked) => {
    setSelectedPlacesForTrip((prev) => ({ ...prev, [english]: isChecked }));
  };

  const handleTripTypeCheckboxChange = (tripType, isChecked) => {
    setSelectedTripTypes((prev) => ({ ...prev, [tripType]: isChecked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedTypes = Object.entries(selectedTripTypes)
      .filter(([_, value]) => value === true)
      .reduce((acc, [key, _]) => ({ ...acc, [key]: true }), {});

    const totalTravelMinutes = travelHours * 60 + travelMinutes;

    const selectedPlaceNames = availablePlaces
      .filter((place) => selectedPlacesForTrip[place.english])
      .map((place) => place.hebrew);

    const filterParams = {
      selectedPlacesForTrip,
      selectedTypes,
      totalTravelMinutes,
      selectedPlaceNames,
      includeVisited,
      transportMode,
    };

    console.log("TargetSearch: Submitting filter params:", filterParams);

    if (typeof onFilterChange === "function") {
      onFilterChange(filterParams);
    } else {
      console.error("onFilterChange is not a function");
    }

    handleClose();
  };

  const resetSettings = () => {
    setSelectedPlacesForTrip({});
    setSelectedTripTypes({});
    setTravelHours(0);
    setTravelMinutes(0);
    setIncludeVisited(false);
    setTransportMode('driving');
  };

  const handleClose = () => {
    resetSettings();
    onHide();
  };

  if (loading) return <div>טוען...</div>;
  if (error) return <div>שגיאה בטעינת הנתונים: {error.message}</div>;

  const transportModes = [
    { value: 'driving', label: <CarFront color="block"/> },
    { value: 'walking', label: <PersonWalking color="block"/> },
    { value: 'bicycling', label: <Bicycle color="block"/> },
    { value: 'transit', label: <BusFront color="block"/> },
  ];

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{
        textAlign: "end",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>חיפוש יעד מתאים</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col xs={10}>
                <Form.Group controlId="formTravelTime">
                  <Form.Label style={{ direction: "rtl" }}>
                    זמן נסיעה מקסימלי:
                  </Form.Label>
                  <InputGroup >
                    <Form.Control
                      type="number"
                      value={travelHours}
                      onChange={(e) => setTravelHours(Number(e.target.value))}
                      min="0"
                      max="24"
                      color="bold"
                      style={{borderColor: '#0d6efd'}}
                    />
                    <InputGroup.Text style={{borderColor: '#0d6efd'}}>:שעות</InputGroup.Text>
                    <Form.Control
                      type="number"
                      style={{borderColor: '#0d6efd'}}
                      value={travelMinutes}
                      onChange={(e) => setTravelMinutes(Number(e.target.value))}
                      min="0"
                      max="59"
                      
                    />
                    <InputGroup.Text style={{borderColor: '#0d6efd'}}>:דקות</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={10}>
                <Form.Group controlId="formTransportMode">
                  <Form.Label style={{ direction: "rtl" }}>בחר סוג תחבורה:</Form.Label>
                  <ButtonGroup className="d-flex">
                    {transportModes.map((mode) => (
                      <Button
                        key={mode.value}
                        variant={transportMode === mode.value ? "primary" : "outline-primary"}
                        onClick={() => setTransportMode(mode.value)}
                        
                      >
                        {mode.label}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col
                xs={10}
                style={{
                  fontWeight: "bold",
                  maxHeight: "30vh",
                  overflowY: "auto",
                  marginTop: "15px",
                }}
              >
                <Form.Check
                  type="switch"
                  id="include-visited-switch"
                  label="כלול יעדים שביקרתי בהם"
                  checked={includeVisited}
                  onChange={(e) => setIncludeVisited(e.target.checked)}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <p
                  style={{
                    fontWeight: "bold",
                    lineHeight: "1",
                    fontSize: "1.2em",
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >
                  בחר מקומות בקרבת היעד{" "}
                </p>
              </Col>
              <Col xs={10} style={{ maxHeight: "30vh", overflowY: "auto" }}>
                {availablePlaces.map(({ hebrew, english }) => (
                  <Form.Check
                    key={english}
                    type="switch"
                    id={`trip-${english}`}
                    label={hebrew}
                    checked={selectedPlacesForTrip[english] || false}
                    onChange={(e) =>
                      handlePlaceCheckboxChange(english, e.target.checked)
                    }
                  />
                ))}
                {availablePlaces.length === 0 && (
                  <p
                    style={{
                      backgroundColor: "#FFE6E6",
                      borderRadius: "10px",
                      direction: "rtl",
                    }}
                  >
                    אין מקומות זמינים. אנא בחר העדפות בהגדרות.
                  </p>
                )}
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <p
                  style={{
                    fontWeight: "bold",
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >
                  קטגוריה{" "}
                </p>
              </Col>

              <Col
                xs={10}
                style={{
                  maxHeight: "30vh",
                  overflowY: "auto",
                }}
              >
                {availableTripTypes.map((tripType) => (
                  <Form.Check
                    key={tripType}
                    type="switch"
                    id={`trip-type-${tripType}`}
                    label={tripType}
                    checked={selectedTripTypes[tripType] || false}
                    onChange={(e) =>
                      handleTripTypeCheckboxChange(tripType, e.target.checked)
                    }
                  />
                ))}
                {availableTripTypes.length === 0 && (
                  <p
                    style={{ backgroundColor: "#FFE6E6", borderRadius: "10px" }}
                  >
                    אין סוגי טיול זמינים. אנא בחר העדפות בהגדרות.
                  </p>
                )}
              </Col>
            </Row>

            <Row>
              <Col xs={6} style={{ marginTop: "15px" }}>
                <Button type="submit" variant="primary" className="w-100">
                  חפש
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default TargetSearch;