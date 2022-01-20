import { useSelector } from "react-redux";
import Video from "./Video"

const PublishVideo = ({ username }) => {
    const { publishFeed } = useSelector((state) => state.roomReducer);

    return (
        <div>
            {publishFeed && (
            <Video
              stream={publishFeed.stream}
              username={username}
              muted={false}
            />
          )}
        </div>
    )
}

export default PublishVideo;


            