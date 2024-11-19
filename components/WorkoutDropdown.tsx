import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { sampelWorkout } from "@/lib/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllWorkouts } from "@/lib/workoutRequests";
import { Ionicons } from "@expo/vector-icons";
import { WorkoutType } from "@/lib/types";

const WorkoutDropdown = ({
    setChosenWorkout,
}: {
    setChosenWorkout: React.Dispatch<
        React.SetStateAction<WorkoutType | undefined>
    >;
}) => {
    const queryClient = useQueryClient();
    const [value, setValue] = useState<string | undefined>(undefined);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["workout-all"],
        queryFn: async () => await getAllWorkouts(),
        staleTime: Infinity,
    });

    // @ts-ignore
    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    return (
        <>
            {isLoading && <Text style={styles.loadingText}>Loading...</Text>}

            {isError && (
                <View style={styles.errorBox}>
                    <Text className="text-center text-red-600">
                        Something went wrong trying to get your session data
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            queryClient.refetchQueries({
                                queryKey: ["workout-all"],
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
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    // @ts-ignore
                    data={data.formattedWorkouts}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Choose your workout plan"
                    searchPlaceholder="Search workout..."
                    value={value}
                    onChange={(item) => {
                        setValue(item.value);
                        setChosenWorkout(
                            data.workouts.find(
                                (workout) => workout.id === item.value
                            )
                        );
                    }}
                    renderItem={renderItem}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 16,
    },
    item: {
        padding: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textItem: {
        flex: 1,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        fontWeight: "300",
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    inputSearchStyle: {
        height: 32,
        fontSize: 14,
        borderRadius: 10,
    },
    loadingText: {
        color: "gray",
        textAlign: "center",
        padding: 20,
    },
    errorBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 30,
    },
});

export default WorkoutDropdown;
