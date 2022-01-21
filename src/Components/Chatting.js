import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendChat } from "../redux/reducers/roomReducer";
import moment from "moment";

const Chatting = ({ plugin, roomId, username }) => {
    const dispatch = useDispatch();
    const [ inputChat, setInputChat] = useState("");
    const { chatData } = useSelector((state) => state.roomReducer);

    const renderChatData = chatData.map((chat, index) => (
        <p key={index}> {chat.display} : {chat.text} [ {chat.time} ]</p>
    ));

    const sendChatData = () => {
        let msg = {
          textroom: "message",
          room: roomId,
          text: inputChat,
          display: username
        }

        plugin.data({
          text: JSON.stringify(msg),
          success: function () {
            dispatch(sendChat({
              text: inputChat,
              display: username,
              time: moment().format("HH:mm")
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
              width: "400px",
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