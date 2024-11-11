import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Share } from "react-bootstrap-icons";

const Sharing = ({ location }) => {
  const handleDelete = () => {
    console.log(location);
  };

  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>שתף</Tooltip>}>
      <Button
        variant="outline-warning"
        onClick={handleDelete}
        // disabled={deleting}
      >
        <Share />
      </Button>
    </OverlayTrigger>
  );
};
export default Sharing;
