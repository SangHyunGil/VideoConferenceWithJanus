import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findRooms } from "../api/Api";
import styled from "styled-components";
import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const CardWrapper = styled(motion.div)`
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(6, minmax(200px, 1fr));
  grid-gap: 10px;
  justify-items: center;
  margin: 0 auto;
  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CardLink = styled(Link)`
  width: 100%;
`;

const RoomCard = styled(Card)`
  text-decoration: none;
`;

const FindRooms = () => {
    const [rooms, setRooms] = useState([])

    // const renderRoomData = rooms.map((room, index) => (
    //     <p key={index}> {room.room} : {room.description}</p>
    // ));

    useEffect(() => {
        findRooms()
        .then(response => {
            const {data: {response: {list}}} = response
            list.map((room) => (
                setRooms((prev) => [...prev, room]))
            )})
        .catch(error => console.log(error));
    }, [])

    return (
        <>
        <div>
        <CardWrapper>
          {rooms?.map((room) => {
            return (
              <CardLink
                style={{ textDecoration: "none" }}
                to={{ pathname: `/rooms/${room.room}` }}
                key={room.room}
              >
                <RoomCard>
                  <CardContent>
                    <h2>{room.description}</h2>
                  </CardContent>
                </RoomCard>
              </CardLink>
            );
          })}
        </CardWrapper>
        </div>
        {/* <div
            style={{display: "flex",
                    justifyContent: "center"}}
        >
            {renderRoomData}
          </div> */}
        </>
      );


}

export default FindRooms;