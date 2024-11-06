import Card from "@/components/Card";
import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    return (
        <View className="px-4 pt-6">
            <Text className="font-light mb-4 text-md">
                All your recorded sessions are visible below. Browse through
                them and filter by your choice.
            </Text>
            
            <Card />
        </View>
    );
}
