import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const EditPage = () => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>EditPage: {id}</Text>
        </View>
    );
};

export default EditPage;
