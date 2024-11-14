import { RadioButtonProps } from "react-native-radio-buttons-group";

export const months: RadioButtonProps[] = [
    { id: "0", label: "All", value: "any" },
    { id: "1", label: "January", value: "january" },
    { id: "2", label: "February", value: "february" },
    { id: "3", label: "March", value: "march" },
    { id: "4", label: "April", value: "april" },
    { id: "5", label: "May", value: "may" },
    { id: "6", label: "June", value: "june" },
    { id: "7", label: "July", value: "july" },
    { id: "8", label: "August", value: "august" },
    { id: "9", label: "September", value: "september" },
    { id: "10", label: "October", value: "october" },
    { id: "11", label: "November", value: "november" },
    { id: "12", label: "December", value: "december" },
];

export const sampelWorkout: RadioButtonProps[] = [
    { id: "0", label: "All", value: "all" },
    { id: "1", label: "Push", value: "pushId" },
    { id: "2", label: "Pull", value: "pullId" },
    { id: "3", label: "Legs", value: "legsId" },
];

export const SERVER_API_ENDPOINT = "http://localhost:3000/api";
