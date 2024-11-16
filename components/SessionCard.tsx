import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { SessionType } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const SessionCard = ({ session }: { session: SessionType }) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.contanier}
            onPress={() => router.push(`/session/${session.id}`)}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{session.workoutName}</Text>
                <Text style={styles.date}>Completed: {formatDate(session.dateTime)}</Text>
            </View>

            <Ionicons name="chevron-forward" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contanier: {
        borderWidth: 0.5,
        borderColor: Colors.primary,
        borderRadius: 4,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    innerContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },
    title: {
        fontWeight: "700",
        fontSize: 18,
    },
    description: {
        fontWeight: "300",
        fontSize: 12,
    },
    footer: {
        width: "100%",
        textAlign: "center",
        fontWeight: "300",
        fontSize: 12,
    },
    date: {
        fontWeight: "300",
        fontSize: 13,
    },
});

export default SessionCard;
