import axios from "axios";
import { server } from "../utils/config";

export const createRoom = async (message) => {
    return await axios.post(server+"/admin", {
        message
    });
}