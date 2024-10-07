import React, { useState, useEffect, useCallback } from "react";
import { useUserProfile } from "../connections/GetUserDate";
import MyMap from "../MapsAndLocations/MyMap";
import AddDestinationOffcanvas from "../MapsAndLocations/AddDestinationWindow";
import Button from "react-bootstrap/Button";
import { Compass, Map, PersonWalking, PlusLg } from "react-bootstrap-icons";
import TargetSearch from "../MapsAndLocations/TargetSearch";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import LocationList from "../MapsAndLocations/LocationList";
import FilterUI from "../MapsAndLocations/FilterUI";
import {
  filterLocationsUI,
  filterLocationsTarget,
} from "../MapsAndLocations/filterLocationsComponent";
import { useCenter } from "../MapsAndLocations/useCenter";
import CustomNavbar from "../pages/Navbar";

const Home = () => {
  const [locationsFiltered, setLocationsFiltered] = useState([]);
  const {
    userData,
    locations,
    loading: userDataLoading,
    error: userDataError,
  } = useUserProfile();
  const {
    center,
    loading: centerLoading,
    error: centerError,
    getCurrentCenter,
    updateCenter,
  } = useCenter();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showTargetSearch, setShowTargetSearch] = useState(false);
  const [showFilterUI, setShowFilterUI] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterParams, setFilterParams] = useState({});
  const [title, setTitle] = useState("רשימת היעדים שלי");

  const handleCenterChange = useCallback(
    (newCenter) => {
      // console.log("New center:", newCenter);
      updateCenter(newCenter);
    },
    [updateCenter]
  );

  useEffect(() => {
    if (Array.isArray(locations) && locations.length > 0) {
      if (activeFilter === "Target") {
        filterLocationsTarget(locations, { ...filterParams, center })
          .then((filteredResult) => {
            setLocationsFiltered(filteredResult);
          })
          .catch((error) => {
            console.error("Error in filterLocationsTarget:", error);
            setLocationsFiltered([]);
          });
      } else {
        const filteredResult = filterLocationsUI(locations, filterParams);
        setLocationsFiltered(filteredResult);
      }
    }
  }, [locations, activeFilter, filterParams, center]);

  useEffect(() => {
    // console.log("Current locations:", locations);
    // console.log("Current locationsFiltered:", locationsFiltered);
  }, [locations, locationsFiltered]);

  const handleFilterUIChange = (params) => {
    // console.log("FilterUI params:", params);
    setActiveFilter("UI");
    setFilterParams(params);
    setTitle("רשימת היעדים שלי");
    // console.log("Calling filterLocationsUI with params:", params);
    const filteredResult = filterLocationsUI(locations, params);
    // console.log("Filtered result:", filteredResult);
    setLocationsFiltered(filteredResult);
  };

  const handleTargetSearchChange = (params) => {
    console.log("Home: Received params from TargetSearch:", params);
    setActiveFilter("Target");
    setFilterParams(params);
    setTitle("בחירת יעד מתאים");
    // console.log(
    //   "Home: Updated state - activeFilter: 'Target', filterParams:",
    //   params
    // );
  };

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowTargetSearch = () => setShowTargetSearch(true);
  const handleCloseTargetSearch = () => setShowTargetSearch(false);
  const handleShowFilterUI = () => setShowFilterUI(true);
  const handleCloseFilterUI = () => setShowFilterUI(false);


  if (userDataLoading || centerLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner variant="primary" />
      </div>
    );
  if (userDataError) return <p>שגיאה בטעינת המידע: {userDataError.message}</p>;
  if (centerError) return <p>{centerError}</p>;

 

  return (
    <>
      <CustomNavbar titleData={title} />
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column",}}
      >
        {/* <h2
        style={{
          textAlign: "center",
          padding: "10px",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        {title}
      </h2> */}
        <div
          style={{
            // flexGrow: 1,
            display: "flex",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "60%",
              height: "100%",
              overflowY: "auto",
              margin: "7px",
            }}
          >
            <MyMap
              filteredLocations={locationsFiltered}
              onCenterChange={handleCenterChange}
              center={center}
              onRefreshCenter={getCurrentCenter}
            />
          </div>
          <div
            style={{
              width: "33%",
              height: "100%",
              overflowY: "auto",
              marginTop: "7px",
            }}
          >
            <LocationList locations={locationsFiltered} />
          </div>
          <div
            style={{
              width: "7%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: "10px",
            }}
          >
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip>הצגת היעדים שלי</Tooltip>}
            >
              <Button
                variant="primary"
                onClick={handleShowFilterUI}
                style={{ marginBottom: "10px" }}
              >
                <Map strokeWidth={3} width={24} height={24} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip>הוספת יעד</Tooltip>}
            >
              <Button
                variant="primary"
                onClick={handleShowOffcanvas}
                style={{ marginBottom: "10px" }}
              >
                <PlusLg strokeWidth={3} width={24} height={24} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip>חיפוש יעד מתאים לטיול</Tooltip>}
            >
              <Button variant="primary" onClick={handleShowTargetSearch}>
                <Compass strokeWidth={3} width={24} height={24} />
              </Button>
            </OverlayTrigger>
          </div>
        </div>

        <AddDestinationOffcanvas
          show={showOffcanvas}
          onHide={handleCloseOffcanvas}
        />
        <TargetSearch
          show={showTargetSearch}
          onHide={handleCloseTargetSearch}
          onFilterChange={handleTargetSearchChange}
        />
        <FilterUI
          show={showFilterUI}
          onHide={handleCloseFilterUI}
          onFilterChange={handleFilterUIChange}
        />
      </div>
    </>
  );
};

export default Home;
