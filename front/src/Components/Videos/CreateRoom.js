import { useState } from "react";
import { createRoom } from "../../api/Api";
import MuiTextField from "../Mui/MuiTextField";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CreateRoomStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60vw;
    margin: 2rem auto;
    gap: 10px;
    padding: .5rem 1rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    & > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        & > div {
            width: 100%;
        }
    }
    & > button {
        width: 100%;
        border: none;
        background-color: #0049af;
        color: white;
        font-size: 1.2rem;
        padding: 0.5rem;
        transition: 0.3s all linear;
        &:hover {
            background-color: #ffc107;
            transition: 0.3s all linear;
            cursor: pointer;
        }
    }
`;

const CreateRoom = () => {
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const changeUsernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const changeRoomnameHandler = (e) => {
    setRoomname(e.target.value);
  };

  const changePinHandler = (e) => {
    setPin(e.target.value);
  };

  const createRoomHandler = (e) => {
    e.preventDefault();
    let request = null;
    if (pin === "") {
      request = {
        request: "create",
        description: roomname,
        username: username,
      };
    } else {
      request = {
        request: "create",
        description: roomname,
        pin: pin,
        username: username,
      };
    }

    createRoom(request)
      .then((response) => {
        console.log(response);
        navigate(`/rooms/${response.data.data.number}?username=`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={createRoomHandler}>
      <CreateRoomStyle>
        <div>
          <p>?????? ??????</p>
          <MuiTextField
            label="?????? ??????"
            value={username}
            onChange={changeUsernameHandler}
            variant="outlined"
          />
        </div>
        <div>
          <p>??? ??????</p>
          <MuiTextField
            label="??? ??????"
            value={roomname}
            onChange={changeRoomnameHandler}
            variant="outlined"
          />
        </div>
        <div>
          <p>??? ????????????</p>
          <MuiTextField
            type="password"
            label="??? ????????????"
            value={pin}
            onChange={changePinHandler}
            variant="outlined"
          />
        </div>
        <button>??????</button>
      </CreateRoomStyle>
    </form>
  );
};

export default CreateRoom;
