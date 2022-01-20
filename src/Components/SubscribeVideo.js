import { useSelector } from "react-redux";
import Video from "./Video"

const SubscribeVideo = () => {
    const { subscribeFeeds } = useSelector((state) => state.roomReducer);

    const renderRemoteVideos = subscribeFeeds.map((feed) => {
        return (
          <div
            key={feed.id}
            style={{
              width: "100px",
              height: "100px",
              float: "left",
              margin: "3px",
            }}
          >
            <Video
              stream={feed.stream}
              username={feed.display}
              muted={false}
            />
          </div>
        );
    });

    return (
        <div>
            {renderRemoteVideos}
        </div>
    )
}

export default SubscribeVideo;
