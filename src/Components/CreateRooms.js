import { useState } from "react";
import { createRoom } from "../api/Api";

const CreateRooms = () => {
    const [roomName, setRoomName] = useState("");
    const [pin, setPin] = useState("");

    const changeRoomNameHandler = (e) => {
        setRoomName(e.target.value);
    }

    const changePinHandler = (e) => {
        setPin(e.target.value);
    }

    const createRoomHandler = () => {
        let request = null;
        if (pin === "") {
            request = {
                request: "create",
                description: roomName,
                publishers: 10
            }
        } else {
            request = {
                request: "create",
                description: roomName,
                pin: pin,
                publishers: 10
            }
        }

        createRoom(request)
            .then(response => { console.log("Create Room Success", response)})
            .catch(error => console.log(error));
    }

    return (
        <>
        <div
            style={{display: "flex",
                    justifyContent: "center"}}
        >
            <p>
                방 제목 
            </p>
            <input
                type="text"
                value={roomName}
                onChange={changeRoomNameHandler}
                style={{ marginLeft: "10px",
                         marginRight: "10px" }}
            />
            <p>
                방 비밀번호 
            </p>
            <input
                type="text"
                value={pin}
                onChange={changePinHandler}
                style={{ marginLeft: "10px",
                         marginRight: "10px" }}
            />
            <button onClick={createRoomHandler}>생성</button>
          </div>
        </>
      );


}

export default CreateRooms;