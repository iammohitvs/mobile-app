import { formatWorkouts, handleAxiosError } from "./utils";
import api from "./axiosInstance";
import { WorkoutType } from "./types";

export const getAllWorkouts = async (): Promise<{
    formattedWorkouts: {
        id: string;
        label: string;
        value: string;
    }[];
    workouts: WorkoutType[];
}> => {
    api.defaults.headers[
        "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjYmVhMmEyOC1jOGI4LTRlMjQtYmQ0Yi1kNmJiN2IxMzlkMjciLCJpYXQiOjE3MzE2MDEyNTgsImV4cCI6MTc2MzE1ODg1OH0.pEwlo5b0Xz32LdIeivMcrU8uNr7GdqS7Z_oZD6VlJoA`;

    try {
        const response = await api.get(`/services/workouts`);

        return {
            formattedWorkouts: formatWorkouts(response.data.workouts),
            workouts: response.data.workouts,
        };
    } catch (error) {
        handleAxiosError(error);

        throw new Error();
    }
};
