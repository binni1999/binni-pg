import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import hall from "../../src/assets/images/hall.jpg";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../slices/userApiSlice";
import Meta from "../components/Meta";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword] = useForgotPasswordMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await forgotPassword({ email });
      //console.log(result);
      toast.success("Check your email for reset password link");
      setEmail("");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Container
      className="my-3"
      fluid
      style={{
        backgroundImage: `url(${hall})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Meta title={"Forgot Password"} />
      <Container>
        <Row>
          <Col md={4}></Col>
          <Col>
            <h1 className="text-center mx-4" style={{ color: "white" }}>
              Forgot Password
            </h1>
            <FormContainer>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label className="my-3" style={{ color: "white" }}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    style={{ width: "24rem" }}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button
                  type="submit"
                  className="my-3 admin-button "
                  style={{
                    borderRadius: "7px",
                    width: "6rem",
                  }}
                >
                  Submit
                </Button>
              </Form>
            </FormContainer>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ForgotPassword;
