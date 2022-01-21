import { useState } from "react";
import { createRoom } from "../api/Api";
import { admin_secret } from "../utils/config"

const CreateVideo = () => {
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

        let message = {
            janus: "message_plugin",
            plugin: "janus.plugin.videoroom",
            transaction: Math.random().toString(36).substr(2,11),
            admin_secret: admin_secret,
            request: request
          }

          createRoom(message)
            .then(response => { console.log("Create Room Success")})
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

export default CreateVideo;