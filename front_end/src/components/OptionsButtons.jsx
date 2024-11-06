import React from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { Map, PlusLg, Compass } from "react-bootstrap-icons";


const OptionsButtons =({
  handleShowFilterUI,
  handleShowOffcanvas,
  handleShowTargetSearch
}) => {

  return (
    <div
      style={{
        width: "5%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "10px"
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
          variant="outline-primary"
          size="lg"
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
        <Button
          variant="outline-primary"
          size="lg"
          onClick={handleShowTargetSearch}
        >
          <Compass strokeWidth={3} width={24} height={24} />
        </Button>
      </OverlayTrigger>
    </div>
  );
};
export default OptionsButtons