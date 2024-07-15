import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  useCreateRentDetailForUserMutation,
  useGetRentPaidDetailsQuery,
  useGetUserByIdQuery,
} from "../../slices/adminSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Meta from "../../components/Meta";

const RentDetailsForUser = () => {
  const date = new Date();
  const monthName = date.toLocaleString("default", { month: "long" });
  const yearValue = date.toLocaleString("default", { year: "numeric" });
  const { id: userId } = useParams("id");
  //console.log(userId);
  const [month, setMonth] = useState(monthName);
  const [year, setYear] = useState(yearValue);
  const [electricity, setElectricity] = useState(0);
  const [rentAmount, setRentAmount] = useState(0);
  const { data: user, isLoading: userLoading } = useGetUserByIdQuery(userId);

  const [createRentDetailsForUser] = useCreateRentDetailForUserMutation();

  const { data: rentPaid, isLoading: rentPaidLoading } =
    useGetRentPaidDetailsQuery(userId);
  //console.log(rentPaid);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rentAmount === 0) {
      return toast.error("Rent Amount can not be 0");
    }

    const options = {
      month,
      year,
      electricity,
      rentAmount,
      userId,
    };
    try {
      const result = await createRentDetailsForUser(options);
      toast.success("User has been  notified!");
      setRentAmount(0);
      setElectricity(0);

      if (result?.data?.message.includes("User has been already notified!")) {
        Swal.fire("User has been already notified!");
      }
      if (result?.error?.data?.message) {
        Swal.fire(result.error.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Container>
      <Meta title={"Rent Details"} />
      <Link to={"/admin/users"} className="btn btn-light my-3 span-button">
        Go Back
      </Link>
      <h2 className="text-center">Rent Details</h2>
      <Row>
        <Col md={6}>
          {!userLoading && (
            <>
              <Row>
                <Col md={2}>
                  <p>Name:</p>
                </Col>
                <Col>
                  <p>{user.name}</p>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <p>Email:</p>
                </Col>
                <Col>
                  <p>{user.email}</p>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <p>Contact:</p>
                </Col>
                <Col>
                  <p>{user.mobileNumber}</p>
                </Col>
              </Row>
            </>
          )}

          <Row>
            <h6>Rent Details</h6>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={3}>
                  <Form.Group controlId="month" className="my-1">
                    <Form.Label>Month</Form.Label>
                    <Form.Control
                      style={{ width: "8rem" }}
                      type="text"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      placeholder="Enter month"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="year" className="my-1">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      style={{ width: "8rem" }}
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="Enter Year"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Form.Group controlId="electricity" className=" my-2">
                    <Form.Label>Electricity Bill</Form.Label>
                    <Form.Control
                      style={{ width: "9rem" }}
                      type="number"
                      value={electricity}
                      onChange={(e) => setElectricity(e.target.value)}
                      placeholder="Enter amount"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="rentamount" className="my-2">
                    <Form.Label>Rent Amount</Form.Label>
                    <Form.Control
                      style={{ width: "12rem" }}
                      type="number"
                      value={rentAmount}
                      onChange={(e) => setRentAmount(e.target.value)}
                      placeholder="Enter Rent Amount"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Button
                type="submit"
                style={{ width: "10rem", height: "3rem" }}
                className="my-2 span-button"
              >
                Inform User
              </Button>
            </Form>
          </Row>
        </Col>
        <Col md={6}>
          {!rentPaidLoading &&
            rentPaid.map((rent) => (
              <Col>
                <Card
                  className="my-2 py-1"
                  style={{
                    width: "28rem",
                    borderRadius: "1rem",
                    height: "10rem",
                    background: "#9aedb9",
                    color: "black",
                  }}
                >
                  <Card.Body>
                    <span className="text-center">
                      <b>
                        {rent.month},{rent.year}
                      </b>
                    </span>
                    <span>
                      <p>
                        Total Rent Paid :
                        <b>
                          {rent.rentAmount +
                            rent.electricity +
                            (rent.rentAmount + rent.electricity) * 0.06}
                        </b>
                        , with <b>6%</b> GST
                      </p>
                    </span>
                    <span>
                      Rent Amount : <b>{rent.rentAmount}</b>{" "}
                    </span>
                    , &nbsp;&nbsp;
                    <span>
                      Electricity : <b>{rent.electricity}</b>
                    </span>
                    <p>
                      Last Paid : <b>{rent?.lastPaid?.split("T")[0]}</b>{" "}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default RentDetailsForUser;
