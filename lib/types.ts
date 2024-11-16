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
    workoutName: string;
    createdAt: Date;
};

export type WorkoutType = {
    id: string;
    exercises: any;
    name: string;
    userId: string;
    createdAt: Date;
};

type SetDetails = {
  weight: number;
  reps: number;
};

type ExerciseData = {
  [setNumber: string]: SetDetails; // Keys like "1", "2", "3"
};

export type SessionDetailsType = {
  [exerciseName: string]: ExerciseData; // Keys like "bicep curls", "lat pulldowns"
};