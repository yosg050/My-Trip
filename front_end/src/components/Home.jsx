import React, { useState, useEffect, useCallback } from "react";
import { useUserProfile } from "../connections/GetUserDate";
import MyMap from "../MapsAndLocations/MyMap";
import AddDestinationOffcanvas from "../MapsAndLocations/AddDestinationWindow";
import Button from "react-bootstrap/Button";
import { CardList, Compass, Map, PinMap, PlusLg } from "react-bootstrap-icons";
import TargetSearch from "../MapsAndLocations/TargetSearch";
import { ButtonGroup, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import LocationList from "../MapsAndLocations/LocationList";
import FilterUI from "../MapsAndLocations/FilterUI";
import {
  filterLocationsUI,
  filterLocationsTarget,
} from "../MapsAndLocations/filterLocationsComponent";
import { useCenter } from "../MapsAndLocations/useCenter";
import logoImage from "../assets/logo3.png";
import ProfileButton from "./ImegeButton";
import useMobile from "./UseMobile";
import CenterManagement from "../MapsAndLocations/NewCenter";

const Home = () => {
  const isMobile = useMobile();
  const [transportMode, setTransportMode] = useState(1);

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
  const listLocations = "היעדים שלי";
  const choiceLocations = "בחירת יעד מתאים";
  const [title, setTitle] = useState(listLocations);

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

  useEffect(() => {}, [locations, locationsFiltered]);

  const handleFilterUIChange = (params) => {
    setActiveFilter("UI");
    setFilterParams(params);
    setTitle(listLocations);
    const filteredResult = filterLocationsUI(locations, params);
    setLocationsFiltered(filteredResult);
  };

  const handleTargetSearchChange = (params) => {
    console.log("Home: Received params from TargetSearch:", params);
    setActiveFilter("Target");
    setFilterParams(params);
    setTitle(choiceLocations);
  };

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowTargetSearch = () => setShowTargetSearch(true);
  const handleCloseTargetSearch = () => setShowTargetSearch(false);
  const handleShowFilterUI = () => setShowFilterUI(true);
  const handleCloseFilterUI = () => setShowFilterUI(false);

  if (userDataLoading || centerLoading)
    return (
      <div style={{ height: "80vh" }}>
        <Spinner variant="outline-primary" />
      </div>
    );
  if (userDataError) return <p>שגיאה בטעינת המידע: {userDataError.message}</p>;
  if (centerError) return <p>{centerError}</p>;

  const refreshButton = () => {
    window.location.reload();
  };
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          marginTop: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "1%",
            marginRight: "1%",
            marginBottom: "1px",
          }}
        >
          <ProfileButton />
          {!isMobile && (
            <CenterManagement
              onCenterChange={handleCenterChange}
              style={{
                textAlign: "center",
                alignSelf: "end",
              }}
            />
          )}

          <h2
            style={{
              fontWeight: "bold",
              fontSize: "clamp(12px, 5vw, 38px)",
              textAlign: "center",
              marginLeft: "5%",
            }}
          >
            {title}
          </h2>

          <div>
            <Button variant="link" onClick={refreshButton}>
              <img
                src={logoImage}
                width={isMobile ? "75" : " 165"}
                height={isMobile ? "30" : " 66"}
                alt="MyTrip Logo"
              />
            </Button>
          </div>
        </div>

        <div
          style={{
            // flexGrow: 1,
            display: "flex",
            overflow: "hidden",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {/* <CenterManagement  onCenterChange={handleCenterChange}/> */}
          {isMobile && (
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
              <CenterManagement
                onCenterChange={handleCenterChange}
                style={{
                  // textAlign: "center",
                  // alignSelf: "end",
                }}
              />
              <ButtonGroup  style={{ margin: "10px" }}>
                <Button
                  variant={transportMode === 1 ? "primary" : "outline-primary"}
                  onClick={() => setTransportMode(1)}
                >
                  <CardList />
                </Button>
                <Button
                  variant={transportMode === 2 ? "primary" : "outline-primary"}
                  onClick={() => setTransportMode(2)}
                >
                  <Map />
                </Button>
              </ButtonGroup>
            </div>
          )}
          {!isMobile ? (
            <>
              <div
                style={{
                  width: "58%",
                  height: "100%",
                  marginRight: "7px",
                  marginLeft: "2px",
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
                  width: "35%",
                  height: "100%",
                  overflowY: "auto",
                  // marginTop: "7px",
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // Internet Explorer 10+
                }}
              >
                <LocationList locations={locationsFiltered} />
              </div>
            </>
          ) : transportMode === 1 ? (
            <div
              style={{
                width: "100%",
                height: "500vh",
                overflowY: "auto",
                // marginTop: "7px",
                marginLeft: "5px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <LocationList locations={locationsFiltered} />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "500vh",
                overflowY: "hidden",
              }}
            >
              <MyMap
                filteredLocations={locationsFiltered}
                onCenterChange={handleCenterChange}
                center={center}
                onRefreshCenter={getCurrentCenter}
              />
            </div>
          )}

          <div
            style={{
              width: isMobile ? "100%" : "auto",
              height: isMobile ? "auto" : "100vh",
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              justifyContent: isMobile ? "center" : "flex-start",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip>הצגת היעדים שלי</Tooltip>}
            >
              <Button
                variant="outline-primary"
                size="lg"
                onClick={handleShowFilterUI}
                style={{ margin: "10px" }}
              >
                <PinMap strokeWidth={3} width={24} height={24} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip>הוספת יעד</Tooltip>}
            >
              <Button
                variant="outline-primary"
                size="lg"
                onClick={handleShowOffcanvas}
                style={{ margin: "10px" }}
              >
                <PlusLg strokeWidth={3} width={24} height={24} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="left"
              overlay={
                <Tooltip>
                  חיפוש יעד <br />
                  מתאים לטיול
                </Tooltip>
              }
            >
              <Button
                variant="outline-primary"
                size="lg"
                onClick={handleShowTargetSearch}
                style={{ margin: "10px" }}
              >
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
