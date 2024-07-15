import React, { useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Swal from "sweetalert2";
//import { useUploadUserProfileMutation } from "../../slices/userApiSlice";
import {
  useAddRoomTypeMutation,
  useUploadRoomImageMutation,
} from "../../slices/adminSlice";
import {
  useDeleteRoomMutation,
  useGetRoomsQuery,
} from "../../slices/externalUserSlice";
import { Link } from "react-router-dom";
import Meta from "../../components/Meta";
const RoomType = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setTempProfile("");
    setShow(false);
  };
  const handleShow = () => {
    setTempProfile("");
    setShow(true);
  };
  const [roomImage, setRoomImage] = useState("");
  const [tempProfile, setTempProfile] = useState("");
  const [caption, setCaption] = useState("");

  const { data: rooms, refetch, isLoading, error } = useGetRoomsQuery();
  console.log(rooms);
  const [uploadRoomImage] = useUploadRoomImageMutation();
  const [addRoomType] = useAddRoomTypeMutation();
  const [deleteRoomType] = useDeleteRoomMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await addRoomType({ caption, image: roomImage });
      console.log(result);
      toast.success("Room Type Added Successfully");
      handleClose();
      setCaption("");
      setRoomImage("");
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
      const res = await uploadRoomImage(formData);
      if (res?.data?.imagePath) {
        setRoomImage(res.data.imagePath);
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
  // const deleteHandler = async (roomId) => {
  //   const result = await deleteRoomType(roomId);
  //   console.log(result);
  //   refetch();
  //   toast.success("Room Type Deleted Successfully");
  // };

  const deleteHandler = async (roomId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this room type?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteRoomType(roomId);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Room Type has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <Meta title={"Room Type"} />
      <Link to={`/`} className="btn btn-light my-3">
        Go Back
      </Link>
      <Button
        variant="primary"
        className="mx-5 admin-button"
        onClick={handleShow}
      >
        Add Room Type
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        style={{ width: "100%", height: "64rem" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center" style={{ color: "green" }}>
            Add Room Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mb-2">
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
                    value={roomImage}
                    onChange={(e) => setRoomImage(e.target.value)}
                  ></Form.Control>
                  <Form.Control
                    type="file"
                    Label="choose file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const url = URL.createObjectURL(file);
                      setTempProfile(url);
                      setRoomImage(url);
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
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {rooms.map((room, index) => (
            <Col lg={4} sm={12} md={6} xl={4}>
              <Card key={index} className="my-3 p-1 rounded">
                <Card.Img variant="top" src={room.image}></Card.Img>
                <strong className="text-center">
                  <p
                    style={{
                      fontSize: "18px",
                      color: "green",
                      marginTop: "2px",
                    }}
                  >
                    {room.caption}
                  </p>
                </strong>
                <Row>
                  <Col md={5}>
                    <p
                      className="mx-2"
                      style={{
                        fontSize: "12px",
                        color: "blue",
                        marginTop: "4px",
                      }}
                    >
                      <b> uploaed on: {room.createdAt.split("T")[0]}</b>
                    </p>
                  </Col>
                  <Col md={5}>
                    <b>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "blue",
                          marginTop: "4px",
                        }}
                      >
                        By: {room.addedBy.name}
                      </p>
                    </b>
                  </Col>
                  <Col md={2}>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteHandler(room._id)}
                    >
                      <FaTrash style={{ marginBottom: "0px", color: "red" }} />
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default RoomType;
