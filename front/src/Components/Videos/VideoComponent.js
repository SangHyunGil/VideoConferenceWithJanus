import Janus from "../../utils/janus";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import hark from "hark";
import {
  joinRoom,
  removeSubscriber,
  subscribeFeed,
  addPublishStream,
  addSubscribeStream,
  toggleVideo,
  toggleAudio,
  receiveChat,
  toggleScreenSharing,
  exitRoom,
  changeMainFeed,
} from "../../redux/reducers/roomReducer";
import PublishVideo from "./PublishVideo";
import SubscribeVideo from "./SubscribeVideo";
import MainVideo from "./MainVideo";
import Chatting from "./Chatting";
import Participant from "./Participant";
import moment from "moment";
import { server } from "../../utils/config";
import { useNavigate, useParams } from "react-router-dom";
import { destroyRoom } from "../../api/Api";
import styled from "styled-components";

let storePlugin = null;
let username = null;
let myserver = server;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem auto;
  max-width: 1400px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
  border-radius: 5px;
  @media (max-width: 1400px) {
    margin: 1rem !important;
  }
  .participant {
    height: 100%;
  }
  .control-wrapper {
    background: #F5F7FB;
    border-radius: 10px;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .control-panel {
      display: flex;
      gap: 1rem;
      justify-content: center;
      button {
        border: 0;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        transition: all 0.3s linear;
        width: 50%;
        &:hover {
          cursor: pointer;
        }
        &:first-child {
          background: #0049af;
          &:hover {
            background: #ffc107;
            transition: all 0.3s linear;
          }
        }
        &:last-child { 
          background: #ffc107;
          &:hover {
            background: #0049af ;
            transition: all 0.3s linear;
          }
        }
      }
    }
  }
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem auto;
  max-width: 1400px;
  padding: 1rem 2rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  @media (max-width: 1400px) {
    margin: 1rem !important;
  }
  button {
    border: 0;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px;
    transition: all 0.3s linear;
    &:hover {
      cursor: pointer;
    }
    &:first-child {
      background-color: #0049af;
      &:hover {
        background-color: #ffc107;
        transition: all 0.3s linear;
      }
    }
    &:nth-child(2) {
      background-color: #eb4d4b;
      &:hover {
        background-color: #ff7979;
        transition: all 0.3s linear;
      }
    }
    &:nth-child(3) {
      background-color: #0984e3;
      &:hover {
        background-color: #74b9ff;
        transition: all 0.3s linear;
      }
    }
    &:nth-child(4) {
      background-color: #0984e3;
      &:hover {
        background-color: #74b9ff;
        transition: all 0.3s linear;
      }
    }
  }
`;

const VideoSummaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 1400px;
  padding: 1rem 2rem;
  margin: 1rem auto;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  @media (max-width: 1400px) {
    margin: 1rem !important;
  }
  & > div {
    max-width: 200px;
  }
`;

