import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SessionType } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { deleteSession } from "@/lib/sessionRequests";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SessionInfo = ({
    data,
}: {
    data: {
        session: SessionType;
        sessionInfo: {
            exercise: string;
            setsAndDetails: string[][];
        }[];
    };
}) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const { session, sessionInfo } = data;

    const { mutate } = useMutation({
        mutationKey: ["delete", `session-${session.id}`],
        mutationFn: async () => await deleteSession(session.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["sessions-all"],
            });
            router.back();
        },
        onError: () =>
            setDeleteError(
                "An error occured trying to delete your session. Try again soon."
            ),
    });

    return (
        <View style={styles.container}>
            <Text style={styles.workoutName}>
                {session.workoutName.toUpperCase()}
            </Text>
            <Text style={styles.date}>{formatDate(session.dateTime)}</Text>

            {sessionInfo.map(({ exercise, setsAndDetails }, index) => (
                <View key={index} style={styles.innerContainer}>
                    <Text style={styles.exerciseName}>
                        {exercise.toUpperCase()}
                    </Text>

                    {setsAndDetails.map(([weight, reps], index) => (
                        <View key={index} style={styles.innermostContainer}>
                            <Text>Set: {index + 1}</Text>
                            <Text>{weight}</Text>
                            <Text>{reps}</Text>
                        </View>
                    ))}
                </View>
            ))}

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    activeOpacity={0.7}
                    onPress={async () => {
                        mutate();
                    }}
                >
                    <Ionicons name="trash-outline" size={22} color={"white"} />
                    <Text style={{ color: "white", fontWeight: "600" }}>
                        Delete
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.editButton}
                    activeOpacity={0.7}
                    onPress={() => {
                        router.push(`/edit/${session.id}`);
                    }}
                >
                    <Ionicons name="create-outline" size={22} color={"black"} />
                    <Text
                        style={{
                            color: "black",
                            fontWeight: "600",
                        }}
                    >
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>

            {deleteError && (
                <Text
                    className="text-center text-red-600"
                    style={{ marginTop: 10 }}
                >
                    {deleteError}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 10,
    },
    workoutName: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10,
        color: Colors.primary,
    },
    date: {
        fontSize: 16,
        fontWeight: "200",
        marginBottom: 10,
    },
    innerContainer: {
        marginVertical: 10,
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    innermostContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        borderBottomWidth: 0.25,
        paddingVertical: 10,
        borderBottomColor: Colors.primary,
    },
    buttonsContainer: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 40,
    },
    deleteButton: {
        backgroundColor: Colors.red,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 6,
        borderRadius: 10,
    },
    editButton: {
        backgroundColor: Colors.primaryBackground,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 6,
        borderRadius: 10,
    },
});

export default SessionInfo;
