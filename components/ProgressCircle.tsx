import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const ProgressCircle = ({ percentage, radius, strokeWidth }) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg height={radius * 2} width={radius * 2}>
        {/* Background circle */}
        <Circle
          stroke="#1d1d1d"
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <Circle
          stroke="#19aa59"
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${radius}, ${radius}`}
        />
      </Svg>
      <Text
        style={{
          position: "absolute",
          fontSize: 18,
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        {percentage}%
      </Text>
    </View>
  );
};

export default ProgressCircle;
