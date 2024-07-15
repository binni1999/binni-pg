import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import Meta from "../components/Meta";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [city, setCity] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const permanentAddress = `${address},${city},${state},${country}`;
    const res = await fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        mobileNumber,
        profilePic,
        roomNumber,
        permanentAddress,
      }),
    });
    const result = await res.json();
    console.log(result);
    toast.success("Registered Successfully");
    navigate("/login");
  };
  return (
    <FormContainer>
      <Meta title={"Update Profile"} />
      <strong>
        <h1>Sign Up</h1>
      </strong>
      <Form onSubmit={submitHandler} className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Group controlId="name" className="my-1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email" className="my-1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="password" className="my-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="confirmPassword" className="my-1">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="mobileNumber" className="my-1">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile No"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="roomNumber" className="my-1">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Room No"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="profile Pic" className="my-1">
              <Form.Label>Profile Pic</Form.Label>
              <Form.Control
                type="text"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="address" className="my-1">
          <Form.Label> Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Permanent Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row>
          <Col md={4}>
            <Form.Group controlId="city" className="my-1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="state" className="my-1">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="country" className="my-1">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-2">
          Sign Up
        </Button>
      </Form>
      <Row className="my-1 mb-4">
        <Col>
          Already have an account? <Link to={"/login"}>Login Here</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
