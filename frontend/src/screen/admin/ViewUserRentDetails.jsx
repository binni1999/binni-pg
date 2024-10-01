import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  useGetRentPaidDetailsQuery,
  useGetUserByIdQuery,
} from "../../slices/adminSlice";
import { useGetPdfPathsQuery } from "../../slices/userApiSlice";
import axios from "axios";
import Message from "../../components/Message";
import Meta from "../../components/Meta";

const ViewUserRentDetails = () => {
  const { id: userId } = useParams("id");
  const [rentSlips, setRentSlips] = useState([]);
  const [showSlips, setShowSlips] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const {
    data: rentSlipsPdf,
    refetch: pdfRefetch,
    isLoading: pdfLoading,
  } = useGetPdfPathsQuery(userId);
  //console.log("rentslipspdf", rentSlipsPdf);
  useEffect(() => {
    if (!pdfLoading && rentSlipsPdf) {
      setRentSlips(rentSlipsPdf);
    }
  }, [rentSlipsPdf, pdfLoading, pdfRefetch, rentSlips]);

  const { data: user, isLoading: userLoading } = useGetUserByIdQuery(userId);

  const { data: rentPaid, isLoading: rentPaidLoading } =
    useGetRentPaidDetailsQuery(userId);

  const downloadPdf = async (fileName) => {
    try {
      const response = await axios.post(
        `/api/users/download-pdf/${userId}`,
        {
          pdfName: fileName,
        },
        {
          responseType: "blob",
        }
      );
      //create a url for the PDF blob
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <Container>
      <Meta title={"Rent Details"} />
      <Link
        to={"/admin/rent-details"}
        className="btn btn-light my-3 span-button"
      >
        Go Back
      </Link>
      <h2 className="text-center">View Rent Details</h2>
      <Row>
        {!userLoading && (
          <>
            <Col>
              <button
                style={{ width: "14rem", color: "white" }}
                className="luffy-button viewRentDetails"
              >
                <b>Name : {user.name}</b>
              </button>
            </Col>
            <Col>
              <button
                style={{ width: "16rem", color: "white" }}
                className="luffy-button viewRentDetails"
              >
                <strong>Email: {user.email}</strong>
              </button>
            </Col>
            <Col>
              <button
                style={{ width: "14rem", color: "white" }}
                className="luffy-button viewRentDetails"
              >
                <strong>Contact: {user.mobileNumber}</strong>
              </button>
            </Col>
          </>
        )}
      </Row>
      <Row>
        <Col md={4}>
          <h5 style={{ color: "green" }} className="my-2">
            Previous Rent Slips
          </h5>
          <Row>
            <Button
              style={{ width: "10rem" }}
              onClick={() => setShowSlips(!showSlips)}
              className="my-3 mx-2"
            >
              {showSlips ? "Hide Rent Slips" : "View Rent Slips"}
            </Button>
            <Button
              style={{ width: "10rem" }}
              onClick={() => setShowCards(!showCards)}
              className="my-3 mx-2"
            >
              {showCards ? "Hide Rent Cards" : "View Rent Cards"}
            </Button>
            <Row>
              {!pdfLoading &&
                (rentSlips === undefined || rentSlips.length === 0) && (
                  <Message variant="danger">No rent slips found!</Message>
                )}
              {!pdfLoading &&
                showSlips &&
                rentSlips.map((fileName, index) => (
                  <Col md={5}>
                    <p
                      className="span-button text-center my-1 py-2"
                      style={{
                        cursor: "pointer",
                        height: "2.5rem",
                        width: "8rem",
                      }}
                      onClick={() => downloadPdf(fileName)}
                    >
                      {fileName.substring(25)}
                    </p>
                  </Col>
                ))}
            </Row>
          </Row>
        </Col>
        <Col md={8}>
          <Row>
            <h5 style={{ color: "green" }} className="my-2">
              Previous Months Rent Details
            </h5>
            {!rentPaidLoading &&
              (rentPaid === undefined || rentPaid.length === 0) && (
                <Message variant="danger">Nothing to show here!</Message>
              )}
            {!rentPaidLoading &&
              showCards &&
              rentPaid.map((rent) => (
                <Col md={6}>
                  <Card
                    className="my-2 py-1"
                    style={{
                      width: "23rem",
                      borderRadius: "1rem",
                      height: "10rem",
                      background: "#3a4e54",
                      color: "white",
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
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewUserRentDetails;
