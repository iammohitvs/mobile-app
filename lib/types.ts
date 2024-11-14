export type LoginResponseType = {
    token: string;
};

export type LogoutResponseType = {
    success: boolean;
};

export type SessionType = {
    id: string;
    dateTime: Date;
    sessionDetails: any;
    userId: string;
    workoutId: string;
    createdAt: Date;
};