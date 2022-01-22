import { useSelector } from "react-redux";
import Video from "./Video"

const MainVideo = () => {
    const { mainFeed } = useSelector((state) => state.roomReducer);

    return (
        <div>
            {mainFeed && (
            <Video
              stream={mainFeed.stream}
              username={mainFeed.display}
              muted={false}
            />
          )}
        </div>
    )
}

export default MainVideo;