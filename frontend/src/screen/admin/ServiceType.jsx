import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useGetServicesTypeQuery } from "../../slices/externalUserSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ServiceComponentAdmin from "../../components/admin/ServiceComponentAdmin";
import {
  useAddServiceTypeMutation,
  useUploadServiceImageMutation,
} from "../../slices/adminSlice";
import { toast } from "react-toastify";
import Meta from "../../components/Meta";

const ServiceType = () => {
  const {
    data: serviceTypes,
    refetch,
    isLoading,
    error,
  } = useGetServicesTypeQuery();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [serviceImage, setServiceImage] = useState("");
  const [tempProfile, setTempProfile] = useState("");
  const [uploadServiceImage] = useUploadServiceImageMutation();
  const [addServiceType] = useAddServiceTypeMutation();

  const handleClose = () => {
    setTempProfile("");
    setShow(false);
  };
  const handleShow = () => {
    setTempProfile("");
    setShow(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await addServiceType({
        title,
        caption,
        image: serviceImage,
      });
      console.log(result);
      toast.success("Service Type Added Successfully");
      handleClose();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type.indexOf("image/") !== 0) {
      toast.error("Please select a valid image file");
      return;
    }
    if (file.size > 1024 * 1024 * 5) {
      toast.error("Image size should be less than 5MB");
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadServiceImage(formData);
      if (res?.data?.imagePath) {
        setServiceImage(res.data.imagePath);
        toast.success("Image uploaded successfully");
      }
      if (!res?.data || !res?.data?.imagePath) {
        toast.error("Failed to upload profile picture");
        return;
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      <Meta title={"Service Type"} />
      <Link to={`/`} className="btn btn-light my-3">
        Go Back
      </Link>

      <Button
        variant="primary"
        className="mx-5 admin-button"
        onClick={handleShow}
      >
        Add Service Type
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        style={{ width: "100%", height: "64rem" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center" style={{ color: "green" }}>
            Add Service Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mb-2">
            <Form.Group controlId="title" className="my-1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="caption" className="my-1">
              <Form.Label>Caption</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group controlId="profilePic" className="my-1">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter image url"
                    value={serviceImage}
                    onChange={(e) => setServiceImage(e.target.value)}
                  ></Form.Control>
                  <Form.Control
                    type="file"
                    Label="choose file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const url = URL.createObjectURL(file);
                      setTempProfile(url);
                      setServiceImage(url);
                      uploadFileHandler(e);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="my-3" md={6}>
                {tempProfile && (
                  <img
                    src={tempProfile}
                    alt="profilePic"
                    style={{
                      width: "14rem",
                      height: "14rem",
                    }}
                  ></img>
                )}
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            <b>Save Changes</b>
          </Button>
        </Modal.Footer>
      </Modal>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {serviceTypes.map((service) => (
            <Col lg={4} sm={12} md={6} xl={4}>
              <ServiceComponentAdmin service={service} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ServiceType;
