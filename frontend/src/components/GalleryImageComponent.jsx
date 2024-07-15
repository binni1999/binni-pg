import React from "react";
import { Container, Image } from "react-bootstrap";
import imageRoom from "./../assets/images/room.jpg";
const GalleryImageComponent = ({ image }) => {
  return (
    <Container className="my-2 py-1">
      <Image
        src={image?.image || imageRoom}
        alt="image"
        fluid
        style={{ width: "35rem", height: "15rem", borderRadius: "15px" }}
      />
    </Container>
  );
};

export default GalleryImageComponent;
