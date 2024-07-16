import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Message from "../components/Message";
import {
  useCreateEnquiryLoggedInUserMutation,
  useGetUserEnquiriesQuery,
  useGetUserProfileQuery,
} from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Meta from "../components/Meta";

const UserEnquiryForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [showEnquiry, setShowEnquiry] = useState(false);
  const { data, refetch, isLoading } = useGetUserEnquiriesQuery();
  //console.log(data);
  const { data: user } = useGetUserProfileQuery();

  const navigate = useNavigate();
  const [createEnquiryLoggedInUser] = useCreateEnquiryLoggedInUserMutation();

  //console.log(data);

  const [showMore, setShowMore] = useState(false);

  const handleReadMore = () => {
    setShowMore(!showMore);
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setContact(user.mobileNumber);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(name, email, message, contact);
    try {
      const res = await createEnquiryLoggedInUser({
        name,
        email,
        contact,
        message,
      });
      //console.log(res);
      toast.success("Enquiry sent successfully");
      refetch();
      setMessage("");
      navigate("/user-enquiry");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <Container>
      <Meta title={"Enquiry"} />
      <h2 className="text-center">Post an Enquiry</h2>
      <p className="mx-5">
        <strong>Previous Enquiries?</strong>
      </p>
      <Button
        variant="outline-success"
        className="mx-5"
        style={{ width: "6rem" }}
        onClick={(e) => setShowEnquiry(!showEnquiry)}
      >
        {showEnquiry ? "Hide" : "Show"}
      </Button>
      <Row>
        <Col className="my-4 mx-5" md={4}>
          <h3 className="mb-2">Post An Enquiry</h3>
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
        </Col>
        <Col className="mx-2">
          {data?.message === "No Query" && showEnquiry && (
            <Message variant="danger">There is no query asked by you!</Message>
          )}
          {showEnquiry &&
            !isLoading &&
            !data?.message?.includes("No Query") && (
              <Row>
                {data.map((enquiry) => (
                  <Col md={6}>
                    <Card className="my-2 mx-1" style={{ width: "100%" }}>
                      <CardBody>
                        <p>
                          {" "}
                          <b>Name</b>: &nbsp;&nbsp; {enquiry.user.name}
                        </p>
                        <p>
                          <b>Posted On</b>:&nbsp;&nbsp;
                          {enquiry.createdAt.split("T")[0]}
                        </p>
                        <p style={{ color: "#4f4f4d" }}>
                          <span style={{ color: "Blue" }}>
                            <b>Query</b>:&nbsp;&nbsp;
                          </span>
                          {enquiry.message}
                        </p>
                        <p style={{ color: "green", background: "#D1F2EB" }}>
                          <span style={{ color: "red" }}>
                            {" "}
                            <b>Response</b>{" "}
                          </span>{" "}
                          : &nbsp;&nbsp;
                          {enquiry?.response
                            ? showMore
                              ? enquiry?.response
                              : `${enquiry?.response.substring(0, 100)}... `
                            : "No Response Yet"}
                          {enquiry?.response &&
                            enquiry?.response.length > 100 && (
                              <span
                                onClick={handleReadMore}
                                style={{ cursor: "pointer", color: "blue" }}
                              >
                                {showMore ? "Read Less" : "Read More"}
                              </span>
                            )}
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
        </Col>
      </Row>
      ;
    </Container>
  );
};

export default UserEnquiryForm;
