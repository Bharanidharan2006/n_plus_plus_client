import React from "react";
import { Dimensions, Text, View } from "react-native";

export const getPrecisionFloat = (percentage: string) => {
  return parseFloat(percentage) === 0.0
    ? 0.0
    : parseFloat(percentage).toPrecision(4);
};

const BarChart = ({ subjects }) => {
  const screenWidth = Dimensions.get("screen").width;
  const perBarWidth = screenWidth / subjects.length;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end", // align bars to bottom
        height: 200,
        // chart height
      }}
    >
      {subjects.map((s, i) => (
        <View
          key={i}
          style={{
            width: perBarWidth * 0.75,
            height: (s.attendancePercentage / 100) * 160, // different heights = bar effect
            backgroundColor: "#272727", //"rgba(25, 170, 88, 0.3)"
            borderRadius: 2,
            position: "relative",
          }}
        >
          <View
            style={{
              backgroundColor: s.attendancePercentage < 75 ? "#fff" : "#19AA59",
              height: 2,
            }}
          ></View>
          <Text
            style={{
              position: "absolute",
              color: "#fff",
              top: -15,
              alignSelf: "center",
              fontFamily: "Poppins-Regular",
              fontSize: 9.5,
            }}
          >
            {`${getPrecisionFloat(s.attendancePercentage)}%`}
          </Text>
          <Text
            style={{
              position: "absolute",
              color: "#fff",
              bottom: -47,
              alignSelf: "center",
              transform: [{ rotate: "90deg" }],
              width: 65,
              fontFamily: "Poppins-Regular",
              fontSize: 10,
            }}
          >
            {s.shortenedName}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default BarChart;
