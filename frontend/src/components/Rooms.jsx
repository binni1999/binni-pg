import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import imageRoom from "./../assets/images/room.jpg";
import { useGetRoomsQuery } from "../slices/externalUserSlice";
import Loader from "./Loader";
import Message from "./Message";
import Meta from "./Meta";
const Room = () => {
  const { data: rooms, isLoading, error } = useGetRoomsQuery();
  //console.log(rooms);
  return (
    <>
      <Meta title={"Rooms"} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {rooms?.map((room) => (
            <Col key={room._id} lg={4} sm={12} md={6} xl={4}>
              <Card className="my-3 p-1 rounded">
                <Card.Img variant="top" src={room?.image || imageRoom} />
              </Card>
              <strong className="text-center">
                <p>{room.caption}</p>
              </strong>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Room;
