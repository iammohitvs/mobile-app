import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { sampelWorkout } from "@/lib/constants";

const WorkoutDropdown = () => {
    const [value, setValue] = useState<string | null | undefined>(null);

    // @ts-ignore
    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    return (
        <>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                // @ts-ignore
                data={sampelWorkout}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Choose your workout plan"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                    setValue(item.value);
                }}
                renderItem={renderItem}
            />

            <Text>Here comes the workout information: {value}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    item: {
        padding: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textItem: {
        flex: 1,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        fontWeight: "300",
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    inputSearchStyle: {
        height: 32,
        fontSize: 14,
    },
});

export default WorkoutDropdown;
