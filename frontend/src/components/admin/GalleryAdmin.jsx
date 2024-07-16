import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import GalleryComponentAdmin from "./GalleryComponentAdmin";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddNewImageMutation,
  useUploadGalleryImageMutation,
} from "../../slices/adminSlice";
import { useGetAllImagesQuery } from "../../slices/externalUserSlice";
import Loader from "../Loader";
import Message from "../Message";
import Meta from "../Meta";

const GalleryAdmin = () => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState();
  const [tempProfile, setTempProfile] = useState("");
  const [uploadGalleryImage] = useUploadGalleryImageMutation();
  const [addNewImage] = useAddNewImageMutation();
  const { data: images, refetch, isLoading, error } = useGetAllImagesQuery();
  const handleClose = () => {
    setTempProfile("");
    setShow(false);
  };
  const handleShow = () => {
    setTempProfile("");
    setShow(true);
  };
  //const submitHandler = () => {};
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await addNewImage({ image });
      //console.log(result);
      toast.success("Image Added Successfully");
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
      const res = await uploadGalleryImage(formData);
      if (res?.data?.imagePath) {
        setImage(res.data.imagePath);
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
    <>
      <Meta title={"Gallery - Admin"} />
      <Link to={`/`} className="btn btn-light my-3 mx-3">
        Go Back
      </Link>
      <Button
        variant="primary"
        className="mx-3 admin-button"
        onClick={handleShow}
      >
        Add New Image
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        style={{ width: "100%", height: "64rem" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center" style={{ color: "green" }}>
            Add New Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mb-2">
            <Row className="my-3" md={6}>
              {tempProfile && (
                <img
                  className="mx-3"
                  src={tempProfile}
                  alt="profilePic"
                  style={{
                    marginLeft: "3px",
                    width: "28rem",
                    height: "14rem",
                  }}
                ></img>
              )}
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="profilePic" className="my-1">
                  <Form.Label className="mx-3">Picture</Form.Label>
                  <Form.Control
                    className="mx-3"
                    type="text"
                    placeholder="enter image url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.Control
                    className="mx-3"
                    type="file"
                    Label="choose file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const url = URL.createObjectURL(file);
                      setTempProfile(url);
                      setImage(url);
                      uploadFileHandler(e);
                    }}
                  ></Form.Control>
                </Form.Group>
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
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {images.images.map((image) => (
            <Col md={6} sm={12} lg={4} xl={4}>
              <GalleryComponentAdmin key={image._id} image={image} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default GalleryAdmin;
