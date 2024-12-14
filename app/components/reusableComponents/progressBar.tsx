import React, { useRef, useState } from 'react';
import { View, Button, Animated, Text } from 'react-native';

type ProgressBarProps = {
    progress: number; // Define progress as a number
  };

  const ProgressBar = ({ progress }: ProgressBarProps) => {
    // const [progress, setProgress] = useState(37);

    return (
        <View className="flex-1 w-full rounded-full">
            {/* Progress Bar Container */}
            <View className="w-full h-2 bg-[#D9D9D9] rounded-full overflow-hidden">
                {/* Progress Bar Fill */}
                <View
                    className="h-full bg-[#00BF63]"
                    style={{ width: `${progress}%` }} // Dynamic width
                />
            </View>
        </View>
    );
};

export default ProgressBar;
