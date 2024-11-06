import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Card = () => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className="border-[1px] border-gray-700 rounded-md shadow-black shadow-sm flex flex-col gap-10"
        >
            <View>
                <Text className="text-lg font-semibold">Hello</Text>
                <Text>Description</Text>
                <Text>Body</Text>
                <Text>Footer</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Card;
