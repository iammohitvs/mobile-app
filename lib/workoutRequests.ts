import axios from "axios";
import { SessionType, WorkoutType } from "./types";
import { handleAxiosError } from "./utils";
import api from "./axiosInstance";

export const getAllWorkouts = async (
    start: number,
    end: number,
    wid: string
): Promise<WorkoutType[] | undefined> => {
    api.defaults.headers[
        "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjYmVhMmEyOC1jOGI4LTRlMjQtYmQ0Yi1kNmJiN2IxMzlkMjciLCJpYXQiOjE3MzE2MDEyNTgsImV4cCI6MTc2MzE1ODg1OH0.pEwlo5b0Xz32LdIeivMcrU8uNr7GdqS7Z_oZD6VlJoA`;

    try {
        const response = await api.get(
            `/services/workouts?start=${start}&end=${end}`
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
