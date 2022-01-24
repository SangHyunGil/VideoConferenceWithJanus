import { useSelector, useDispatch } from "react-redux";
import Video from "./Video"
import { changeMainFeed } from "../../redux/reducers/roomReducer";

const PublishVideo = () => {
    const dispatch = useDispatch();
    const { mainFeed, publishFeed } = useSelector((state) => state.roomReducer);

    const changeMainFeedHandler = (stream, display) => {
      if (mainFeed.display === display) return;
      dispatch(changeMainFeed({
          stream: stream,
          display: display,
      }))
    }

    return (
        <div>
            {publishFeed && (
            <Video
              stream={publishFeed.stream}
              username={publishFeed.display}
              muted={false}
              onClick={changeMainFeedHandler}
            />
          )}
        </div>
    )
}

export default PublishVideo;


            