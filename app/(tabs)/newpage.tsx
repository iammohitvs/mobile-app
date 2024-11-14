import { View, Text } from "react-native";
import React from "react";
import WorkoutDropdown from "@/components/WorkoutDropdown";

const newPage = () => {
    return (
        <View className="px-4 pt-6">
            <WorkoutDropdown />
        </View>
    );
};

export default newPage;
