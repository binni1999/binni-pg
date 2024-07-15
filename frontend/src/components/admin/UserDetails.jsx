import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../FormContainer";
import {
  useGetUserByIdQuery,
  useUpdateUserDetailsMutation,
} from "../../slices/adminSlice";
import { toast } from "react-toastify";
import Meta from "../Meta";
const UserDetails = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: user, refetch, isLoading } = useGetUserByIdQuery(userId);

  const [updateUserDetails] = useUpdateUserDetailsMutation();
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setMobileNumber(user.mobileNumber);
      setRoomNumber(user.roomNumber);
      setPermanentAddress(user.permanentAddress);
    }
  }, [user]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const usertype = isAdmin ? "Admin" : "Tenet";
    const data = {
      userId,
      name,
      email,
      mobileNumber,
      roomNumber,
      permanentAddress,
      userType: usertype,
    };
    try {
      const res = await updateUserDetails(data).unwrap();
      console.log(res);
      toast.success("User Details Updated!", {
        autoClose: 1000,
      });
      refetch();
      navigate("/admin/users");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Meta title={"User Details"} />
      <Container>
        <Link to={`/admin/users`} className="btn btn-light my-3">
          Go Back
        </Link>
        <Container>
          <Row>
            <Col md={3}>
              {!isLoading && (
                <>
                  <p className="my-1 " style={{ color: "blue" }}>
                    <strong>Last Updated At:</strong>{" "}
                  </p>
                  <p className="mt-1" style={{ color: "green" }}>
                    {user.updatedAt.split("T")[1].substring(0, 8)} on{" "}
                    {user.updatedAt.split("T")[0]}
                  </p>
                </>
              )}
            </Col>
            <Col>
              <h2 style={{ color: "green" }}>Edit User</h2>
            </Col>
          </Row>
        </Container>

        <FormContainer>
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
                {" "}
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
              <Col md={6}>
                <Form.Group controlId="roomNumber" className="my-1">
                  <Form.Label>Room Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Room Number"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="permanentAddress" className="my-1">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter  address"
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group controlId="isAdmin" className="my-2">
                  <Form.Check
                    type="checkbox"
                    label="Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="isTenet" className="my-2">
                  <Form.Check
                    type="checkbox"
                    label="Tenet"
                    checked={!isAdmin}
                  ></Form.Check>
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="primary" className="mt-1">
              Update Details
            </Button>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default UserDetails;
