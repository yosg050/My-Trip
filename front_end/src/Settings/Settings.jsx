import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import CategorySelection from "./InformationListForTrip";
import TripTypes from "./TypesOfTrips";
import UserStatus from "../components/userStatus";

function Settings({ show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          הגדרות
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ height: "80vh", overflowY: "auto", direction: "rtl" }}
      >
        <Tabs
          defaultActiveKey="משתמש"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="משתמש" title="משתמש">
            <UserStatus />
          </Tab>
          <Tab eventKey="נתונים" title="נתונים">
            <CategorySelection />
          </Tab>
          <Tab eventKey="קטגוריות" title="קטגוריות">
            <TripTypes />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default Settings;
