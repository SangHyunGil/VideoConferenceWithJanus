import React, { useRef, useEffect } from "react";
import "./Video.css";

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
    <>
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
    </>
  );
};

export default Video;
