import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const sessionPage = () => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>fkfkermkfemkrfe: {id}</Text>
        </View>
    );
};

export default sessionPage;
