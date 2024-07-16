import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaClock, FaHome, FaPhone, FaQuestion } from "react-icons/fa";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useCreateEnquiryMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

const ContactUs = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const [createEnquiry] = useCreateEnquiryMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(name, email, message, contact);
    try {
      await createEnquiry({ name, email, contact, message });
      toast.success("Enquiry sent successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <Meta title="Contact Us" />
      <strong className="text-center">
        <h1>Contact Us</h1>
      </strong>

      <Container>
        <Row>
          <Col
            className="my-4 py-5"
            style={{ backgroundColor: "#f7f7f5" }}
            md={6}
          >
            <Row className="my-1 py-1 text-center">
              <h4>OUR INFORMATION</h4>
            </Row>
            <Row>
              <Col>
                <p style={{ fontSize: "22px" }}>
                  Office Address <FaHome />
                </p>

                <p>Wamson pg noida </p>
              </Col>
              <Col>
                <p style={{ fontSize: "22px" }}>
                  General Enquiry <FaQuestion />
                </p>

                <p>pankajbinwal@binni.com</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ fontSize: "22px" }}>
                  Call Us &nbsp;&nbsp; <FaPhone />
                </p>

                <p>9105251412</p>
              </Col>
              <Col>
                <p style={{ fontSize: "22px" }}>
                  Our Timing <FaClock />
                </p>

                <p>Mon - Sun : 10:00 AM- 07:00 PM</p>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Container>
              <Row className="my-5 ">
                <h4 className="text-center mx-5">Enquiry Form</h4>
                <Row>
                  <FormContainer>
                    <Form onSubmit={submitHandler}>
                      <Form.Group
                        style={{ width: "25rem" }}
                        controlId="name"
                        className="my-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group
                        style={{ width: "25rem" }}
                        controlId="email"
                        className="my-3"
                      >
                        {/* <Form.Label>Email</Form.Label> */}
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group
                        style={{ width: "25rem" }}
                        controlId="contact"
                        className="my-3"
                      >
                        {/* <Form.Label>Contact Number</Form.Label> */}
                        <Form.Control
                          type="text"
                          placeholder="Contact No*"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group
                        style={{ width: "25rem" }}
                        controlId="message"
                        className="my-3"
                      >
                        {/* <Form.Label>Contact Number</Form.Label> */}
                        <Form.Control
                          as="textarea"
                          row="5"
                          placeholder="Your Message*"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        style={{
                          width: "7rem",
                          background: "yellow",
                          color: "black",
                          borderRadius: "5rem",
                        }}
                        type="submit"
                        variant="primary"
                      >
                        <strong>Submit</strong>
                      </Button>
                    </Form>
                  </FormContainer>
                </Row>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactUs;
