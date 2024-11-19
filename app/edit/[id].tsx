import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editSession, getSpeceficSession } from "@/lib/sessionRequests";
import { Colors } from "@/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";

const EditPage = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { id } = useLocalSearchParams();

    const { data, isFetching, isError } = useQuery({
        queryKey: [`session-${id}`],
        queryFn: async () => getSpeceficSession(id as string),
        staleTime: Infinity,
    });

    const [editError, setEditError] = useState<string | null>(null);
    const [newSessionDetails, setNewSessionDetails] = useState<any>(
        data?.sessionInfo
    );

    const { mutate, isPending /* isError */ } = useMutation({
        mutationKey: ["edit", `session-${data?.session.id}`],
        mutationFn: async () => editSession(id as string, newSessionDetails),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`session-${id}`],
            });

            router.back();
        },
        onError: () =>
            setEditError(
                "Something went wrong trying to edit your session details"
            ),
    });

    return (
        <View style={{ flex: 1 }}>
            {isFetching && <Text style={styles.loadingText}>Loading...</Text>}

            {isError && (
                <View style={styles.errorBox}>
                    <Text className="text-center text-red-600">
                        Something went wrong trying to get your session data
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            queryClient.refetchQueries({
                                queryKey: [`session-${id}`],
                            })
                        }
                    >
                        <Ionicons
                            name="reload-circle-outline"
                            color={"red"}
                            size={40}
                            className="mt-5"
                        />
                    </TouchableOpacity>
                </View>
            )}

            {data && (
                <KeyboardAwareScrollView style={styles.container}>
                    <View style={styles.inputItemContainer}>
                        <Text style={styles.label}>Session Details:</Text>

                        {data.sessionInfo.map(
                            ({ exercise, setsAndDetails }, indexOfExercise) => (
                                <View
                                    key={indexOfExercise}
                                    style={styles.innerContainer}
                                >
                                    <Text style={styles.exerciseName}>
                                        {exercise.toUpperCase()}
                                    </Text>

                                    {setsAndDetails.map(
                                        ([weight, reps], index) => (
                                            <View
                                                key={index}
                                                style={
                                                    styles.innermostContainer
                                                }
                                            >
                                                <Text>Set: {index + 1}</Text>
                                                <TextInput
                                                    style={styles.secondInput}
                                                    defaultValue={weight}
                                                    keyboardType="numeric"
                                                    onChangeText={(
                                                        newValue
                                                    ) => {
                                                        let tempSessionDetails =
                                                            newSessionDetails;
                                                        let tempSetsAndDetails =
                                                            setsAndDetails;

                                                        tempSetsAndDetails[
                                                            index
                                                        ][0] = newValue;

                                                        tempSessionDetails[
                                                            indexOfExercise
                                                        ] = {
                                                            exercise,
                                                            setsAndDetails:
                                                                tempSetsAndDetails,
                                                        };

                                                        setNewSessionDetails(
                                                            tempSessionDetails
                                                        );
                                                    }}
                                                />
                                                <TextInput
                                                    style={styles.secondInput}
                                                    defaultValue={reps}
                                                    keyboardType="numeric"
                                                    onChangeText={(
                                                        newValue
                                                    ) => {
                                                        let tempSessionDetails =
                                                            newSessionDetails;
                                                        let tempSetsAndDetails =
                                                            setsAndDetails;

                                                        tempSetsAndDetails[
                                                            index
                                                        ][1] = newValue;

                                                        tempSessionDetails[
                                                            indexOfExercise
                                                        ] = {
                                                            exercise,
                                                            setsAndDetails:
                                                                tempSetsAndDetails,
                                                        };

                                                        setNewSessionDetails(
                                                            tempSessionDetails
                                                        );
                                                    }}
                                                />
                                            </View>
                                        )
                                    )}
                                </View>
                            )
                        )}
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.resetButton}
                            activeOpacity={0.7}
                            onPress={() =>
                                setNewSessionDetails(data.sessionInfo)
                            }
                            disabled={isPending}
                        >
                            <Ionicons
                                name="refresh-outline"
                                size={22}
                                color={"black"}
                            />
                            <Text
                                style={{
                                    color: "black",
                                    fontWeight: "600",
                                }}
                            >
                                Reset
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.submitButton}
                            activeOpacity={0.7}
                            onPress={() => mutate()}
                            disabled={isPending}
                        >
                            <Ionicons
                                name="barbell-outline"
                                size={22}
                                color={"white"}
                            />
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "600",
                                }}
                            >
                                Edit
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {editError && (
                        <Text
                            className="text-center text-red-600"
                            style={{ marginTop: 10 }}
                        >
                            {editError}
                        </Text>
                    )}
                </KeyboardAwareScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    errorBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 30,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginHorizontal: 8,
    },
    inputItemContainer: {
        margin: 10,
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    label: {
        fontWeight: "700",
        color: Colors.primary,
        fontSize: 16,
    },
    input: {
        height: 40,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: Colors.primary,
        padding: 10,
    },
    loadingText: {
        color: "gray",
        textAlign: "center",
        padding: 20,
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
    secondInput: {
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
    },
    buttonsContainer: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 40,
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
    resetButton: {
        backgroundColor: Colors.primaryBackground,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 6,
        borderRadius: 10,
    },
});

export default EditPage;
