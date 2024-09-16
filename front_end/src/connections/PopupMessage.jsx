import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function PopupMessage({ show, onClose, variant, duration, message }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  return (
    <>
      {show && (
        <Alert variant={variant} onClose={onClose} dismissible>
          {message}
        </Alert>
      )}
    </>
  );
}

export default PopupMessage;