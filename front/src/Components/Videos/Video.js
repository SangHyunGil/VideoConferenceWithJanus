import React, { useRef, useEffect } from "react";
import "./Video.css";
import styled from "styled-components";

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Video = (props) => {
  const videoRef = useRef();

  useEffect(() => {
    if (props.stream) {
      videoRef.current.srcObject = props.stream;
    }
  }, [props.stream]);

  const onClick = (e) => {
    e.preventDefault();
    if (!props.onClick) return;
    props.onClick(videoRef.current.srcObject, props.username);
  };

  return (
    <VideoWrapper>
      <div>
        <video
          id="video"
          style={{ width: "100%", height: "100%" }}
          autoPlay
          playsInline
          ref={videoRef}
          muted={props.muted}
          onClick={onClick}
          controls = {props.isMain ? true : false}
        />
      </div>
      <div>{props.username}</div>
    </VideoWrapper>
  );
};

export default Video;
