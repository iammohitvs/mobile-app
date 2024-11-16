import axios from "axios";
import { SessionType } from "./types";
import { formatSessionDetails, handleAxiosError } from "./utils";
import api from "./axiosInstance";

export const getAllSessions = async (
    start: number,
    end: number,
    wid: string
): Promise<SessionType[]> => {
    api.defaults.headers[
        "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjYmVhMmEyOC1jOGI4LTRlMjQtYmQ0Yi1kNmJiN2IxMzlkMjciLCJpYXQiOjE3MzE2MDEyNTgsImV4cCI6MTc2MzE1ODg1OH0.pEwlo5b0Xz32LdIeivMcrU8uNr7GdqS7Z_oZD6VlJoA`;

    try {
        const response = await api.get(
            `/services/sessions?start=${start}&end=${end}&wid${
                (!wid || wid !== "") && `=${wid}`
            }`
        );

        return response.data.sessions;
    } catch (error) {
        handleAxiosError(error);

        throw new Error();
    }
};

export const getSpeceficSession = async (
    id: string
): Promise<{
    session: SessionType;
    sessionInfo: {
        exercise: string;
        setsAndDetails: string[][];
    }[];
}> => {
    api.defaults.headers[
        "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjYmVhMmEyOC1jOGI4LTRlMjQtYmQ0Yi1kNmJiN2IxMzlkMjciLCJpYXQiOjE3MzE2MDEyNTgsImV4cCI6MTc2MzE1ODg1OH0.pEwlo5b0Xz32LdIeivMcrU8uNr7GdqS7Z_oZD6VlJoA`;

    try {
        const response = await api.get(`/services/sessions/id/${id}`);
        console.log(response.data.session);
        return {
            session: response.data.session as SessionType,
            sessionInfo: formatSessionDetails(
                response.data.session.sessionDetails
            ),
        };
    } catch (error) {
        handleAxiosError(error);

        throw new Error();
    }
};

export const deleteSession = async (
    id: string
): Promise<{ success: true; message: string }> => {
    api.defaults.headers[
        "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjYmVhMmEyOC1jOGI4LTRlMjQtYmQ0Yi1kNmJiN2IxMzlkMjciLCJpYXQiOjE3MzE2MDEyNTgsImV4cCI6MTc2MzE1ODg1OH0.pEwlo5b0Xz32LdIeivMcrU8uNr7GdqS7Z_oZD6VlJoA`;

    try {
        const response = await api.delete(`/services/sessions/delete/${id}`);

        return response.data;
    } catch (error) {
        handleAxiosError(error);

        throw new Error();
    }
};
