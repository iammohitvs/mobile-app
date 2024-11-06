import axios from "axios";

const api = axios.create({
    baseURL: process.env.SERVER_API_ENDPOINT!,
})

export default api;