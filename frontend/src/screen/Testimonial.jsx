import React, { useState } from "react";
import TestimonialComponent from "../components/TestimonialComponent";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { usePostTestimonyMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useGetAllTestimonialsQuery } from "../slices/adminSlice";
import Meta from "../components/Meta";

const Testimonial = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const [postTestimonial] = usePostTestimonyMutation();
  const { data: testimonials } = useGetAllTestimonialsQuery();
  const handleClose = () => setShow(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { title, content };
    try {
      const result = await postTestimonial(data);
      if (result?.data) {
        toast.success(result.data.message);
        setTitle("");
        setContent("");
        setShow(false);
      } else {
        toast.error(result?.error?.data?.message);
        setTitle("");
        setContent("");
        setShow(false);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  return (
    <>
      <Meta title={"Testimonials"} />
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center" style={{ color: "green" }}>
            Post Your Testimony
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.toString()}</Message>
      ) : (
        <Modal show={view} onHide={handleViewClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center" style={{ color: "green" }}>
              Your Testimony
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <h4 className="text-center">
                {userTestimony?.testimony?.[0]?.title}
              </h4>
            </Row>
            <Row>
              <p>{userTestimony?.testimony?.[0]?.content}</p>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleViewClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )} */}

      <h2 className="text-center my-2" style={{ color: "green" }}>
        Testimonial
      </h2>

      {/* {userInfo?.userType === "Tenant" &&
        (!isLoading && userTestimony?.testimony?.length === 0 ? (
          <Button
            onClick={handleShow}
            className="mx-4 admin-button"
            style={{ borderRadius: "4px" }}
          >
            Add Your Testimony
          </Button>
        ) : (
          <Button
            onClick={handleViewShow}
            className="mx-4 admin-button"
            style={{ borderRadius: "4px" }}
          >
            View Yours
          </Button>
        ))} */}

      <Row className="my-4">
        {testimonials?.map((testimonial, index) => (
          <Col md={4} key={index}>
            <TestimonialComponent testimonial={testimonial} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Testimonial;
