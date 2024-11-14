import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import { Colors } from "@/constants/Colors";
import { months, sampelWorkout } from "@/lib/constants";

const FilterModal = ({
    isVisible,
    setIsVisible,
}: {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [monthValue, setMonthValue] = useState<string>("0");
    const [workoutValue, setWorkoutValue] = useState<string>("0");

    return (
        <Modal
            visible={isVisible}
            presentationStyle="pageSheet"
            animationType="slide"
            style={styles.filterModal}
        >
            <ScrollView>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsVisible(false)}
                >
                    <Ionicons name="close-outline" size={24} />
                </TouchableOpacity>

                <View style={styles.popover}>
                    <Text style={styles.radioLabel}>Months</Text>
                    <RadioGroup
                        radioButtons={months}
                        onPress={setMonthValue}
                        selectedId={monthValue}
                        layout="column"
                        containerStyle={{ alignItems: "flex-start" }}
                    />

                    <Text style={styles.radioLabel}>Workouts</Text>
                    <RadioGroup
                        radioButtons={sampelWorkout}
                        onPress={setWorkoutValue}
                        selectedId={workoutValue}
                        layout="column"
                        containerStyle={{ alignItems: "flex-start" }}
                    />

                    {(workoutValue !== "0" || monthValue !== "0") && (
                        <TouchableOpacity
                            onPress={() => {
                                setMonthValue("0");
                                setWorkoutValue("0");
                                setIsVisible(false);
                            }}
                        >
                            <Text
                                style={{
                                    textDecorationLine: "underline",
                                    marginTop: 8,
                                }}
                            >
                                Remove filters
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            setIsVisible(false);
                            // Do the useQuery update
                        }}
                        style={styles.filterSaveButton}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.modalButtonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setMonthValue("0");
                            setWorkoutValue("0");
                            setIsVisible(false);
                        }}
                        style={styles.filterCancelButton}
                        activeOpacity={0.6}
                    >
                        <Text
                            style={[styles.modalButtonText, { color: "balck" }]}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    filterModal: {
        padding: 50,
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 100,
    },
    popover: {
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "flex-start",
    },
    radioLabel: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primary,
    },
    filterSaveButton: {
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 8,
        marginTop: 20,
        width: "100%",
    },
    filterCancelButton: {
        backgroundColor: Colors.primaryBackground,
        padding: 8,
        borderRadius: 8,
        marginBottom: 60,
        width: "100%",
    },
    modalButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
});

export default FilterModal;
