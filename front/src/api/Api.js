import axios from "axios";
import { admin_server, admin_secret, spring_server } from "../utils/config";

export const createRoom = async (request) => {
    return await axios.post(spring_server+"/rooms", 
        request
    );
}

export const findRooms = async () => {
    return await axios.get(spring_server+"/rooms");
}

export const destroyRoom = async (roomId) => {
    console.log("")
    return await axios.delete(spring_server+"/rooms/"+roomId);
}