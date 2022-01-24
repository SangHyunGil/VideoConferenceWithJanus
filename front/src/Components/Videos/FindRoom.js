import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findRooms } from "../../api/Api";
import styled from "styled-components";
import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { getRoomInfo } from "../../redux/reducers/roomReducer";

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

const FindRoom = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [rooms, setRooms] = useState([]);
    const [pin, setPin] = useState("");
    const [joinRoom, setJoinRoom] = useState(false);
    const navigate = useNavigate();

    // const renderRoomData = rooms.map((room, index) => (
    //     <p key={index}> {room.room} : {room.description}</p>
    // ));

    useEffect(() => {
        findRooms()
        .then(response => {
            const {data: {data}} = response;
            data.map((room) => (
                setRooms((prev) => [...prev, room]))
            )})
        .catch(error => console.log(error));
    }, [])

    const openModal = (room) => {
      setJoinRoom(room);
    }

    const closeModal = () => {
      setJoinRoom(false);
    };

    const changeUsernameHandler = (e) => {
      setUsername(e.target.value);
    }
    
    const changePinHandler = (e) => {
      setPin(e.target.value);
    }

    const joinRoomHandler = (room) => {
      dispatch(getRoomInfo({
        room: room.number,
        creator: room.username
      }))
      navigate("/rooms/"+room.number+"?username="+username);
    }

    const joinRoomWithPWHandler = (room, pin) => {
      dispatch(getRoomInfo({
        room: room.number,
        creator: room.username
      }))
      navigate("/rooms/"+room.number+"?pin="+pin+"&username="+username);
    }

    return (
        <>
        <div>
        <input
                type="text"
                value={username}
                onChange={changeUsernameHandler}
                style={{ marginLeft: "10px",
                         marginRight: "10px" }}
        />
        <CardWrapper>
          {rooms?.map((room) => {
            return (
              <div
                style={{ textDecoration: "none" }}
                key={room.number}
                onClick={room.hasPin ? () => openModal(room) : () => joinRoomHandler(room)}
              >
                <RoomCard>
                  <CardContent>
                    <h2>{room.description}</h2>
                    <h2>{room.username}</h2>
                  </CardContent>
                </RoomCard>
              </div>
            );
          })}
        </CardWrapper>
        <Modal open={joinRoom} close={closeModal} header="비밀번호 입력">
          <div style = {{ display: "flex", justifyContent: "center" }}>
            <p>
              비밀번호　
            </p>
            <input
                type="text"
                value={pin}
                onChange={changePinHandler}
            />
            <button onClick={() => joinRoomWithPWHandler(joinRoom, pin)}>입장</button>
          </div>
        </Modal>  
        </div>
        </>
      );


}

export default FindRoom;