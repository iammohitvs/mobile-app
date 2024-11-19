import { View, Text } from "react-native";
import React, { useState } from "react";
import WorkoutDropdown from "@/components/WorkoutDropdown";
import { WorkoutType } from "@/lib/types";
import NewSessionAdd from "@/components/NewSessionAdd";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const newPage = () => {
    const [chosenWorkout, setChosenWorkout] = useState<WorkoutType | undefined>(
        undefined
    );
    
    return (
        <KeyboardAwareScrollView className="px-4 pt-6">
            <WorkoutDropdown setChosenWorkout={setChosenWorkout} />

            {chosenWorkout && <NewSessionAdd chosenWorkout={chosenWorkout} />}
        </KeyboardAwareScrollView>
    );
};

export default newPage;
