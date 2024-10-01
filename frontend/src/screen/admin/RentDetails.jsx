import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  useGetAllRentDetailsQuery,
  useGetAllUsersQuery,
} from "../../slices/adminSlice";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/admin/Paginate";
import SearchBox from "../../components/SearchBox";
import { Link, useParams } from "react-router-dom";
import Meta from "../../components/Meta";

const RentDetails = () => {
  const { keyword, pageNumber } = useParams();
  const { data: rentDetails, error } = useGetAllRentDetailsQuery();
  const {
    data: users,
    isLoading: userLoading,
    error: userError,
  } = useGetAllUsersQuery({ keyword, pageNumber });
  //console.log(users);
  // console.log(rentDetails);

  return (
    <Container>
      <Meta title={"Rent Details"} />
      {!keyword ? (
        <Row>
          <Col md={3}></Col>
          <Col className="my-3">
            <h1 className="text-center">Rent-Details</h1>
          </Col>
          <Col md={3} className="my-3">
            <SearchBox
              holder={"Details"}
              link={"/admin/rent-details"}
              searchType={"rent-details"}
            />
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col md={3}></Col>
            <Col className="my-3">
              <h1 className="text-center">Rent-Details</h1>
            </Col>
            <Col md={3} className="my-3">
              <SearchBox
                holder={"Details"}
                link={"/admin/rent-details"}
                searchType={"rent-details"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Link to={"/admin/rent-details"} className="btn btn-light ">
                Go Back
              </Link>
            </Col>
          </Row>
        </>
      )}
      <Container className="my-3">
        <Row>
          <Col className="text-center my-2 rentDetails">
            <strong style={{ color: "green", marginLeft: "15px" }}>
              Room No
            </strong>
          </Col>
          <Col className="text-center  my-2  rentDetails">
            <strong style={{ color: "green" }}>Name</strong>
          </Col>
          <Col className="text-center  my-2 rentDetails">
            <strong style={{ color: "green" }}>Contact</strong>
          </Col>
          <Col className="text-center  my-2 rentDetails rentDetailsHide">
            <strong style={{ color: "green" }}>Mail Id</strong>
          </Col>
          <Col className="text-center  my-2 mx-1 rentDetails">
            <strong style={{ color: "green" }}>Rent Details</strong>
          </Col>
        </Row>

        {userLoading ? (
          <Loader />
        ) : userError ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {users.users.map((user) => (
              <Row className="my-2 text-center enquiry-row" key={user._id}>
                {user.userType !== "Admin" && (
                  <>
                    <Col className="rentDetails">{user.roomNumber}</Col>
                    <Col className="rentDetails">{user.name}</Col>
                    <Col className="rentDetails">{user.mobileNumber}</Col>
                    <Col className="rentDetailsHide">{user.email}</Col>

                    <Col className="rentDetails">
                      <LinkContainer
                        className="text-center"
                        to={`/admin/rent-details/${user._id}/view`}
                      >
                        <span className="span-button rentDetailsButton">
                          Details
                        </span>
                      </LinkContainer>
                    </Col>
                  </>
                )}
              </Row>
            ))}
          </>
        )}
        <Row className="my-4">
          <Col md={5}></Col>
          <Col md={3} className="text-center ">
            <p className="text-center paginationClass">
              <Paginate
                pages={users?.pages}
                page={users?.page}
                path={"rent-details"}
              />
            </p>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </Container>
  );
};

export default RentDetails;