const VideoComponent = () => {
  const [ChooseControl, setChooseControl] = useState('chat');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    publishFeed,
    subscribeFeeds,
    onoffVideo,
    onoffAudio,
    onoffScreenSharing,
    chatData,
    creator,
  } = useSelector((state) => state.roomReducer);
  const params = new URLSearchParams(window.location.search);
  let pin = params.get("pin");
  let { roomId } = useParams();
  username = params.get("username");
  roomId = Number(roomId);

  useEffect(() => {
    let janus = null;
    let mystream = null;
    let opaqueId = "videoroomtest-" + Janus.randomString(10);

    Janus.init({
      debug: "all",
      callback: function () {
        // WebRTC ???????????????
        if (!Janus.isWebrtcSupported()) {
          Janus.log("No WebRTC support... ");
          return;
        }
        // ?????? ??????
        janus = new Janus({
          server: myserver,
          success: function () {
            // VideoRoom Plugin ??????
            janus.attach({
              plugin: "janus.plugin.videoroom",
              opaqueId: opaqueId,
              success: function (pluginHandle) {
                storePlugin = pluginHandle;
                Janus.log(
                  "Plugin attached! (" +
                    storePlugin.getPlugin() +
                    ", id=" +
                    storePlugin.getId() +
                    ")"
                );
                Janus.log("  -- This is a publisher/manager");
                if (pin) {
                  var register = {
                    request: "join",
                    room: roomId,
                    ptype: "publisher",
                    display: username,
                    pin: pin,
                  };
                } else {
                  var register = {
                    request: "join",
                    room: roomId,
                    ptype: "publisher",
                    display: username,
                  };
                }

                storePlugin.send({ message: register });
              },
              error: function (error) {
                // ?????? ?????????
                Janus.error("  -- Error attaching plugin...", error);
                Janus.log("Error attaching plugin... " + error);
              },
              consentDialog: function (on) {
                Janus.debug(
                  "Consent dialog should be " + (on ? "on" : "off") + " now"
                );
                if (on) {
                  // getUserMedia ???????????? ???
                } else {
                  // getUserMedia ???????????? ???
                }
              },
              iceState: function (state) {
                // ICE ?????? ?????????
                Janus.log("ICE state changed to " + state);
              },
              mediaState: function (medium, on) {
                // Media ????????? ?????? ??????????????? ????????????
                Janus.log(
                  "Janus " +
                    (on ? "started" : "stopped") +
                    " receiving our " +
                    medium
                );
              },
              webrtcState: function (on) {
                // ICE, DTLS??? ????????? ?????? ?????? ???????????? PeerConnection??? ????????? => true
                //PeerConnection??? ???????????? ??????????????? false
                Janus.log(
                  "Janus says our WebRTC PeerConnection is " +
                    (on ? "up" : "down") +
                    " now"
                );
                if (!on) {
                  return;
                }
              },
              onmessage: function (msg, jsep) {
                // Plugin???????????? Message/Event ?????? (Join??? ??????)
                Janus.debug(" ::: Got a message (publisher) :::", msg);
                var event = msg["videoroom"];
                Janus.debug("Event: " + event);

                if (event) {
                  if (event === "joined") {
                    // Publisher??? Join??? WebRTC??? ??????????????? ???????????? ????????? ??????
                    dispatch(
                      joinRoom({
                        room: msg["room"],
                        publisherId: msg["id"],
                        display: username,
                        publisherPvtId: msg["private_id"],
                      })
                    );

                    Janus.log(
                      "Successfully joined room " +
                        msg["room"] +
                        " with ID " +
                        id
                    );

                    // SDP offer??? Publisher??? ?????? ??????
                    publishOwnFeed(true);

                    // ?????? Publisher?????? ????????????
                    if (msg["publishers"]) {
                      var list = msg["publishers"];
                      Janus.debug(
                        "Got a list of available publishers/feeds:",
                        list
                      );
                      for (var f in list) {
                        var id = list[f]["id"];
                        var display = list[f]["display"];
                        var audio = list[f]["audio_codec"];
                        var video = list[f]["video_codec"];
                        Janus.debug(
                          "  >> [" +
                            id +
                            "] " +
                            display +
                            " (audio: " +
                            audio +
                            ", video: " +
                            video +
                            ")"
                        );
                        // ?????? Subscribe ??????
                        newRemoteFeed(id, display, audio, video);
                      }
                    }
                  } else if (event === "destroyed") {
                    // ??? ??????
                    Janus.warn("The room has been destroyed!");
                    navigate("/create");
                  } else if (event === "event") {
                    // ????????? Publisher ?????????
                    if (msg["publishers"]) {
                      var list = msg["publishers"];
                      Janus.debug(
                        "Got a list of available publishers/feeds:",
                        list
                      );
                      for (var f in list) {
                        var id = list[f]["id"];
                        var display = list[f]["display"];
                        var audio = list[f]["audio_codec"];
                        var video = list[f]["video_codec"];
                        Janus.debug(
                          "  >> [" +
                            id +
                            "] " +
                            display +
                            " (audio: " +
                            audio +
                            ", video: " +
                            video +
                            ")"
                        );
                        // ?????? Subscribe ??????unpublish
                        newRemoteFeed(id, display, audio, video);
                      }
                    } else if (msg["leaving"]) {
                      // One of the publishers has gone away?
                      var leaving = msg["leaving"];
                      if (msg["leaving"] === "ok") {
                        return;
                      }

                      dispatch(
                        removeSubscriber({
                          rfid: leaving,
                        })
                      );
                    } else if (msg["unpublished"]) {
                      var unpublished = msg["unpublished"];
                      if (unpublished === "ok") {
                        return;
                      }

                      dispatch(
                        removeSubscriber({
                          rfid: unpublished,
                        })
                      );
                    } else if (msg["error"]) {
                      if (msg["error_code"] === 433) {
                        navigate("/rooms");
                        alert(`????????? ?????????????????????!`);
                      } else if (msg["error_code"] === 426) {
                        // This is a "no such room" error: give a more meaningful description
                      } else {
                        Janus.error(msg["error"]);
                      }
                    }
                  }
                }
                if (jsep) {
                  Janus.debug("Handling SDP as well...", jsep);
                  storePlugin.handleRemoteJsep({ jsep: jsep });
                  // Audio??? ???????????????
                  var audio = msg["audio_codec"];
                  if (
                    mystream &&
                    mystream.getAudioTracks() &&
                    mystream.getAudioTracks().length > 0 &&
                    !audio
                  ) {
                    Janus.log(
                      "Our audio stream has been rejected, viewers won't hear us"
                    );
                  }

                  // Video??? ???????????????
                  var video = msg["video_codec"];
                  if (
                    mystream &&
                    mystream.getVideoTracks() &&
                    mystream.getVideoTracks().length > 0 &&
                    !video
                  ) {
                    Janus.log(
                      "Our video stream has been rejected, viewers won't see us"
                    );
                  }
                }
              },
              onlocalstream: function (stream) {
                Janus.debug(" ::: Got a local stream :::", stream);
                mystream = stream;
                dispatch(
                  addPublishStream({
                    stream: stream,
                  })
                );
                dispatch(
                  changeMainFeed({
                    stream: stream,
                    display: username,
                  })
                );
                // Video ?????? ????????? ?????? ??????
                // var videoTracks = stream.getVideoTracks();
                // if (!videoTracks || videoTracks.length === 0) {

                // } else {

                // }
              },
              onremotestream: function (stream) {
                // ?????? Publish????????? ??????
              },
              ondataopen: function (data) {
                console.log("data channel opened");
              },
              ondata: function (data) {
                Janus.log("Receive Data: ", data);
              },
              oncleanup: function () {
                Janus.log(
                  " ::: Got a cleanup notification: we are unpublished now :::"
                );
                mystream = null;
              },
            });
          },
          error: function (error) {
            Janus.error(error);
          },
          destroyed: function () {
            Janus.log("Janus Destroyed!");
          },
        });
      },
    });

    const publishOwnFeed = (useAudio) => {
      storePlugin.createOffer({
        // DataChannel ??????, Publisher??? ????????? ???????????? ????????? Subscriber?????? ??????
        media: {
          data: true,
          audioRecv: false,
          videoRecv: false,
          audioSend: useAudio,
          videoSend: true,
        },

        success: function (jsep) {
          Janus.debug("Got publisher SDP!", jsep);
          var publish = {
            request: "configure",
            audio: useAudio,
            video: true,
          };

          // SDP Offer ?????? ?????? ???, Publish ???????????? jsep??? ?????? Plugin??? ??????
          storePlugin.send({ message: publish, jsep: jsep });
        },
        error: function (error) {
          // ?????? ????????? ?????????
          Janus.error("WebRTC error:", error);
          publishOwnFeed(useAudio);
        },
      });
    };

    function newRemoteFeed(id, display, audio, video) {
      // ????????? ????????? Publish??????, ????????? ????????? ????????? Subscribe??????.
      let remoteFeed = null;
      janus.attach({
        plugin: "janus.plugin.videoroom",
        opaqueId: opaqueId,
        success: function (pluginHandle) {
          remoteFeed = pluginHandle;
          Janus.log(
            "Plugin attached! (" +
              remoteFeed.getPlugin() +
              ", id=" +
              remoteFeed.getId() +
              ")"
          );
          Janus.log("  -- This is a subscriber");

          let subscribe = null;
          if (pin) {
            subscribe = {
              request: "join",
              room: roomId,
              ptype: "subscriber",
              feed: id,
              pin: pin,
              private_id: publishFeed.pvtid,
            };
          } else {
            subscribe = {
              request: "join",
              room: roomId,
              ptype: "subscriber",
              feed: id,
              private_id: publishFeed.pvtid,
            };
          }

          // Subscribe ???????????? ?????? Plugin??? ?????? (Plugin ????????? Offer??? ???????????? ????????????)
          remoteFeed.videoCodec = video;
          remoteFeed.send({ message: subscribe });
        },
        error: function (error) {
          Janus.error("  -- Error attaching plugin...", error);
        },
        onmessage: function (msg, jsep) {
          Janus.debug(" ::: Got a message (subscriber) :::", msg);
          var event = msg["videoroom"];
          Janus.debug("Event: " + event);
          if (msg["error"]) {
            console.log(msg["error"]);
          } else if (event) {
            if (event === "attached") {
              remoteFeed.rfid = msg["id"];
              remoteFeed.rfdisplay = msg["display"];
              dispatch(
                subscribeFeed({
                  id: msg["id"],
                  display: msg["display"],
                })
              );
              Janus.log(
                "Successfully attached to feed " +
                  remoteFeed.rfid +
                  " (" +
                  remoteFeed.rfdisplay +
                  ") in room " +
                  msg["room"]
              );
            } else if (event === "event") {
              // publisher???????????? ?????????????????? ????????? ??? ?????? (?????? ?????? X)
            } else {
              // What has just happened?
            }
          }
          if (jsep) {
            Janus.debug("Handling SDP as well...", jsep);
            // Answer and attach
            remoteFeed.createAnswer({
              jsep: jsep,
              // Audio??? Video??? ????????? ?????????.(????????? Publisher)
              media: {
                data: true,
                audioSend: false,
                videoSend: false,
              },
              success: function (jsep) {
                Janus.debug("Got SDP!", jsep);
                var body = { request: "start", room: roomId };
                remoteFeed.send({ message: body, jsep: jsep });
              },
              error: function (error) {
                Janus.error("WebRTC error:", error);
              },
            });
          }
        },
        iceState: function (state) {
          // ICE ?????? ?????????
          Janus.log(
            "ICE state of this WebRTC PeerConnection (feed #" +
              remoteFeed.rfindex +
              ") changed to " +
              state
          );
        },
        webrtcState: function (on) {
          // WebRETC PeerConnection ????????? ?????? ?????????
          Janus.log(
            "Janus says this WebRTC PeerConnection (feed #" +
              remoteFeed.rfindex +
              ") is " +
              (on ? "up" : "down") +
              " now"
          );
        },
        onlocalstream: function (stream) {
          // Subscriber??? ?????? ?????????
        },
        onremotestream: function (stream) {
          Janus.debug("Remote feed #" + remoteFeed.rfid + ", stream:", stream);

          dispatch(
            addSubscribeStream({
              rfid: remoteFeed.rfid,
              stream: stream,
              hark: hark(stream, {}),
            })
          );
        },
        oncleanup: function () {
          // ????????? Subscriber Feed?????? ??????
          dispatch(
            removeSubscriber({
              rfid: remoteFeed.rfid,
            })
          );
        },
        ondataopen: function () {
          console.log("remote datachannel opened");
        },
        ondata: function (data) {
          let json = JSON.parse(data);
          let what = json["textroom"];
          if (what === "message") {
            let whisper = json["to"];
            console.log(whisper, username);
            if (whisper) {
              if (whisper === username) {
                dispatch(
                  receiveChat({
                    display: json["display"],
                    text: json["text"],
                    time: moment().format("HH:mm"),
                    isPrivateMessage: true,
                  })
                );
              }
            } else {
              dispatch(
                receiveChat({
                  display: json["display"],
                  text: json["text"],
                  time: moment().format("HH:mm"),
                  isPrivateMessage: false,
                })
              );
            }
          } else if (what === "file") {
            // let from = json["display"];
            // let filename = json["text"]["filename"];
            // let chunk = json["text"]["message"];
            // let last = json["text"]["last"];
            // if (!receivedFileChunk[from]) receivedFileChunk[from] = {};
            // if (!receivedFileChunk[from][filename]) {
            //   receivedFileChunk[from][filename] = [];
            // }
            // receivedFileChunk[from][filename].push(chunk);
            // if (last) {
            //   setReceiveFile(() => {
            //     return {
            //       data: receivedFileChunk[from][filename].join(""),
            //       filename: filename,
            //       from: from,
            //     };
            //   });
            //   delete receivedFileChunk[from][filename];
            // }
          }
        },
      });
    }

    return () => {
      console.log("????????????");
      if (janus && janus.isConnected()) {
        const unpublish = {
          request: "unpublish",
        };
        storePlugin.send({
          message: unpublish,
          success: () => {
            dispatch(exitRoom());
            janus.destroy();
          },
        });
      }
    };
  }, []);

  useEffect(() => {}, [subscribeFeeds, chatData]);

  const toggleAudioHandler = () => {
    if (!onoffAudio) storePlugin.unmuteAudio();
    else storePlugin.muteAudio();
    dispatch(
      toggleAudio({
        onoffAudio: !onoffAudio,
      })
    );
  };

  const toggleVideoHandler = () => {
    if (!onoffVideo) storePlugin.unmuteVideo();
    else storePlugin.muteVideo();
    dispatch(
      toggleVideo({
        onoffVideo: !onoffVideo,
      })
    );
  };

  const toggleScreenSharingHandler = () => {
    if (onoffScreenSharing) {
      storePlugin.createOffer({
        media: {
          video: "screen",
          replaceVideo: true,
        },
        success: function (jsep) {
          dispatch(
            toggleScreenSharing({
              onoffScreenSharing: onoffScreenSharing,
            })
          );
          storePlugin.send({
            message: { audio: onoffAudio, video: true },
            jsep: jsep,
          });
        },
        error: function (error) {
          Janus.error("WebRTC error:", error);
        },
      });
    } else {
      if (!Janus.isExtensionEnabled()) {
        Janus.log(
          "?????? ????????? ?????? ?????? ?????? ??????????????? ???????????? ?????? ????????????. ?????? ???????????? ??????????????????. <b><a href='https://chrome.google.com/webstore/detail/janus-webrtc-screensharin/hapfgfdkleiggjjpfpenajgdnfckjpaj' target='_blank'>??????</a></b>"
        );
        return;
      }

      storePlugin.createOffer({
        media: {
          replaceVideo: true,
        },
        success: function (jsep) {
          dispatch(
            toggleScreenSharing({
              onoffScreenSharing: onoffScreenSharing,
            })
          );
          storePlugin.send({
            message: { audio: onoffAudio, video: true },
            jsep: jsep,
          });
        },
        error: function (error) {
          Janus.error("WebRTC error:", error);
        },
      });
    }
  };

  const destroyRoomHandler = () => {
    destroyRoom(roomId)
      .then((response) => Janus.log("destroyed Room!"))
      .catch((error) => Janus.log(error));
  };

  const changeControlHandler = (e) => {
    e.preventDefault();
    setChooseControl(e.target.name);
  };

  return (
    <>
      <div>
        <MainWrapper>
          <MainVideo />
          <div className="control-wrapper">
            <div className="control-panel">
              <button name="chat" onClick={changeControlHandler} >??????</button>
              <button name="participant" onClick={changeControlHandler} >?????????</button>
            </div>
            {ChooseControl === 'chat' ? 
            <Chatting
              plugin={storePlugin}
              roomId={roomId}
              username={username}
            /> : <Participant
            publishFeed={publishFeed}
            subscribeFeeds={subscribeFeeds}
          />}
          </div>
        </MainWrapper>
        <ActionButtonWrapper>
          <button onClick={toggleAudioHandler}>
            {onoffAudio ? "?????? ??????" : "?????? ??????"}
          </button>
          <button onClick={toggleVideoHandler}>
            {onoffVideo ? "????????? ??????" : "????????? ??????"}
          </button>
          <button onClick={toggleScreenSharingHandler}>
            {onoffScreenSharing ? "???????????? ??????" : "???????????? ??????"}
          </button>
          {creator === username ? (
            <button onClick={destroyRoomHandler}>??? ??????</button>
          ) : null}
        </ActionButtonWrapper>
        <VideoSummaryWrapper>
          <PublishVideo />
          <SubscribeVideo />
        </VideoSummaryWrapper>
      </div>
    </>
  );
};

export default VideoComponent;
