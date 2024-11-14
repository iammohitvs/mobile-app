import axios from "axios";
import { SERVER_API_ENDPOINT } from "./constants";

const api = axios.create({
    baseURL:
        (process.env.SERVER_API_ENDPOINT as string) ||
        SERVER_API_ENDPOINT ||
        "http://localhost:3000/api",
});

export default api;
