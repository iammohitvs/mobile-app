import { Link, Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import {
    TouchableOpacity,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                headerShown: true,
                tabBarShowLabel: false,
                headerTitleAlign: "left",
                headerRight: () => (
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            paddingRight: 10,
                            gap: 10,
                        }}
                    >
                        <Link href={"/help"} asChild>
                            <TouchableOpacity>
                                <Ionicons
                                    size={32}
                                    name="information-circle-outline"
                                />
                            </TouchableOpacity>
                        </Link>

                        <Link href={"/account"} asChild>
                            <TouchableOpacity>
                                <Ionicons
                                    size={32}
                                    name="person-circle-outline"
                                />
                            </TouchableOpacity>
                        </Link>
                    </View>
                ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: "All Sessions",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "barbell" : "barbell-outline"}
                            color={color}
                            style={tabBarIconStyles(focused)}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="newpage"
                options={{
                    headerTitle: "Record a session",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "add-circle" : "add-circle-outline"}
                            color={color}
                            style={tabBarIconStyles(focused)}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="workouts"
                options={{
                    headerTitle: "Workout plans",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "clipboard" : "clipboard-outline"}
                            color={color}
                            style={tabBarIconStyles(focused)}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

const tabBarIconStyles = (focused: boolean) => {
    return {
        borderRadius: 40,
        paddingHorizontal: 6,
        paddingVertical: 3,
    };
};
