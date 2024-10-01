import React, { useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUserClock } from "react-icons/fa6";
import { toast } from "react-toastify";
import Message from "../Message";
import Loader from "../Loader";
import {
  useGetEnquiryByIdQuery,
  useUpdateEnquiryMutation,
} from "../../slices/adminSlice";
import Meta from "../Meta";

const EnquiryDetails = () => {
  const { id: enqId } = useParams();
  const [showTextBox, setShowTextBox] = useState(false);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const {
    data: enquiry,
    isLoading: isEnqLoading,
    refetch,
    error,
  } = useGetEnquiryByIdQuery(enqId);
  //console.log(enquiry, isEnqLoading, error);
  const [updateEnquiry] = useUpdateEnquiryMutation();
  const toggleBox = () => {
    setShowTextBox(!showTextBox);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await updateEnquiry({ enqId, response });
    toast.success("Updated");
    refetch();
    navigate(`/admin/enquiries/${enquiry._id}/edit`);
  };

  return (
    <>
      <Meta title="Enquiry Details" />
      <Link to={"/admin/enquiries"} className="btn btn-light my-3 span-button">
        Go Back
      </Link>
      {isEnqLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <h3 className="text-center enquiryHeader">
            Enquiry Details #{enqId}
          </h3>
          <Row>
            <Col>
              <>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3 className="enquiryHeader">
                      Enquiry <FaUserClock />
                    </h3>
                    <p>
                      <strong>Name:</strong>
                      &nbsp;{enquiry.name}
                    </p>
                    <p>
                      <strong>Email:</strong>
                      &nbsp;{enquiry.email}
                    </p>
                    <p>
                      <strong>Contact No:</strong>
                      &nbsp;{enquiry.contact}
                    </p>
                    <p>
                      <strong>Query:</strong>{" "}
                    </p>
                    <Message variant="info">{enquiry.message}</Message>
                    {enquiry.isResolved ? (
                      ""
                    ) : (
                      <Button className="span-button" onClick={toggleBox}>
                        {!showTextBox ? "Respond" : "Not Now"}
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </>
            </Col>
            <Col>
              <div id="open-box">
                {enquiry.isResolved ? (
                  <>
                    <h4 className="my-3">
                      <strong>Response sent to the user:</strong>
                    </h4>
                    <Message variant="success">{enquiry.response}</Message>
                  </>
                ) : (
                  showTextBox && (
                    <Form onSubmit={submitHandler}>
                      <textarea
                        name="response"
                        className="my-2 enquiryTextBox"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="enter your response"
                        rows={10}
                        cols={70}
                        style={{
                          color: "blue",
                          border: "1px solid #ccc",
                          backgroundColor: "#f0f0f0",
                          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                          borderRadius: "5px",
                          padding: "10px",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "16px",
                        }}
                      ></textarea>
                      <Button
                        className="mx-1 my-1  span-button enquiryDetailsButton"
                        style={{ color: "white", background: "#f73528" }}
                        onClick={toggleBox}
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        className="mx-2 my-1 span-button"
                        style={{ color: "white", background: "#3ead34" }}
                      >
                        &nbsp;Send&nbsp;
                      </Button>
                    </Form>
                  )
                )}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default EnquiryDetails;
