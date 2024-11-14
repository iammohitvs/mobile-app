import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Link, useRouter } from "expo-router";

const SessionCard = () => {
    const router = useRouter();

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.contanier}
            onPress={() => router.push("/session/4")}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Hello</Text>
                <Text style={styles.date}>12</Text>
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
    },
});

export default SessionCard;
