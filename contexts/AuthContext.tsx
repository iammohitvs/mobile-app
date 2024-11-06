import useAuth from "@/hooks/useAuth";
import React, { createContext, useContext } from "react";

const AuthContext = createContext<null | boolean>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    
    return (
        <AuthContext.Provider value={user?.isAuthenticated || false}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const authContextValue = useContext(AuthContext);

    if (authContextValue === null) {
        throw new Error(
            "Use the auth context inside the auth context provider"
        );
    }

    return authContextValue;
};
