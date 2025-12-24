import { Stack } from "expo-router";
import React from "react";

const AttendanceLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#1D1D1D",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="mark" />
      <Stack.Screen name="record" />
    </Stack>
  );
};

export default AttendanceLayout;
