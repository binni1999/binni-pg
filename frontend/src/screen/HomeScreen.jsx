import React from "react";
import ProductCarousel from "../components/ProductCarousel";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import AboutUsScreen from "./AboutUsScreen";
import Testimonial from "./Testimonial";
import Meta from "../components/Meta";
const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      {userInfo && userInfo.userType === "Admin" && (
        <>
          <Link to={"/admin/rooms"}>
            <Button className="mx-2 my-1 admin-button">
              <b>Edit Room</b>{" "}
            </Button>
          </Link>
          <Link to={"/admin/service"}>
            <Button className="mx-2 my-1 admin-button">
              <b>Edit Service</b>{" "}
            </Button>
          </Link>
          <Link to={"/admin/gallery"}>
            <Button className="mx-2 my-1 admin-button">
              <b>Edit Gallery</b>{" "}
            </Button>
          </Link>
        </>
      )}
      <ProductCarousel />
      <br />

      <Testimonial />
      <br />

      <AboutUsScreen />
      <Meta title="Home" />
    </>
  );
};

export default HomeScreen;
