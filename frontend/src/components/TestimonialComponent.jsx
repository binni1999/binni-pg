import React from "react";
import { Card } from "react-bootstrap";

const TestimonialComponent = ({ testimonial }) => {
  return (
    <Card
      className="my-4 py-2 mx-2"
      style={{
        width: "23rem",
        height: "13rem",
        borderRadius: "3rem",
        background: "#3b5057",
      }}
    >
      <Card.Body>
        <Card.Title className="text-center text-white">
          {testimonial?.title}
        </Card.Title>

        <Card.Text style={{ color: "white", fontSize: "14px" }}>
          {testimonial?.content}
        </Card.Text>
        <Card.Text
          as={"h6"}
          style={{ textAlign: "right", color: "white", fontSize: "14px" }}
        >
          - {testimonial?.user.name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TestimonialComponent;
