import SessionCard from "@/components/SessionCard";
import { Colors } from "@/constants/Colors";
import { getAllSessions } from "@/lib/sessionRequests";
import { useQuery } from "@tanstack/react-query";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

export default function Sessions() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["sessions-all"],
        queryFn: async () => await getAllSessions(0, 100, ""),
        staleTime: Infinity,
    });

    return (
        <ScrollView className="px-4 pt-6">
            <Text className="mb-4 font-light text-md">
                All your recorded sessions are visible below. Browse through
                them and filter by your choice.
            </Text>

            <View style={styles.sesssionContainer}>
                {isLoading && (
                    <Text style={styles.loadingText}>Loading...</Text>
                )}

                {isError && (
                    <View style={styles.errorBox}>
                        <Text className="text-center text-red-600">
                            Something went wrong trying to get your session data
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                queryClient.refetchQueries({
                                    queryKey: ["session-all"],
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    sesssionContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 40,
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
    errorBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 30,
    },
});
