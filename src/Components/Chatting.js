import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendChat } from "../redux/reducers/roomReducer";

const Chatting = ({ plugin, myroom, username }) => {
    const dispatch = useDispatch();
    const [inputChat, setInputChat] = useState("");
    const { chatData } = useSelector((state) => state.roomReducer);

    const renderChatData = chatData.map((c, i) => {
        return <p key={i}> {c} </p>;
    });

    const sendChatData = (data) => {
        let message = {
          textroom: "message",
          room: myroom,
          text: data,
          display: username
        }
    
        plugin.data({
          text: JSON.stringify(message),
          success: function () {
            dispatch(sendChat({
              text: data,
              display: username,
              time: new Date()
            }))
            console.log("Data Channel Message Sent");
          },
          error: function (err) {
            console.log(err);
          }
        })

        setInputChat("");
      };

    const handleChange = (e) => {
        setInputChat(e.target.value);
    };

    return (
        <>
          <div
            style={{
              border: "1px solid",
              overflow: "auto",
              minHeight: "500px",
            }}
          >
            {renderChatData}
          </div>
          <input
            type="text"
            value={inputChat}
            onChange={handleChange}
            style={{ border: "1px solid" }}
          />
          <button onClick={sendChatData}>전송</button>
        </>
      );
}

export default Chatting;