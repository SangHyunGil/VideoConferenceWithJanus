import axios from "axios";
import { admin_server, admin_secret } from "../utils/config";

export const createRoom = async (request) => {
    return await axios.post(admin_server, {
        janus: "message_plugin",
        plugin: "janus.plugin.videoroom",
        transaction: Math.random().toString(36).substr(2,11),
        admin_secret: admin_secret,
        request: request
    });
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