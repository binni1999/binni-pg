import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import Meta from "../components/Meta";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      //console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate("/profile");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div>
      <Meta title="Login Page" />
      <FormContainer className="my-3">
        <strong>
          <h1>Sign In</h1>
        </strong>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Link to={"/forgot-password"}>
            <p>Forgot Password</p>
          </Link>
          <Button type="submit" variant="primary" className="mt-2">
            Sign In
          </Button>
        </Form>
        <Row className="py-2 my-2">
          <Col>
            New User? <Link to={"/register"}>Register Here</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default LoginScreen;
