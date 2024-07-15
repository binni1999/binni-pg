import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import hall from "../../src/assets/images/hall.jpg";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../slices/userApiSlice";
import Meta from "../components/Meta";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetPassword] = useResetPasswordMutation();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const token = query.get("token");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newPassword === "" ||
      newPassword === undefined ||
      newPassword === null
    ) {
      return toast.error("Password can not be blank");
    }
    if (newPassword !== confirmNewPassword) {
      return toast.error("Password does not match");
    }
    const data = {
      token,
      newPassword,
    };

    try {
      const result = await resetPassword({ data });
      console.log(result);
      if (result?.data) {
        toast.success("Password reset successfully");
        navigate("/login");
      } else {
        toast.error(result.error.data);
      }
      newPassword("");
      confirmNewPassword("");
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
      <Meta title={"Reset Password"} />
      <Container>
        <Row>
          <Col md={4}></Col>
          <Col>
            <h1 className="text-center mx-4 " style={{ color: "white" }}>
              Reset Password
            </h1>
            <FormContainer>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="newpassword">
                  <Form.Label className="my-2" style={{ color: "white" }}>
                    New Password
                  </Form.Label>
                  <Form.Control
                    style={{ width: "24rem" }}
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmnewpassword">
                  <Form.Label className="my-2" style={{ color: "white" }}>
                    Confirm New Password
                  </Form.Label>
                  <Form.Control
                    style={{ width: "24rem" }}
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
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
