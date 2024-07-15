import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import imageRoom from "./../assets/images/room3.jpg";
import Meta from "../components/Meta";
const AboutUsScreen = () => {
  return (
    <section>
      <Row>
        <Meta title={"About us"} />
        <Col md={6}>
          <div className="my-3 mx-2 py-5">
            <div>
              <strong className="text-center" style={{ color: "#283d29" }}>
                <h1>About Us</h1>
              </strong>
              <div>
                <p>
                  Welcome to our PG, where comfort meets convenience. Located in
                  a prime area, our accommodation offers a safe and friendly
                  environment, making it an ideal choice for students and
                  professionals alike. Our spacious rooms are well-furnished and
                  equipped with all modern amenities, including high-speed
                  Wi-Fi, a fully equipped kitchen, and 24/7 security. Enjoy
                  delicious, home-cooked meals and a homely atmosphere that
                  ensures you feel right at home. Our supportive staff is always
                  available to assist with any needs, ensuring a hassle-free
                  stay. With easy access to public transport, shops, and
                  restaurants, our PG is the perfect place to balance work,
                  study, and leisure. Join us for a comfortable and enriching
                  living experience.
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <Image
            className="my-5"
            src={imageRoom}
            alt="room"
            style={{ borderRadius: "20px", width: "100%", height: "75%" }}
          />
        </Col>
      </Row>
    </section>
  );
};

export default AboutUsScreen;
