import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-4">
      <hr />
      <Container>
        <Row>
          <Col md={6}>
            {/* <p className="text-center">
              <strong style={{ color: "green" }}>Useful Links</strong>
            </p> */}
            <strong style={{ color: "green" }}>
              <b>Useful Links</b>
            </strong>{" "}
            <Row>
              <Col>
                <Link to={"/"}>
                  <p>Home</p>
                </Link>
              </Col>
              <Col>
                <Link to={"/service"}>
                  <p>Services</p>
                </Link>
              </Col>
              <Col>
                <Link to={"/rooms"}>
                  <p>Rooms</p>
                </Link>
              </Col>
              <Col>
                <Link to={"/about"}>
                  <p>About</p>
                </Link>
              </Col>
              <Col>
                <Link to={"/gallery"}>
                  <p>Gallery</p>
                </Link>
              </Col>

              <Col>
                <Link to={"/testimonial"}>
                  <p>Testimonial</p>
                </Link>
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <strong style={{ color: "green" }}>
              <b>Contact</b>
            </strong>
            <br />
            <p>
              <b>8395002130</b> <br />
              <a href={`mailto:pankajbinwal@gmail.com`}>
                <b>pankajbinwal@gmail.com</b>
              </a>
            </p>
          </Col>
          <Col md={2}>
            <strong style={{ color: "green" }}>
              
              <b>Connect</b>
            </strong>
            <br />
            <a
              href="https://www.facebook.com/pankajbinwal"
              rel="noreferrer"
              target="_blank"
            >
              <span style={{ fontSize: "24px", color: "blue" }}>
                <FaFacebook />
              </span>
            </a>
            &nbsp; &nbsp;
            <a
              href="https://www.instagram.com/pnkj.in?igsh=ZzczYXkzczF1M3hi"
              rel="noreferrer"
              target="_blank"
            >
              <span style={{ fontSize: "24px", color: "red" }}>
                <FaInstagram />
              </span>
            </a>
            &nbsp; &nbsp;
            <a
              href="https://www.linkedin.com/in/pankaj-binwal-566154197/"
              rel="noreferrer"
              target="_blank"
            >
              <span style={{ fontSize: "24px", color: "blue" }}>
                <FaLinkedin />
              </span>
            </a>
            &nbsp; &nbsp;
            <a href="https://x.com/" rel="noreferrer" target="_blank">
              <span style={{ fontSize: "24px", color: "#0d74a3" }}>
                <FaTwitter />
              </span>
            </a>
          </Col>
        </Row>
        <Row className="text-center py-3">
          <Col>
            <h6>
              <p>
                <b>Wamson &copy; {currentYear} All Rights Reserved</b>
              </p>
            </h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
