import React from "react";
import { Col, Row } from "react-bootstrap";
import ServiceComponent from "../components/ServiceComponent";
import { useGetServicesTypeQuery } from "../slices/externalUserSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

const ServiceScreen = () => {
  const { data: services, isLoading, error } = useGetServicesTypeQuery();
  console.log(services);
  return (
    <>
      <Meta title={"Services"} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {services.map((service) => (
            <Col lg={4} sm={12} md={6} xl={4}>
              <ServiceComponent key={service._id} service={service} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ServiceScreen;
