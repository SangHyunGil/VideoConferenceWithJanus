import { useState } from "react";
import { createRoom } from "../api/Api";

const CreateRooms = () => {
    const [roomName, setRoomName] = useState("");

    const handleChange = (e) => {
        setRoomName(e.target.value);
    }

    const createRoomHandler = () => {
        let request = {
            request: "create",
            description: roomName,
            publishers: 10
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
                onChange={handleChange}
                style={{ marginLeft: "10px",
                         marginRight: "10px" }}
            />
            <button onClick={createRoomHandler}>전송</button>
          </div>
        </>
      );


}

export default CreateRooms;