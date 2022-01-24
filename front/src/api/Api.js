import axios from "axios";
import { admin_server, admin_secret, spring_server } from "../utils/config";

export const createRoom = async (request) => {
    return await axios.post(spring_server+"/rooms", 
        request
    );
}

export const findRooms = async () => {
    return await axios.post(admin_server, {
        janus: "message_plugin",
        plugin: "janus.plugin.videoroom",
        transaction: Math.random().toString(36).substr(2,11),
        admin_secret: admin_secret,
        request: {
            request: "list"
        }
    });
}

export const destroyRoom = async (roomId) => {
    return await axios.delete(admin_server+"/rooms/"+roomId);
}