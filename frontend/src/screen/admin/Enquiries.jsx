import { Col, Container, Row } from "react-bootstrap";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useGetEnquiriesQuery } from "../../slices/adminSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import Paginate from "../../components/admin/Paginate";
import { Link, useParams } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import Meta from "../../components/Meta";
const Enquiries = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetEnquiriesQuery({
    keyword,
    pageNumber,
  });

  return (
    <Container>
      <Meta title={"Enquiries"} />
      {!keyword ? (
        <Row>
          <Col md={3}></Col>
          <Col className="my-3">
            <h1 className="text-center">Enquiries</h1>
          </Col>
          <Col md={3} className="my-3">
            <SearchBox
              holder={"Ask By"}
              link={"/admin/enquiries"}
              searchType={"enquiries"}
            />
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col md={3}></Col>
            <Col className="my-3">
              <h1 className="text-center">Enquiries</h1>
            </Col>
            <Col md={3} className="my-3">
              <SearchBox
                holder={"Ask By"}
                link={"/admin/enquiries"}
                searchType={"enquiries"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Link to={"/admin/enquiries"} className="btn btn-light ">
                Go Back
              </Link>
            </Col>
          </Row>
        </>
      )}

      <Container>
        <Row>
          <Col className="text-center">
            <strong style={{ color: "green" }}> Date</strong>
          </Col>
          <Col className="text-center">
            <strong style={{ color: "green" }}>Ask By</strong>
          </Col>
          <Col className="text-center">
            <strong style={{ color: "green" }}>Resolved</strong>
          </Col>
          <Col className="text-center">
            <strong style={{ color: "green" }}> Resolved On</strong>
          </Col>
          <Col className="text-center">
            <strong style={{ color: "green" }}>Details</strong>
          </Col>
        </Row>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {data.enquiry.map((enquiry) => (
              <Row className="my-3 text-center enquiry-row" key={enquiry._id}>
                <Col>{enquiry.createdAt.substring(0, 10)}</Col>
                <Col>{enquiry.name}</Col>
                <Col>
                  {enquiry.isResolved ? (
                    <FaRegCircleCheck
                      style={{ color: "green", fontSize: "24px" }}
                    />
                  ) : (
                    <FaTimesCircle style={{ color: "red", fontSize: "24px" }} />
                  )}
                </Col>

                <Col>
                  {enquiry.isResolved ? (
                    enquiry.resolvedOn.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red", fontSize: "24px" }} />
                  )}
                </Col>
                <Col>
                  <LinkContainer to={`/admin/enquiries/${enquiry._id}/edit`}>
                    <span className="span-button">Details</span>
                  </LinkContainer>
                </Col>
              </Row>
            ))}
          </>
        )}
        <Row className="my-4">
          <Col md={5}></Col>
          <Col md={3} className="text-center">
            <p className="text-center">
              <Paginate
                pages={data?.pages}
                page={data?.page}
                path={"enquiries"}
                keyword={keyword}
              />
            </p>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Enquiries;
