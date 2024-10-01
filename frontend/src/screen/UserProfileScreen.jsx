import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetUserProfileQuery,
  useUpdateUserPasswordMutation,
  useUpdateUserProfileMutation,
  useUploadUserProfileMutation,
} from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Meta from "../components/Meta";

const UserProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [tempProfile, setTempProfile] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { data: user, refetch, isLoading } = useGetUserProfileQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [uploadUserProfile] = useUploadUserProfileMutation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { userInfo } = useSelector((state) => state.auth);

  const [updateUserPassword] = useUpdateUserPasswordMutation();

  //console.log(user);

  useEffect(() => {
    if (user) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setMobileNumber(userInfo.mobileNumber);
      setRoomNumber(userInfo.roomNumber);
      setPermanentAddress(userInfo.permanentAddress);
      setProfilePic(userInfo.profilePic);
      setTempProfile(userInfo.profilePic);
    }
  }, [
    userInfo.name,
    userInfo.email,
    user,
    userInfo.mobileNumber,
    userInfo.profilePic,
    userInfo.permanentAddress,
    userInfo.roomNumber,
  ]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      email,
      mobileNumber,
      roomNumber,
      permanentAddress,
      profilePic,
    };
    //console.log("updated user", updatedUser);
    const result = await updateUserProfile(updatedUser);
    //console.log(result);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Profile Updated");
      const updatedData = result.data;
      //console.log("updated data", updatedData);

      dispatch(setCredentials({ ...updatedData }));
      setProfilePic(result.data.profilePic);
      await refetch();
      navigate("/profile");
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
      const res = await uploadUserProfile(formData);
      // console.log(res);
      if (res?.data?.profilePic) {
        setProfilePic(res.data.profilePic);
      }
      if (!res?.data || !res?.data?.profilePic) {
        toast.error("Failed to upload profile picture");
        return;
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const passwordSubmitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return toast.error("Password and Confirm Password does not match");
    }
    const data = {
      currentPassword,
      newPassword,
    };
    try {
      const result = await updateUserPassword(data);
      //console.log(result);
      if (result?.data?.message) {
        toast.success(result.data.message);
      }
      if (result?.error?.data) {
        toast.error(result.error.data.message);
      }
      setNewPassword("");
      setConfirmNewPassword("");
      setCurrentPassword("");
    } catch (err) {
      console.log("error  is", err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Meta title={"User Profile"} />
      <Container>
        <Link to={`/`} className="btn btn-light my-1">
          Home
        </Link>
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

          <h2
            className="mx-5 px-5 updateProfileTitle"
            style={{ color: "green" }}
          >
            Update Profile
          </h2>
        </Row>
        <Row className="mx-2">
          <Col md={6}>
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
                <Col md={6}>
                  <Form.Group controlId="profilePic" className="my-1">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="enter image url"
                      value={profilePic}
                      onChange={(e) => setProfilePic(e.target.value)}
                    ></Form.Control>
                    <Form.Control
                      type="file"
                      Label="choose file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const url = URL.createObjectURL(file);
                        setTempProfile(url);
                        setProfilePic(url);
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
                        width: "8rem",
                        height: "8rem",
                        borderRadius: "50%",
                      }}
                    ></img>
                  )}
                </Col>
              </Row>

              <Button type="submit" variant="primary" className="my-2">
                &nbsp;&nbsp;Update&nbsp;&nbsp;
              </Button>
            </Form>
          </Col>
          <Col className="changePasswordSection">
            <Row>
              <h4 className="mx-4 my-1 px-4" style={{ color: "green" }}>
                Change Password?
              </h4>

              <Button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="luffy-button mx-5 my-1 px-2 buttonChangePassword"
                style={{ color: "white", width: "6rem" }}
              >
                <b>{showPasswordForm ? "Close" : "Change"}</b>
              </Button>
            </Row>
            {showPasswordForm && (
              <Row className="changePasswordFormRow">
                <Form
                  className="mx-4 my-1 px-4 changePasswordForm"
                  onSubmit={passwordSubmitHandler}
                >
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="currentpassword" className="my-1">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="newpassword" className="my-1">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group
                        controlId="confirmnewpassword"
                        className="my-1"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button type="submit" variant="primary" className="my-2">
                    &nbsp;&nbsp;Update&nbsp;&nbsp;
                  </Button>
                </Form>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfileScreen;
