import { Button, Col, Row, Table } from "react-bootstrap";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetAllUsersQuery } from "../../slices/adminSlice";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Paginate from "../../components/admin/Paginate";
import { Link, useParams } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import Meta from "../../components/Meta";

const UsersList = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetAllUsersQuery({
    pageNumber,
    keyword,
  });
  console.log(data);
  return (
    <>
      <Meta title={"Users"} />
      {!keyword ? (
        <Row>
          <Col md={3}></Col>
          <Col className="my-3">
            <h1 className="text-center">Users</h1>
          </Col>
          <Col md={3} className="my-3">
            <SearchBox
              holder={"User"}
              link={"/admin/users"}
              searchType={"users"}
            />
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col md={3}></Col>
            <Col className="my-3">
              <h1 className="text-center">Users</h1>
            </Col>
            <Col md={3} className="my-3">
              <SearchBox
                holder={"User"}
                link={"/admin/users"}
                searchType={"users"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Link to={"/admin/users"} className="btn btn-light ">
                Go Back
              </Link>
            </Col>
          </Row>
        </>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Table
          style={{ width: "100%", fontSize: "20px" }}
          striped
          hover
          responsive
          className="table-sm"
        >
          <thead>
            <tr className="usertrHeading">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Room No</th>
              <th>Rent</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user._id} className="usertrHeading">
                <td>{user._id}</td>

                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.mobileNumber ? (
                    user.mobileNumber
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>

                <td>
                  {user.roomNumber ? (
                    user.roomNumber
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td className="">
                  {user.userType === "Admin" ? (
                    <Button
                      disabled
                      className="py-1 userDetailsButton"
                      style={{ height: "2.5rem" }}
                    >
                      Notify
                    </Button>
                  ) : (
                    <LinkContainer to={`/admin/rent-details/${user._id}/edit`}>
                      <Button
                        className="py-1 userDetailsButton"
                        style={{ height: "2.5rem" }}
                      >
                        Notify
                      </Button>
                    </LinkContainer>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button
                      variant="light"
                      className="btn-sm userDetailsButton"
                    >
                      <FaEdit style={{ color: "green" }} />
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" className="btn-sm userDetailsButton">
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Row className="my-4">
        <Col md={5}></Col>
        <Col md={3} className="text-center">
          <p className="text-center paginationClass">
            <Paginate pages={data?.pages} page={data?.page} path={"users"} />
          </p>
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
};

export default UsersList;
