import { useSelector } from "react-redux";
import Video from "./Video"
import styled from "styled-components";

const VideoWrapper = styled.div`
  flex-basis: 55%;
  max-width: 60%;
`;

const MainVideo = () => {
    const { mainFeed } = useSelector((state) => state.roomReducer);

    return (
        <VideoWrapper>
            {mainFeed && (
            <Video
              stream={mainFeed.stream}
              username={mainFeed.display}
              muted={false}
              isMain={true}
            />
          )}
        </VideoWrapper>
    )
}

export default MainVideo;