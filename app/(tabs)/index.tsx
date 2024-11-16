import FilterModal from "@/components/FilterModal";
import SessionCard from "@/components/SessionCard";
import { Colors } from "@/constants/Colors";
import { getAllSessions } from "@/lib/sessionRequests";
import { SessionType } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Sessions() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["sessions-all"],
        queryFn: async () => await getAllSessions(0, 5, ""),
    });

    return (
        <View className="px-4 pt-6">
            <Text className="mb-4 font-light text-md">
                All your recorded sessions are visible below. Browse through
                them and filter by your choice.
            </Text>

            <View style={styles.filterView}>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Text style={{ color: "white", fontWeight: "600" }}>
                        Filter
                    </Text>
                    <Ionicons name="filter-outline" size={22} color={"white"} />
                </TouchableOpacity>
            </View>

            <View style={styles.sesssionContainer}>
                {isLoading && (
                    <Text style={styles.loadingText}>Loading...</Text>
                )}

                {data?.length === 0 && (
                    <Text className="mb-4 font-light text-md">
                        No sessions available. Record some sessions to view them
                        here
                    </Text>
                )}

                {data?.map((session) => (
                    <SessionCard key={session.id} session={session} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sesssionContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },
    filterView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 12,
    },
    filterButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    loadingText: {
        color: "gray",
        textAlign: "center",
        padding: 20,
    },
});
