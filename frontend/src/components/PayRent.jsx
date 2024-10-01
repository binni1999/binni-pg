import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../Constant";
//import Razorpay from "razorpay";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useGetPdfPathsQuery,
  useGetUserRentDetailsQuery,
} from "../slices/userApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import Meta from "./Meta";
const loadScript = async (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const PayRent = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [rentAmount, setRentAmount] = useState();
  const [rentSlips, setRentSlips] = useState([]);
  const [showSlips, setShowSlips] = useState(false);
  const {
    data: rentDetails,
    refetch,
    isLoading,
    error,
  } = useGetUserRentDetailsQuery(userInfo._id);
  //console.log(rentDetails);

  const {
    data: rentSlipsPdf,
    refetch: pdfRefetch,
    isLoading: pdfLoading,
  } = useGetPdfPathsQuery(userInfo._id);

  useEffect(() => {
    if (!isLoading) {
      const totalAmount =
        rentDetails[0]?.rentAmount +
        rentDetails[0]?.electricity +
        (rentDetails[0]?.rentAmount + rentDetails[0]?.electricity) * 0.06;
      setRentAmount(totalAmount);
      //console.log(rentAmount);
    }
  }, [rentDetails, isLoading, rentAmount]);

  useEffect(() => {
    if (!pdfLoading && rentSlipsPdf) {
      setRentSlips(rentSlipsPdf);
      //console.log("rent slips", rentSlips);
    }
  }, [rentSlipsPdf, pdfLoading, pdfRefetch, rentSlips]);

  useEffect(() => {
    const loadRazorpayScript = async () => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
      }
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(
        `${BASE_URL}/api/razorpay/create-order`,
        {
          amount: rentAmount,
          currency: "INR",
        }
      );
      const order = orderResponse.data;
      //console.log(order);
      handlePaymentVerify(order.data);
      refetch();
    } catch (error) {
      //console.log(error);
    }
  };
  const handlePaymentVerify = async (data) => {
    const options = {
      key: "rzp_test_1kYJ0L2KscVhSJ",
      amount: data.amount,
      currency: data.currency,
      name: "Pankaj",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        //console.log("response", response);
        try {
          const result = await axios.post(
            `${BASE_URL}/api/razorpay/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              rentDetailsId: rentDetails[0]._id,
            }
          );
          const verifyData = result.data;
          //console.log(verifyData);
          if (verifyData.message) {
            toast.success(verifyData.message);
          }
          refetch();
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const downloadPdf = async (fileName) => {
    try {
      const response = await axios.post(
        `/api/users/download-pdf/${userInfo._id}`,
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
    <Container className="my-5">
      <Meta title={"Pay Rent"} />
      <h1 className="text-center">Pay Rent</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"></Message>
      ) : (
        <>
          {!rentDetails[0] ? (
            <>
              <Message variant="success">
                Rent has been Already Paid for this month
              </Message>
              <Button onClick={() => setShowSlips(!showSlips)} className="my-3">
                {showSlips ? "Hide Rent Slips" : "View Rent Slips"}
              </Button>

              <Row className="my-4">
                {!pdfLoading &&
                  showSlips &&
                  rentSlips.map((fileName, index) => (
                    <Col md={4}>
                      <p
                        className="span-button my-1 py-2"
                        style={{
                          cursor: "pointer",
                          height: "3rem",
                        }}
                        onClick={() => downloadPdf(fileName)}
                      >
                        {fileName}
                      </p>
                    </Col>
                  ))}
              </Row>
            </>
          ) : (
            <>
              <h4>
                Pay rent for the month of
                <b>
                  {rentDetails[0]?.month},{rentDetails[0]?.year}
                </b>
              </h4>
              <h5>Rent Description</h5>
              {rentDetails?.map((rent) => (
                <div key={rent.id} className="row">
                  <Row className="my-2">
                    <Col md={2}>Amount</Col>
                    <Col md={1}>INR {rent?.rentAmount}</Col>
                  </Row>
                  <Row className="my-2">
                    <Col md={2}>Electricity Bill</Col>
                    <Col md={1}>INR {rent?.electricity}</Col>
                  </Row>
                  <Row className="my-2">
                    <Col md={2}>GST</Col>
                    <Col md={1}>6%</Col>
                  </Row>
                  <Row className="my-3">
                    <Col md={2}>
                      <b>Total Rent</b>
                    </Col>
                    <Col md={1}>
                      <b>
                        {rent?.rentAmount +
                          rent?.electricity +
                          (rent?.rentAmount + rent?.electricity) * 0.06}
                      </b>
                    </Col>
                  </Row>
                </div>
              ))}

              <Button
                onClick={handlePayment}
                variant="secondary"
                className="my-3"
              >
                Pay Now
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default PayRent;
