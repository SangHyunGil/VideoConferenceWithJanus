import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendChat } from "../../redux/reducers/roomReducer";
import moment from "moment";
import styled from "styled-components";

const ChattingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  .chatting-data {
    flex: 1 1 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    overflow-y: scroll;
    gap: 10px;
  }
  .chatting-input-wrapper {
    display: flex;
    width: 100%;
    input {
      flex: 1;
    }
    button {
      border: 0;
      color: white;
      padding: 5px 10px;
      background: #0049af;
      transition: all 0.3s linear;
      &:hover {
        background: #ffc107;
        cursor: pointer;
        transition: all 0.3s linear;
      }
    }
  }
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div {
    padding: 5px 10px;
    border-radius: 5px;
    flex-basis: 50%;
  }
  &.myChat {
    align-items: flex-end;
    & > div {
      background: #e5e8f0;
    }
  }
  &.ohtersChat {
    align-items: flex-start;
    & > div {
      background: white;
    }
  }
`;

const Chatting = ({ plugin, roomId, username }) => {
  const dispatch = useDispatch();
  const [inputChat, setInputChat] = useState("");
  const [privateTo, setPrivateTo] = useState("false");
  const { chatData, subscribeFeeds } = useSelector(
    (state) => state.roomReducer
  );

  const renderChatData = chatData.map((chat, index) => {
    return (
      <ChatWrapper
        key={index}
        className={username === chat.display ? "myChat" : "ohtersChat"}
      >
        <span>{chat.isPrivateMessage ? '(DM)' : ''}{chat.display}</span>
        <div>{chat.text}</div>
        <span>{chat.time}</span>
      </ChatWrapper>
    );
  });

  const sendChatData = () => {
    if (privateTo !== "false") {
      let msg = {
        textroom: "message",
        room: roomId,
        text: inputChat ,
        to: privateTo,
        display: username,
      };

      plugin.data({
        text: JSON.stringify(msg),
        success: function () {
          dispatch(
            sendChat({
              text: inputChat,
              display: username,
              time: moment().format("HH:mm"),
              isPrivateMessage: true,
            })
          );
          console.log("Data Channel Message Sent");
        },
        error: function (err) {
          console.log(err);
        },
      });
    } else {
      let msg = {
        textroom: "message",
        room: roomId,
        text: inputChat,
        display: username,
      };

      plugin.data({
        text: JSON.stringify(msg),
        success: function () {
          dispatch(
            sendChat({
              text: inputChat,
              display: username,
              time: moment().format("HH:mm"),
              isPrivateMessage: false,
            })
          );
          console.log("Data Channel Message Sent");
        },
        error: function (err) {
          console.log(err);
        },
      });
    }

    setInputChat("");
  };

  const handleChange = (e) => {
    setInputChat(e.target.value);
  };

  const onChangeHanlder = (e) => {
    setPrivateTo(e.target.value);
  };

  return (
    <>
      <ChattingWrapper>
        <div className="chatting-data">{renderChatData}</div>
        <div className="chatting-input-wrapper">
          <select onChange={onChangeHanlder} value={privateTo}>
            <option value="false">전체</option>
            {subscribeFeeds.map((item, index) => (
              <option key={index} value={item.display}>
                {item.display}
              </option>
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
      </ChattingWrapper>
    </>
  );
};

export default Chatting;
