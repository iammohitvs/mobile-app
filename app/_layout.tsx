import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuthContext } from "@/contexts/AuthContext";

import "../global.css";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <NativeLayout />
            </ThemeProvider>
        </AuthProvider>
    );
}

export const NativeLayout = () => {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="help" options={{ presentation: "modal" }} />
            <Stack.Screen
                name="account"
                options={{
                    presentation: "card",
                    headerShown: true,
                    headerLeft: () => (
                        <Pressable onPress={() => router.back()}>
                            <Ionicons
                                name="arrow-back"
                                color={"black"}
                                size={28}
                            />
                        </Pressable>
                    ),
                }}
            />
        </Stack>
    );
};
