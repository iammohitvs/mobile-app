import api from "@/lib/axiosInstance";
import { LoginResponseType, LogoutResponseType } from "@/lib/types";
import React, { useEffect, useState } from "react";

const useAuth = () => {
    const [token, setToken] = useState<string | null>("random token");

    console.log(token);

    useEffect(() => {
        const loadToken = async () => {
            // await the secure store for the token and set the value of the tokens state
            // set the default headers if the token exists

            setToken("not random 777");
        };

        loadToken();
    }, []);

    const useRegister = async (username: string, password: string) => {
        try {
            const loginResponse = await api.post<LoginResponseType>(
                "/register",
                {
                    username,
                    password,
                }
            );

            setToken(loginResponse.data.token);

            api.defaults.headers.common[
                "Authorizaton"
            ] = `Bearer ${loginResponse.data.token}`;
        } catch (error) {
            // Handle the various types of errors in a register action:
            throw new Error("Something went wrong trying to log you out!");
        }
    };

    const useLogin = async (username: string, password: string) => {
        try {
            const loginResponse = await api.post<LoginResponseType>("/login", {
                username,
                password,
            });

            setToken(loginResponse.data.token);

            api.defaults.headers.common[
                "Authorizaton"
            ] = `Bearer ${loginResponse.data.token}`;
        } catch (error) {
            throw new Error("Something went wrong trying to log you in!");
        }
    };

    const useLogout = async () => {
        try {
            const logoutResponse = await api.post<LogoutResponseType>(
                "/logout"
            );

            if (!logoutResponse.data.success) {
                throw new Error();
            }

            setToken(null);

            api.defaults.headers.common["Authorizaton"] = "";
        } catch (error) {
            throw new Error("Something went wrong trying to log you out!");
        }
    };

    return {
        user: { token, isAuthenticated: !!token },
        login: useLogin,
        logout: useLogout,
        register: useRegister,
    };
};

export default useAuth;
