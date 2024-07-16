import React from "react";
import GalleryImageComponent from "../components/GalleryImageComponent";
import { Col, Row } from "react-bootstrap";
import { useGetAllImagesQuery } from "../slices/externalUserSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

const Gallery = () => {
  const { data: images, isLoading, error } = useGetAllImagesQuery();
  //console.log(images);
  return (
    <>
      <Meta title={"Gallery"} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {images?.images.map((image) => (
            <Col key={image._id} md={6} sm={12} lg={4} xl={4}>
              <GalleryImageComponent image={image} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Gallery;
