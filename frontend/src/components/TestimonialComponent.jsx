import React from "react";
import { Card } from "react-bootstrap";

const TestimonialComponent = ({ testimonial }) => {
  return (
    <Card
      className="my-4 py-2 mx-2 testimonialScreen"
      style={{
        width: "23rem",
        height: "13rem",
        borderRadius: "3rem",
        background: "#3b5057",
      }}
    >
      <Card.Body className="testimonialBody">
        <Card.Title className="text-center text-white testimonialTitle">
          {testimonial?.title}
        </Card.Title>

        <Card.Text
          className="testimonialContent"
          style={{ color: "white", fontSize: "14px" }}
        >
          {testimonial?.content}
        </Card.Text>
        <Card.Text
          as={"h6"}
          className="testimonialText"
          style={{ textAlign: "right", color: "white", fontSize: "14px" }}
        >
          - {testimonial?.user.name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TestimonialComponent;
