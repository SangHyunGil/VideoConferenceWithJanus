import { useState } from "react";
import { createRoom } from "../../api/Api";

const CreateRoom = () => {
    const [username, setUsername] = useState("");
    const [roomname, setRoomname] = useState("");
    const [pin, setPin] = useState("");

    const changeUsernameHandler = (e) => {
        setUsername(e.target.value);
    }

    const changeRoomnameHandler = (e) => {
        setRoomname(e.target.value);
    }

    const changePinHandler = (e) => {
        setPin(e.target.value);
    }

    const createRoomHandler = () => {
        let request = null;
        if (pin === "") {
            request = {
                request: "create",
                description: roomname,
                username: username
            }
        } else {
            request = {
                request: "create",
                description: roomname,
                pin: pin,
                username: username
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
                유저 이름 
            </p>
            <input
                type="text"
                value={username}
                onChange={changeUsernameHandler}
                style={{ marginLeft: "10px",
                         marginRight: "10px" }}
            />
            <p>
                방 제목 
            </p>
            <input
                type="text"
                value={roomname}
                onChange={changeRoomnameHandler}
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

export default CreateRoom;