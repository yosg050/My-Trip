import { useState, useRef } from "react";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { Compass } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { FaWaze } from "react-icons/fa";
import { TbBrandGoogleMaps } from "react-icons/tb";

function Navigation({ location, onButtonClick }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const ref = useRef(null);

  const latitude = location.latitude;
  const longitude = location.longitude;

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
    if (onButtonClick) {
      setDeleting(true);
      onButtonClick().finally(() => setDeleting(false));
    }
  };

  const handleHide = () => {
    setShow(false);
  };

  const openWaze = () => {
    window.open(
      `https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`,
      "_blank"
    );
  };

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
      "_blank"
    );
  };

  return (
    <div ref={ref}>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>נווט ליעד</Tooltip>}>
        <Button
          variant="outline-info"
          onClick={handleClick}
          disabled={deleting}
        >
          <Compass />
        </Button>
      </OverlayTrigger>

      <Overlay
        show={show}
        target={target}
        placement="top"
        container={ref}
        containerPadding={20}
        rootClose
        onHide={handleHide}
      >
        <Popover id="popover-contained">
          <Popover.Header style={{ fontSize: "1em", lineHeight: "0.4" ,  textAlign: 'center'}}>
            נווט ליעד
          </Popover.Header>
          <Popover.Body>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Waze</Tooltip>}>
            <Button variant="link" onClick={openWaze}>
              <FaWaze size={24} />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Google Maps</Tooltip>}>
            <Button variant="link" onClick={openGoogleMaps}>
              <TbBrandGoogleMaps size={24} />
            </Button>
          </OverlayTrigger>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

export default Navigation;
