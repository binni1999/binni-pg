import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetTestimonyQuery,
  usePostTestimonyMutation,
} from "../slices/userApiSlice";

import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import hall from "../../src/assets/images/hall.jpg";
import { setCredentials } from "../slices/authSlice";
import Meta from "../components/Meta";
const UserTestimony = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const [postTestimonial] = usePostTestimonyMutation();
  const {
    data: userTestimony,
    refetch,
    isLoading,
    error,
  } = useGetTestimonyQuery();
  // console.log(userTestimony);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {}, [refetch, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { title, content };
    try {
      const result = await postTestimonial(data);
      if (result?.data) {
        toast.success(result.data.message);
        dispatch(setCredentials({ ...userInfo, testimonyPosted: true }));
      } else {
        toast.error(result?.error?.data?.message);
      }
      setTitle("");
      setContent("");
      setShow(false);
      refetch();
    } catch (error) {
      toast.error(error.toString());
    }
  };

  return (
    <>
      <Container
        className="my-3 userTestimony"
        fluid
        style={{
          backgroundImage: `url(${hall})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Meta title={"User Testimony"} />
        {!userInfo?.testimonyPosted ? (
          <>
            <Button
              onClick={handleShow}
              className="mx-4 admin-button"
              style={{ borderRadius: "3rem", width: "12rem", height: "4rem" }}
            >
              Add Your Testimony
            </Button>
            <Modal show={show} onHide={handleClose} animation={true}>
              <Modal.Header closeButton>
                <Modal.Title className="text-center" style={{ color: "green" }}>
                  Post Your Testimony
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={submitHandler}>
                  Post Yours
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Card
                className="my-4 py-2 mx-4"
                style={{
                  width: "25rem",
                  height: "14rem",
                  borderRadius: "3rem",
                  background: "#3b5057",
                }}
              >
                <Card.Body>
                  <Card.Title className="text-center text-white my-2">
                    {userTestimony?.testimony[0]?.title}
                  </Card.Title>

                  <Card.Text style={{ color: "white", fontSize: "16px" }}>
                    {userTestimony?.testimony[0]?.content}
                  </Card.Text>
                  <Card.Text
                    as={"h6"}
                    style={{
                      textAlign: "right",
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    - {userTestimony?.testimony[0]?.user?.name}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default UserTestimony;
