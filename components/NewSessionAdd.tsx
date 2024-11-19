import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { WorkoutType } from "@/lib/types";
import { TextInput } from "react-native";
import { createSessionDetails, range } from "@/lib/utils";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSession } from "@/lib/sessionRequests";

const NewSessionAdd = ({ chosenWorkout }: { chosenWorkout: WorkoutType }) => {
    const queryClient = useQueryClient();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [sessionDetails, setSessionDetails] = useState<
        {
            exercise: string;
            setsAndDetails: number[][];
        }[]
    >(createSessionDetails(chosenWorkout.exercises));

    const { mutate, isPending } = useMutation({
        mutationKey: ["new-session"],
        mutationFn: async () => {
            await createSession(
                sessionDetails,
                chosenWorkout.id,
                chosenWorkout.name
            );
        },
        onSuccess: () => {
            setSuccessMessage("Session has been recorded successfuly");
            setSubmitError(null);
            queryClient.refetchQueries({
                queryKey: ["sessions-all"],
            });
        },
        onError: () => {
            setSubmitError(
                "An error occured trying to record your session. Try submitting again soon."
            );
            setSuccessMessage(null);
        },
    });

    return (
        <View style={styles.outerContainer}>
            {Object.entries(chosenWorkout.exercises).map(
                ([exercise, numberOfSets], index) => (
                    <View key={index} style={styles.exerciseContainer}>
                        <Text style={styles.exerciseTitle}>
                            {exercise.toUpperCase()}
                        </Text>

                        {range(Number(numberOfSets)).map((value) => (
                            <View key={value} style={styles.inputContainer}>
                                <Text>Set-{value + 1}</Text>
                                <TextInput
                                    style={styles.valueInputs}
                                    placeholder={`weight`}
                                    keyboardType="numeric"
                                    onChangeText={(newValue) => {
                                        let tempSessionDetails = sessionDetails;

                                        let tempSetsAndDetails =
                                            sessionDetails[index]
                                                .setsAndDetails;

                                        tempSetsAndDetails[value] = [
                                            Number(newValue),
                                            tempSetsAndDetails[value][1],
                                        ];

                                        tempSessionDetails[index] = {
                                            exercise,
                                            setsAndDetails: tempSetsAndDetails,
                                        };

                                        setSessionDetails(tempSessionDetails);
                                    }}
                                />
                                <TextInput
                                    style={styles.valueInputs}
                                    placeholder={`reps`}
                                    keyboardType="numeric"
                                    onChangeText={(newValue) => {
                                        let tempSessionDetails = sessionDetails;

                                        let tempSetsAndDetails =
                                            sessionDetails[index]
                                                .setsAndDetails;

                                        tempSetsAndDetails[value] = [
                                            tempSetsAndDetails[value][0],
                                            Number(newValue),
                                        ];

                                        tempSessionDetails[index] = {
                                            exercise,
                                            setsAndDetails: tempSetsAndDetails,
                                        };

                                        setSessionDetails(tempSessionDetails);
                                    }}
                                />
                            </View>
                        ))}
                    </View>
                )
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                        if (
                            JSON.stringify(sessionDetails) ===
                            JSON.stringify(
                                createSessionDetails(chosenWorkout.exercises)
                            )
                        ) {
                            setSubmitError(
                                "Please enter alteast ONE value in the above fields"
                            );
                        } else {
                            mutate();
                        }
                    }}
                    disabled={isPending}
                >
                    <Ionicons
                        name="clipboard-outline"
                        color={"white"}
                        size={18}
                    />
                    <Text style={{ color: "white", fontWeight: "600" }}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>

            {successMessage && (
                <Text
                    className="text-center"
                    style={{ marginTop: 10, color: Colors.primary }}
                >
                    {successMessage}
                </Text>
            )}

            {submitError && (
                <Text
                    className="text-center text-red-600"
                    style={{ marginTop: 10 }}
                >
                    {submitError}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginHorizontal: 5,
        marginBottom: 60,
    },
    exerciseContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "flex-start",
    },
    exerciseTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    valueInputs: {
        flex: 1,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: Colors.primary,
        padding: 10,
        fontWeight: "300",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: Colors.primary,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 6,
        borderRadius: 10,
    },
});

export default NewSessionAdd;
