import React from "react";
import { Card } from "react-bootstrap";
import imageRoom from "./../assets/images/room.jpg";
const ServiceComponent = ({ service }) => {
  return (
    <>
      {/* <Card className="my-3 p-2 rounded">
        <Card.Img variant="top" src={service?.image || imageRoom} />

        <Card.Body>
          <Card.Title as="div">
            <strong>
              <h6>{service?.title}</h6>
            </strong>
          </Card.Title>
          <Card.Text as={"p"}>{service?.caption}</Card.Text>
        </Card.Body>
      </Card> */}
      <Card className="my-1 p-1 rounded">
        <Card.Img
          style={{ width: "100%", height: "220px" }}
          variant="top"
          src={service?.image || imageRoom}
        />
        <Card.Body>
          <Card.Title as="h6">
            <strong>
              <h6>{service?.title}</h6>
            </strong>
          </Card.Title>
          <p style={{ fontSize: "14px" }}>{service?.caption}</p>
          {/* <Card.Text as={"p"}>{service.caption}</Card.Text> */}
        </Card.Body>
      </Card>
    </>
  );
};

export default ServiceComponent;
