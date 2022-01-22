import { useSelector, useDispatch } from "react-redux";
import Video from "./Video"
import { changeMainFeed } from "../../redux/reducers/roomReducer";

const SubscribeVideo = () => {
    const dispatch = useDispatch();
    const { mainFeed, subscribeFeeds } = useSelector((state) => state.roomReducer);

    const changeMainFeedHandler = (stream, display) => {
      if (mainFeed.display === subscribeFeeds.display) return;
      dispatch(changeMainFeed({
          stream: stream,
          display: display,
      }))
    }

    const renderRemoteVideos = subscribeFeeds.map((feed) => (
      <div>
      <Video
        stream={feed.stream}
        username={feed.display}
        muted={false}
        onClick={changeMainFeedHandler}
      />
    </div>
    ));

    return (
        <div>
            {renderRemoteVideos}
        </div>
    )
}

export default SubscribeVideo;
