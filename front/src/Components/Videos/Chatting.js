import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendChat } from "../../redux/reducers/roomReducer";
import moment from "moment";

const Chatting = ({ plugin, roomId, username }) => {
    const dispatch = useDispatch();
    const [inputChat, setInputChat] = useState("");
    const [privateTo, setPrivateTo] = useState("false");
    const { chatData, subscribeFeeds } = useSelector((state) => state.roomReducer);

    const renderChatData = chatData.map((chat, index) => (
        <p key={index}> {chat.display} : {chat.text} [ {chat.time} ]</p>
    ));

    const sendChatData = () => {
        if (privateTo != "false") {
          let msg = {
            textroom: "message",
            room: roomId,
            text: inputChat+" [private]",
            to: privateTo,
            display: username
          }

          plugin.data({
            text: JSON.stringify(msg),
            success: function () {
              dispatch(sendChat({
                text: inputChat+" [private]",
                display: username,
                time: moment().format("HH:mm")
              }))
              console.log("Data Channel Message Sent");
            },
            error: function (err) {
              console.log(err);
            }
          })
        } else {
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
        }

        setInputChat("");
      };

    const handleChange = (e) => {
        setInputChat(e.target.value);
    };

    const onChangeHanlder=(e)=>{
      setPrivateTo(e.target.value);
    }

    return (
        <>
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              width: "100%",
              border: "1px solid",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              height: "500px",
            }}
          >
            {renderChatData}
          
          </div>
          <div
              style={{
                width: "100%",
                display: "flex"
              }}
            >
              <select onChange={onChangeHanlder} value={privateTo}>
                <option value="false">전체</option>
                {subscribeFeeds.map((item, index)=> (
                    <option key={index} value={item.display}>{item.display}</option>
                ))}
              </select>

              <input
                type="text"
                value={inputChat}
                onChange={handleChange}
                style={{ border: "1px solid" }}
              />
              <button onClick={sendChatData}>전송</button>
            </div>
          </div>
        </>
      );
}

export default Chatting;