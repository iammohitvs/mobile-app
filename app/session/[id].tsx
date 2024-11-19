import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSpeceficSession } from "@/lib/sessionRequests";
import { Ionicons } from "@expo/vector-icons";
import SessionInfo from "@/components/SessionInfo";

const sessionPage = () => {
    const queryClient = useQueryClient();
    const { id } = useLocalSearchParams();

    const { data, isFetching, isError } = useQuery({
        queryKey: [`session-${id}`],
        queryFn: async () => getSpeceficSession(id as string),
        staleTime: Infinity,
    });

    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 8, }}>
            <ScrollView>
                {isFetching && (
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

                {data && <SessionInfo data={data} />}
            </ScrollView>
        </SafeAreaView>
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
    loadingText: {
        color: "gray",
        textAlign: "center",
        padding: 20,
    },
});

export default sessionPage;
