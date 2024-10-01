import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import image1 from "../../src/assets/carasoul/c1.jpg";
import image2 from "../../src/assets/carasoul/c2.jpg";
import image3 from "../../src/assets/carasoul/c3.jpg";
import image4 from "../../src/assets/carasoul/c4.jpg";

const ProductCarousel = () => {
  return (
    <Carousel className="text-center bg-primary mb-4 my-2">
      <Carousel.Item key={1}>
        <Link to={"/"}>
          <Image
            className="productCarousel"
            style={{ height: "500px", width: "950px" }}
            src={image3}
            alt="wamson"
            fluid
          />
          <Carousel.Caption style={{ width: "70%" }}>
            <p>
              Live, Learn, and Thrive in Our Exceptional PG! Our PG offers the
              ideal environment for students and professionals alike. Enjoy
              home-cooked meals, high-speed Wi-Fi, and a supportive atmosphere.
            </p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item key={2}>
        <Link to={"/"}>
          <Image
            className="productCarousel"
            style={{ height: "500px", width: "950px" }}
            src={image2}
            alt="wamson"
            fluid
          />
          <Carousel.Caption style={{ width: "70%" }}>
            <p>
              Your Perfect PG Awaits – Secure, Comfortable, and Affordable! Find
              the perfect balance of safety, comfort, and affordability in our
              well-furnished rooms. Join our vibrant community today!
            </p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item key={3}>
        <Link to={"/"}>
          <Image
            className="productCarousel"
            style={{ height: "500px", width: "950px" }}
            src={image1}
            alt="wamson"
            fluid
          />
          <Carousel.Caption style={{ width: "70%" }}>
            <p>
              Experience Comfort and Convenience at Its Best! Discover a home
              away from home with our premium PG accommodation. Enjoy modern
              amenities, a friendly community, and unparalleled comfort.
            </p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>

      <Carousel.Item key={4}>
        <Link to={"/"}>
          <Image
            className="productCarousel"
            style={{ height: "500px", width: "950px" }}
            src={image4}
            alt="wamson"
            fluid
          />
          <Carousel.Caption style={{ width: "70%" }}>
            <p>
              Luxury Living Made Affordable – Your Ideal PG Awaits! Indulge in
              luxurious amenities at an affordable price. Our PG offers fully
              furnished rooms, daily housekeeping, and more for a hassle-free
              stay.
            </p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductCarousel;
