import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./../assets/wamson3.JPG";
import { FaRegAddressBook, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userImage from "../assets/images/user.png";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully", {
        autoClose: 1000,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className="wamson-logo">
          <a href="/">
            <img src={logo} alt="wamson" />
          </a>
        </Navbar.Brand>

        {userInfo ? (
          userInfo?.userType === "Admin" ? (
            <>
              <Nav className="me-auto">
                <LinkContainer to={"/"}>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/users"}>
                  <Nav.Link>Users</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/rent-details"}>
                  <Nav.Link>Rent Details</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/enquiries"}>
                  <Nav.Link>Enquires</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav className="ms-auto">
                <LinkContainer to={"/profile"}>
                  <Nav.Link>
                    <img
                      src={
                        userInfo?.profilePic ? userInfo.profilePic : userImage
                      }
                      alt={""}
                      className="user-profile"
                    />
                    &nbsp; {userInfo.name}
                  </Nav.Link>
                </LinkContainer>

                <Nav.Link className="my-1 py-2" onClick={logoutHandler}>
                  <FaSignOutAlt />
                  &nbsp; Logout
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <LinkContainer to={"/"}>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/user-testimony"}>
                  <Nav.Link>Testimony</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/pay-rent"}>
                  <Nav.Link>Pay-Rent</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/user-enquiry"}>
                  <Nav.Link>Enquiry</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/rent-details"}>
                  <Nav.Link>Rent Details</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav className="ms-auto">
                <LinkContainer to={"/profile"}>
                  <Nav.Link>
                    <img
                      src={
                        userInfo?.profilePic ? userInfo.profilePic : userImage
                      }
                      alt={""}
                      className="user-profile"
                    />
                    &nbsp; {userInfo.name}
                  </Nav.Link>
                </LinkContainer>
                <Nav.Link className="my-1 py-2" onClick={logoutHandler}>
                  <FaSignOutAlt />
                  &nbsp; Logout
                </Nav.Link>
              </Nav>
            </>
          )
        ) : (
          <>
            <Nav className="me-auto">
              <LinkContainer to={"/"}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/rooms"}>
                <Nav.Link>Rooms</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/service"}>
                <Nav.Link>Services</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/about"}>
                <Nav.Link>About Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/gallery"}>
                <Nav.Link>Gallery</Nav.Link>
              </LinkContainer>

              <LinkContainer to={"/testimonial"}>
                <Nav.Link>Testimonial</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/contact"}>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ms-auto">
              <LinkContainer to={"/login"}>
                <Nav.Link>
                  <FaUser />
                  &nbsp; Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/register"}>
                <Nav.Link>
                  <FaRegAddressBook />
                  &nbsp; Register
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
