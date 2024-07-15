import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDeleteServiceTypeMutation } from "../../slices/adminSlice";
import Swal from "sweetalert2";
import { useGetServicesTypeQuery } from "../../slices/externalUserSlice";

const ServiceComponentAdmin = ({ service }) => {
  const {
    data: serviceTypes,
    refetch,
    isLoading,
    error,
  } = useGetServicesTypeQuery();
  const [deleteServiceType] = useDeleteServiceTypeMutation();
  const deleteHandler = async (serviceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this room type?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteServiceType(serviceId);
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
    <>
      <Card className="my-1 p-1 rounded">
        <Card.Img
          style={{ width: "100%", height: "220px" }}
          variant="top"
          src={service.image}
        />
        <Card.Body>
          <Card.Title as="h6">
            <strong>
              <h6>{service.title}</h6>
            </strong>
          </Card.Title>
          <p style={{ fontSize: "14px" }}>{service.caption}</p>
          {/* <Card.Text as={"p"}>{service.caption}</Card.Text> */}
        </Card.Body>
        <Row>
          <Col md={6}>
            <p
              className="mx-2"
              style={{
                fontSize: "10px",
                color: "blue",
              }}
            >
              <b> uploaed on: {service.createdAt.split("T")[0]}</b>
            </p>
          </Col>
          <Col md={4}>
            <b>
              <p
                style={{
                  fontSize: "10px",
                  color: "blue",
                }}
              >
                By: {service.addedBy.name}
              </p>
            </b>
          </Col>
          <Col md={2}>
            {/* <p
              className="text-center"
              style={{ cursor: "pointer" }}
              onClick={() => deleteHandler(service._id)}
            > */}
            <FaTrash
              onClick={() => deleteHandler(service._id)}
              style={{
                fontSize: "14px",
                cursor: "pointer",
                color: "red",
                marginBottom: "4px",
              }}
            />
            {/* </p> */}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ServiceComponentAdmin;
