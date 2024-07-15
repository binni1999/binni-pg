import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDeleteImageMutation } from "../../slices/adminSlice";
import { useGetAllImagesQuery } from "../../slices/externalUserSlice";
import Meta from "../Meta";

const GalleryComponentAdmin = ({ image }) => {
  const [deleteImage] = useDeleteImageMutation();
  const { refetch } = useGetAllImagesQuery();

  const deleteHandler = async (imageId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this room type?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteImage(imageId);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Room Type has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <Container className="my-2 py-1">
      <Meta title={"Gallery "} />
      <Image
        src={image.image}
        alt="image"
        fluid
        style={{ width: "35rem", height: "18rem", borderRadius: "15px" }}
      />
      <Row>
        <Col>
          <p className="mx-3 my-2" style={{ color: "green" }}>
            updated on: {image.createdAt.split("T")[0]}
          </p>
        </Col>
        <Col md={2}>
          <p
            className="my-2"
            style={{ cursor: "pointer" }}
            onClick={() => deleteHandler(image._id)}
          >
            <FaTrash style={{ color: "red" }} />
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default GalleryComponentAdmin;
