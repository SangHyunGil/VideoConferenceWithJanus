import produce from "immer";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

// initailState
const initialState = {
    room: "",
    server: "",
    useAudio: true,
    useVideo: true,
    onoffVideo: true,
    onoffAudio: true,
    publishFeed: {},
    subscribeFeeds: [],
    chatData: []
}

// action
export const GET_ROOM_INFO = "GET_ROOM_INFO";
export const JOIN_ROOM = "JOIN_ROOM";
export const SUBSCRIBE_FEED = "SUBSCRIBE_FEED";
export const ADD_PUBLISH_STREAM = "ADD_PUBLISH_STREAM";
export const ADD_SUBSCRIBER_STREAM = "ADD_SUBSCRIBER_STREAM";
export const REMOVE_SUBSCRIBER = "REMOVE_SUBSCRIBER";
export const USE_VIDEO_AUDIO = "USE_VIDEO_AUDIO";
export const TOGGLE_VIDEO = "TOGGLE_VIDEO";
export const TOGGLE_AUDIO = "TOGGLE_AUDIO";
export const SEND_CHAT = "SEND_CHAT";
export const RECEIVE_CHAT = "RECEIVE_CHAT";

// actionCreator
export const getRoomInfo = (payload) => ({
    type: GET_ROOM_INFO,
    payload
});

export const joinRoom = (payload) => ({
    type: JOIN_ROOM,
    payload
});

export const subscribeFeed = (payload) => ({
    type: SUBSCRIBE_FEED,
    payload
});

export const addPublishStream = (payload) => ({
    type: ADD_PUBLISH_STREAM,
    payload
});

export const addSubscribeStream = (payload) => ({
    type: ADD_SUBSCRIBER_STREAM,
    payload
});

export const removeSubscriber = (payload) => ({
    type: REMOVE_SUBSCRIBER,
    payload
});

export const useVideoAndAudio = (payload) => ({
    type: USE_VIDEO_AUDIO,
    payload
});

export const toggleVideo = (payload) => ({
    type: TOGGLE_VIDEO,
    payload
});

export const toggleAudio = (payload) => ({
    type: TOGGLE_AUDIO,
    payload
});

export const sendChat = (payload) => ({
    type: SEND_CHAT,
    payload
});

export const receiveChat = (payload) => ({
    type: RECEIVE_CHAT,
    payload
});


// reducer
const roomReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GET_ROOM_INFO:
                draft.server = action.payload.server;
                break;

            case JOIN_ROOM:
                draft.room = action.payload.room;
                draft.publishFeed.id = action.payload.publisherId;
                draft.publishFeed.pvtId = action.payload.publisherPvtId;
                break;

            case SUBSCRIBE_FEED:
                draft.subscribeFeeds.push({ id : action.payload.id, 
                                            display: action.payload.display })
                break;

            case ADD_PUBLISH_STREAM:
                draft.publishFeed.stream = action.payload.stream;
                break;
            
            case ADD_SUBSCRIBER_STREAM:
                const subscribeFeed = draft.subscribeFeeds.find((feed) => feed.id === action.payload.rfid);
                subscribeFeed.stream = action.payload.stream;
                subscribeFeed.hark = action.payload.hark;
                break;

            case REMOVE_SUBSCRIBER:
                draft.subscribeFeeds = draft.subscribeFeeds.filter((feed) => feed.id != action.payload.rfid);
                break;

            case USE_VIDEO_AUDIO:
                draft.useVideo = action.payload.useVideo;
                draft.useAudio = action.payload.useAudio;
                break;

            case TOGGLE_VIDEO:
                draft.onoffVideo = !draft.onoffVideo;
                break;

            case TOGGLE_AUDIO:
                draft.onoffAudio = !draft.onoffAudio;
                break;

            case SEND_CHAT:
                draft.chatData.push({ text: action.payload.text, display: action.payload.display,
                                      time: action.payload.time })
                break;

            case SEND_CHAT:
                draft.chatData.push({ text: action.payload.text, display: action.payload.display,
                                        time: action.payload.time })
                break;

            default:
                break;
        }
    }
)

export default roomReducer;
