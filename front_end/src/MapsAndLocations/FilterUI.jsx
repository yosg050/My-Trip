import React, { useState, useEffect } from "react";
import {
  Offcanvas,
  Form,
  Button,
  FormControl,
  Col,
  Row,
} from "react-bootstrap";

function FilterUI({ show, onHide, onFilterChange }) {
  const [visited, setVisited] = useState(false);
  const [notVisited, setNotVisited] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onFilterChange({ visited, notVisited, searchTerm });
  }, [visited, notVisited, searchTerm]);

  const handleReset = () => {

    setVisited(false);
    setNotVisited(false);
    setSearchTerm("");
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      style={{
        textAlign: "end",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>הצגת יעדים שלי</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <FormControl
          type="text"
          placeholder="חפש מיקום"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "30px", direction: "rtl" , borderColor: '#0d6efd'}}
        />
        <Col
          xs={10}
          style={{
            maxHeight: "30vh",
            overflowY: "auto",
          }}
        >
          <Form>
            <Form.Check
              type="switch"
              label="יעדים שביקרתי"
              checked={visited}
              onChange={(e) => setVisited(e.target.checked)}
            />
            <Form.Check
              type="switch"
              label="יעדים שלא ביקרתי"
              checked={notVisited}
              onChange={(e) => setNotVisited(e.target.checked)}
            />
          </Form>
        </Col>
        <Row>
        <Col xs={6} style={{ marginTop: "15px" }}>
          <Button
       
            variant="primary"
            onClick={handleReset}
            style={{ marginTop: "15px" }}
            >
            איפוס הסינונים
          </Button>
            </Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default FilterUI;
