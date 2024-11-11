import React, { useRef, useCallback } from "react";
import { Button, Image, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { uploadImage } from "../DB/firebaseStorage";
import { PlusCircleDotted } from "react-bootstrap-icons";

function LocationImage({ location, user, onImageUpload }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files[0];
      if (file && user?.uid && location?.id) {
        try {
          const path = `locations/${user.uid}/${location.id}`;
          const downloadURL = await uploadImage(file, path);
          onImageUpload(downloadURL);
        } catch (error) {
          console.error("Error handling image upload:", error);
        }
      }
    },
    [user, location, onImageUpload]
  );

  return (
    <Container
      className="position-relative bg-light rounded overflow-hidden"
      style={{ height: "300px", padding: 0 }}
    >
      {location.image ? (
        <Image
          src={location.image}
          alt="Uploaded image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>עדיין אין תמונה <br/> ניתן להוסיף תמונות שלך</Tooltip>}
          >
            <Button variant="link"  onClick={handleButtonClick}  >
              <PlusCircleDotted size={30}/>
            </Button>
          </OverlayTrigger>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
          />
        </div>
      )}
    </Container>
  );
}

export default LocationImage;
