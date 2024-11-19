import axios from "axios";
import { format } from "date-fns";
import { SessionDetailsType, WorkoutType } from "./types";

export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        // Check for specific Axios errors
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error("Error Status:", error.response.status);
            console.error("Error Data:", error.response.data);
        } else if (error.request) {
            // No response received after the request was made
            console.error("No response received:", error.request);
        } else {
            // Other errors (e.g., setting up the request)
            console.error("Error Message:", error.message);
        }
    } else {
        // Handle non-Axios errors (optional)
        console.error("Unexpected Error:", error);
    }

    throw new Error();
};

export const formatDate = (date: Date) => {
    return format(new Date(date), "MMMM d, yyyy h:mm a");
};

export const formatSessionDetails = (
    sessionDetails: SessionDetailsType
): { exercise: string; setsAndDetails: string[][] }[] => {
    let exercises: any = [];

    Object.entries(sessionDetails).map(([exercise, setAndDetail], index) => {
        let setsAndDetails: any[] = [];

        Object.values(setAndDetail).map((details) => {
            setsAndDetails.push([String(details.weight), String(details.reps)]);
        });

        exercises.push({
            exercise,
            setsAndDetails,
        });
    });

    // returns soomething like: [{exercise: "bicep curl", setsAndDetails: [["12.5", 10], ["12.5", "8"]]}, ....]

    return exercises;
};

export const parseSessionDetails = (
    formattedDetails: { exercise: string; setsAndDetails: string[][] }[]
): SessionDetailsType => {
    let sessionDetails: SessionDetailsType = {};

    formattedDetails.map(({ exercise, setsAndDetails }) => {
        let setAndDetail: Record<string, { weight: number; reps: number }> = {};

        setsAndDetails.map((setDetail, index) => {
            const [weight, reps] = setDetail;
            setAndDetail[`${index + 1}`] = {
                weight: Number(weight),
                reps: Number(reps),
            };
        });

        sessionDetails[exercise] = setAndDetail; // Ensure types align with `ExerciseData`
    });

    return sessionDetails;
};

export const formatWorkouts = (
    workouts: WorkoutType[]
): {
    id: string;
    label: string;
    value: string;
}[] => {
    let formattedWorkouts: {
        id: string;
        label: string;
        value: string;
    }[] = [];

    workouts.forEach((workout, index) => {
        formattedWorkouts.push({
            id: String(index),
            label: workout.name.toUpperCase(),
            value: workout.id,
        });
    });

    return formattedWorkouts;
};

export const range = (init: number, fin?: number, step: number = 1) => {
    let arr = [];

    if (!fin) {
        fin = init;
        init = 0;
    }

    for (let i = init; i < fin; i = i + step) {
        arr.push(i);
    }

    return arr;
};

export const createSessionDetails = (exercises: any) => {
    let sessionDetails: any[] = [];

    Object.entries(exercises).forEach(([exercise, numberOfSets]) => {
        sessionDetails.push({
            exercise,
            setsAndDetails: range(Number(numberOfSets)).map(() => [0, 0]),
        });
    });

    return sessionDetails;
};
