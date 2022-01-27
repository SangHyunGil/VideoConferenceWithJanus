import { useSelector } from "react-redux";
import Video from "./Video"

const MainVideo = () => {
    const { mainFeed } = useSelector((state) => state.roomReducer);

    return (
        <div
          style={{
            maxHeight: "500px",
          }}
        >
            {mainFeed && (
            <Video
              stream={mainFeed.stream}
              username={mainFeed.display}
              muted={false}
              isMain={true}
            />
          )}
        </div>
    )
}

export default MainVideo;